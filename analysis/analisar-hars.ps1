param(
  [Parameter(Mandatory = $true)][string[]]$HarFiles,
  [string]$OutputDirectory = $PSScriptRoot
)
$ErrorActionPreference = 'Stop'
$files = $HarFiles
if (-not (Test-Path -LiteralPath $OutputDirectory -PathType Container)) {
  New-Item -ItemType Directory -Path $OutputDirectory -Force | Out-Null
}
function Normalize-Path([string]$path) {
  $path = $path -replace '[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}', '{uuid}'
  $path = $path -replace 'inq_[A-Za-z0-9]+','{inquiryId}' -replace 'amzn1\.account\.[A-Za-z0-9]+','{accountId}'
  $path = $path -replace '(/nonce/id/)[^/]+','$1{nonceId}'
  return $path
}
function Content-Text($content) {
  if ($content.encoding -eq 'base64') {
    try { return [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($content.text)) } catch { return '' }
  }
  return [string]$content.text
}
function Request-Keys($request) {
  $keys = @($request.postData.params | ForEach-Object name)
  try {
    $json = $request.postData.text | ConvertFrom-Json -Depth 100 -ErrorAction Stop
    if ($json -is [pscustomobject]) { $keys += @($json.PSObject.Properties.Name) }
  } catch {}
  if ($request.postData.mimeType -match 'application/x-www-form-urlencoded' -and $request.postData.text) {
    $keys += @($request.postData.text -split '&' | ForEach-Object { [uri]::UnescapeDataString(($_ -split '=',2)[0]) })
  }
  return @($keys | Where-Object { $_ } | Sort-Object -Unique)
}
$summary = @()
foreach ($file in $files) {
  $har = [IO.File]::ReadAllText($file) | ConvertFrom-Json -Depth 100
  $entries = @($har.log.entries)
  $rows = foreach ($entry in $entries) {
    $url = [uri]$entry.request.url
    $queryKeys = @($entry.request.queryString | ForEach-Object name | Sort-Object -Unique)
    [pscustomobject]@{
      Method = $entry.request.method; Host = $url.Host; Path = Normalize-Path $url.AbsolutePath
      Status = $entry.response.status; Mime = $entry.response.content.mimeType
      RequestFieldNames = @(Request-Keys $entry.request); QueryFieldNames = $queryKeys
      ResponseBodyPresent = [bool]$entry.response.content.text
    }
  }
  $inventory = @($rows | Group-Object Method,Host,Path | ForEach-Object {
    $group = $_.Group
    [pscustomobject]@{
      Method=$group[0].Method; Host=$group[0].Host; Path=$group[0].Path; Count=$_.Count
      Statuses=@($group.Status | Sort-Object -Unique)
      RequestFieldNames=@($group | ForEach-Object RequestFieldNames | Sort-Object -Unique)
      QueryFieldNames=@($group | ForEach-Object QueryFieldNames | Sort-Object -Unique)
      ResponsesWithBody=@($group | Where-Object ResponseBodyPresent).Count
    }
  } | Sort-Object Host,Path,Method)
  $stateHistory = @()
  foreach ($entry in $entries) {
    $url = [uri]$entry.request.url
    if ($url.Host -eq 'logistics.amazon.com' -and $url.AbsolutePath -eq '/onboarding/v2/data/onboarding-status') {
      try {
        $body = (Content-Text $entry.response.content) | ConvertFrom-Json -Depth 100
        $stateHistory += [pscustomobject]@{Time=([string]$entry.startedDateTime); Workflow=$body.workflowStatus; Tasks=$body.taskStatusMap}
      } catch {}
    }
  }
  $name = [IO.Path]::GetFileNameWithoutExtension($file)
  $result = [pscustomobject]@{
    Source=[IO.Path]::GetFileName($file); CaptureDate=([string]($entries | Select-Object -First 1).startedDateTime); Entries=$entries.Count
    SourceSHA256=(Get-FileHash -LiteralPath $file -Algorithm SHA256).Hash
    HostCounts=@($rows | Group-Object Host | Sort-Object Count -Descending | ForEach-Object { [pscustomobject]@{Host=$_.Name;Count=$_.Count} })
    NormalizedRoutes=$inventory; OnboardingStateHistory=$stateHistory
    Notes=@('Only field names, status and normalized paths are exported; credentials and body values excluded.','This script inventories each file independently; overlap comparison is documented separately for the original reference captures.','An uploaded HAR is evidence of its recorded contents, not independent proof of capture authenticity or Apex backend behavior.')
  }
  [IO.File]::WriteAllText((Join-Path $OutputDirectory ($name+'.sanitized.json')),($result | ConvertTo-Json -Depth 30))
  $summary += [pscustomobject]@{File=$result.Source;Entries=$entries.Count;Hosts=$result.HostCounts.Count;Routes=$inventory.Count;StatusReads=$stateHistory.Count}
}
$summary | ConvertTo-Json -Compress
