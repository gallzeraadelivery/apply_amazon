// Adapted from the owner's existing local document parser.
export const DRIVER_LICENSE_OCR_FIELDS = [
  'driversLicenseNumber',
  'stateOrRegion',
  'driversLicenseExpirationDate',
  'firstName',
  'lastName',
  'middleName',
  'dateOfBirth',
  'addressLine1',
  'city',
  'state',
  'zipCode',
]         ;

                                                                                              

const STATE_NAMES                         = {
  ALABAMA: 'AL', ALASKA: 'AK', ARIZONA: 'AZ', ARKANSAS: 'AR', CALIFORNIA: 'CA',
  COLORADO: 'CO', CONNECTICUT: 'CT', DELAWARE: 'DE', FLORIDA: 'FL', GEORGIA: 'GA',
  HAWAII: 'HI', IDAHO: 'ID', ILLINOIS: 'IL', INDIANA: 'IN', IOWA: 'IA', KANSAS: 'KS',
  KENTUCKY: 'KY', LOUISIANA: 'LA', MAINE: 'ME', MARYLAND: 'MD', MASSACHUSETTS: 'MA',
  MICHIGAN: 'MI', MINNESOTA: 'MN', MISSISSIPPI: 'MS', MISSOURI: 'MO', MONTANA: 'MT',
  NEBRASKA: 'NE', NEVADA: 'NV', 'NEW HAMPSHIRE': 'NH', 'NEW JERSEY': 'NJ',
  'NEW MEXICO': 'NM', 'NEW YORK': 'NY', 'NORTH CAROLINA': 'NC', 'NORTH DAKOTA': 'ND',
  OHIO: 'OH', OKLAHOMA: 'OK', OREGON: 'OR', PENNSYLVANIA: 'PA', 'RHODE ISLAND': 'RI',
  'SOUTH CAROLINA': 'SC', 'SOUTH DAKOTA': 'SD', TENNESSEE: 'TN', TEXAS: 'TX', UTAH: 'UT',
  VERMONT: 'VT', VIRGINIA: 'VA', WASHINGTON: 'WA', 'WEST VIRGINIA': 'WV',
  WISCONSIN: 'WI', WYOMING: 'WY', 'DISTRICT OF COLUMBIA': 'DC',
};

const STATE_CODES = new Set(Object.values(STATE_NAMES));
const STREET_SUFFIX = /\b(?:ST(?:REET)?|AVE(?:NUE)?|RD|ROAD|DR(?:IVE)?|BLVD|BOULEVARD|LN|LANE|WAY|CT|COURT|PL|PLACE|PKWY|PARKWAY|HWY|HIGHWAY|CIR(?:CLE)?|TER(?:RACE)?|TRL|TRAIL)\b/i;

function emptyResult()                       {
  return Object.fromEntries(DRIVER_LICENSE_OCR_FIELDS.map(field => [field, '']))                        ;
}

function clean(value        , max = 100)         {
  return value
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/^[\s:;,#|.-]+|[\s:;,#|.-]+$/g, '')
    .trim()
    .slice(0, max);
}

function cleanName(value        )         {
  return clean(value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ' -]/g, ' '), 60);
}

export function normalizeDriverLicenseState(value        )         {
  const normalized = clean(value, 40).toUpperCase().replace(/\./g, '');
  if (STATE_CODES.has(normalized)) return normalized;
  return STATE_NAMES[normalized] ?? '';
}

function isoDate(year        , month        , day        )         {
  if (year < 1900 || year > 2100 || month < 1 || month > 12 || day < 1 || day > 31) return '';
  const check = new Date(Date.UTC(year, month - 1, day));
  if (check.getUTCFullYear() !== year || check.getUTCMonth() !== month - 1 || check.getUTCDate() !== day) return '';
  return `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export function normalizeDriverLicenseDate(value        )         {
  const match = clean(value, 40).match(/(?:19|20)\d{2}[\s/.\-]\d{1,2}[\s/.\-]\d{1,2}|\d{1,2}[\s/.\-]\d{1,2}[\s/.\-](?:19|20)\d{2}|\b\d{8}\b/);
  if (!match) return '';
  const token = match[0];
  const digits = token.replace(/\D/g, '');
  if (digits.length !== 8) return '';
  if (/^(?:19|20)/.test(digits)) {
    return isoDate(Number(digits.slice(0, 4)), Number(digits.slice(4, 6)), Number(digits.slice(6, 8)));
  }
  return isoDate(Number(digits.slice(4, 8)), Number(digits.slice(0, 2)), Number(digits.slice(2, 4)));
}

function aamvaValue(text        , code        )         {
  const match = new RegExp(`(?:^|[\\r\\n\\x1e])(?:DL)?${code}([^\\r\\n\\x1e]{1,100})`, 'i').exec(text);
  return match ? clean(match[1]) : '';
}

function lineValue(lines          , patterns          )         {
  for (const line of lines) {
    for (const pattern of patterns) {
      const match = pattern.exec(line);
      if (match?.[1]) return clean(match[1]);
    }
  }
  return '';
}

function normalizedLines(text        )           {
  return text
    .replace(/\r/g, '\n')
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '\n')
    .split(/\n+/)
    .map(line => clean(line, 200))
    .filter(Boolean);
}

function parseCityStateZip(lines          )                                                   {
  for (const line of lines) {
    const match = /^([A-Za-z][A-Za-z .'-]{1,45})[, ]+([A-Za-z]{2})\s+(\d{5})(?:[- ]?(\d{4}))?\b/.exec(line);
    if (!match) continue;
    const state = normalizeDriverLicenseState(match[2]);
    if (!state) continue;
    return { city: cleanName(match[1]), state, zipCode: match[3] };
  }
  return { city: '', state: '', zipCode: '' };
}

function parseStreet(lines          )         {
  const labeled = lineValue(lines, [
    /^(?:ADDRESS|ADDR|STREET(?: ADDRESS)?|RES(?:IDENCE)? ADDRESS)\s*[:#-]?\s+(.+)$/i,
  ]);
  if (labeled && /\d/.test(labeled)) return labeled.slice(0, 100);

  for (const line of lines) {
    if (!/^\d{1,6}[A-Za-z]?\s+/.test(line) || !STREET_SUFFIX.test(line)) continue;
    if (/\b(?:DOB|EXP|DLN|LIC(?:ENSE)?)\b/i.test(line)) continue;
    return clean(line, 100);
  }
  return '';
}

function visualState(lines          )         {
  const labeled = lineValue(lines, [/^(?:STATE|ST)\s*[:#-]?\s+([A-Za-z .]{2,30})$/i]);
  const normalizedLabel = normalizeDriverLicenseState(labeled);
  if (normalizedLabel) return normalizedLabel;

  const heading = lines.slice(0, 5).join(' ').toUpperCase();
  for (const [name, code] of Object.entries(STATE_NAMES)) {
    if (new RegExp(`\\b${name.replace(/ /g, '\\s+')}\\b`).test(heading)) return code;
  }
  return '';
}

function licenseNumber(lines          )         {
  const raw = lineValue(lines, [
    /^(?:DLN|DL\s*(?:NO|NUMBER|#)|LIC(?:ENSE)?\s*(?:NO|NUMBER|#)|ID\s*(?:NO|NUMBER|#))\s*[:#-]?\s+([A-Z0-9 -]{4,30})$/i,
    /^4D\s*[:#-]?\s+([A-Z0-9 -]{4,30})$/i,
  ]).toUpperCase().replace(/\s+/g, '');
  if (!/^[A-Z0-9-]{4,25}$/.test(raw) || /^\d{8}$/.test(raw)) return '';
  return raw;
}

/** Parses conservative, commonly printed US-DL labels and AAMVA data. */
export function parseDriverLicenseText(rawText        )                       {
  const result = emptyResult();
  const text = String(rawText ?? '').slice(0, 30_000);
  const lines = normalizedLines(text);

  result.lastName = cleanName(aamvaValue(text, 'DCS')) || cleanName(lineValue(lines, [
    /^(?:LN|LAST(?: NAME)?|SURNAME|FAMILY NAME)\s*[:#-]?\s+(.+)$/i,
    /^1\s+([A-Za-z][A-Za-z' -]{1,60})$/,
  ]));
  result.firstName = cleanName(aamvaValue(text, 'DAC')) || cleanName(lineValue(lines, [
    /^(?:FN|FIRST(?: NAME)?|GIVEN NAME)\s*[:#-]?\s+(.+)$/i,
    /^2\s+([A-Za-z][A-Za-z' -]{1,60})$/,
  ]));
  result.middleName = cleanName(aamvaValue(text, 'DAD')) || cleanName(lineValue(lines, [
    /^(?:MN|MIDDLE(?: NAME)?)\s*[:#-]?\s+(.+)$/i,
  ]));

  result.dateOfBirth = normalizeDriverLicenseDate(aamvaValue(text, 'DBB'))
    || normalizeDriverLicenseDate(lineValue(lines, [
      /^(?:DOB|DATE OF BIRTH|BIRTH DATE|3)\s*[:#-]?\s+(.+)$/i,
    ]));
  result.driversLicenseExpirationDate = normalizeDriverLicenseDate(aamvaValue(text, 'DBA'))
    || normalizeDriverLicenseDate(lineValue(lines, [
      /^(?:EXP|EXPIRES|EXPIRATION(?: DATE)?|4B)\s*[:#-]?\s+(.+)$/i,
    ]));

  const aamvaNumber = clean(aamvaValue(text, 'DAQ')).toUpperCase().replace(/\s+/g, '');
  result.driversLicenseNumber = /^[A-Z0-9-]{4,25}$/.test(aamvaNumber) ? aamvaNumber : licenseNumber(lines);

  result.addressLine1 = clean(aamvaValue(text, 'DAG'), 100) || parseStreet(lines);
  result.city = cleanName(aamvaValue(text, 'DAI'));
  result.state = normalizeDriverLicenseState(aamvaValue(text, 'DAJ'));
  result.zipCode = (aamvaValue(text, 'DAK').match(/\d{5}/)?.[0]) ?? '';

  const visualLocation = parseCityStateZip(lines);
  result.city ||= visualLocation.city || cleanName(lineValue(lines, [
    /^(?:CITY)\s*[:#-]?\s+([A-Za-z .'-]{2,50})$/i,
  ]));
  result.state ||= visualLocation.state || visualState(lines);
  result.zipCode ||= visualLocation.zipCode || (lineValue(lines, [
    /^(?:ZIP|ZIP CODE|POSTAL CODE)\s*[:#-]?\s+(\d{5}(?:-\d{4})?)$/i,
  ]).match(/\d{5}/)?.[0] ?? '');
  result.stateOrRegion = result.state || visualState(lines);

  return result;
}
