export function cropGeometry(w, h, fw, fh, zoom = 1, x = 0, y = 0) {
  const scale = Math.max(fw / w, fh / h) * Math.max(1, Math.min(4, zoom));
  const lx = (w * scale - fw) / 2, ly = (h * scale - fh) / 2;
  return { scale, x: Math.max(-lx, Math.min(lx, x)) || 0, y: Math.max(-ly, Math.min(ly, y)) || 0 };
}
export async function adjustImage(file, kind) {
  const source = URL.createObjectURL(file), img = new Image();
  try { img.src = source; await img.decode(); } catch { URL.revokeObjectURL(source); throw Error('Não foi possível abrir esta imagem.'); }
  if (img.naturalWidth * img.naturalHeight > 40000000) { URL.revokeObjectURL(source); throw Error('Use uma imagem de até 40 megapixels.'); }
  return new Promise(resolve => {
    const dialog = document.createElement('dialog'); dialog.className = 'image-adjust';
    const profile = kind === 'profile', width = profile ? 900 : 1280, height = profile ? 900 : 808;
    dialog.innerHTML = `<h2>${profile ? 'Enquadrar foto de perfil' : 'Enquadrar carteira · ' + (kind === 'front' ? 'frente' : 'verso')}</h2><p>${profile ? 'Centralize o rosto na guia oval. A foto será salva no quadro quadrado.' : 'Posicione a carteira no quadro sem cortar bordas ou informações.'}</p><div class="adjust-stage"><canvas width="${width}" height="${height}" aria-label="Prévia do recorte; arraste para posicionar"></canvas>${profile ? '<span class="adjust-oval" aria-hidden="true"></span>' : ''}</div><p>Arraste para posicionar. O quadro mostra a imagem que será salva.</p><div class="adjust-controls"><button data-action="minus" aria-label="Diminuir zoom">−</button><label>Zoom <input data-zoom type="range" min="1" max="4" step="0.01" value="1"></label><button data-action="plus" aria-label="Aumentar zoom">+</button><button data-action="fit">Encaixar</button><button data-action="rotate">Girar 90°</button></div><div class="adjust-controls"><label>Posição horizontal <input data-position="x" type="range" min="-100" max="100" value="0"></label><label>Posição vertical <input data-position="y" type="range" min="-100" max="100" value="0"></label></div><footer><button data-action="cancel">Cancelar</button><button class="btn primary" data-action="use">Usar esse recorte</button></footer><p role="status" class="adjust-error"></p>`;
    document.body.append(dialog); const canvas = dialog.querySelector('canvas'), ctx = canvas.getContext('2d'), zoomInput = dialog.querySelector('[data-zoom]');
    let rotation = 0, zoom = 1, x = 0, y = 0, drag = null, finished = false;
    const dimensions = () => rotation % 180 ? [img.naturalHeight, img.naturalWidth] : [img.naturalWidth, img.naturalHeight];
    function draw() {
      const [w,h] = dimensions(), g = cropGeometry(w,h,width,height,zoom,x,y); x=g.x; y=g.y;
      ctx.fillStyle='#fff'; ctx.fillRect(0,0,width,height); ctx.save(); ctx.translate(width/2+x,height/2+y); ctx.rotate(rotation*Math.PI/180); ctx.scale(g.scale,g.scale); ctx.drawImage(img,-img.naturalWidth/2,-img.naturalHeight/2); ctx.restore(); zoomInput.value=zoom;
      for (const n of dialog.querySelectorAll('[data-position]')) { const limit = n.dataset.position === 'x' ? (w*g.scale-width)/2 : (h*g.scale-height)/2; n.value = limit ? (n.dataset.position === 'x' ? x : y) / limit * 100 : 0; }
    }
    function finish(value) { if(finished)return; finished=true; dialog.close(); dialog.remove(); URL.revokeObjectURL(source); resolve(value); }
    dialog.addEventListener('cancel', e=>{e.preventDefault();finish(null)});
    dialog.addEventListener('input', e=>{ const [w,h]=dimensions(), g=cropGeometry(w,h,width,height,zoom);
      if(e.target===zoomInput)zoom=Number(e.target.value);
      if(e.target.dataset.position==='x')x=(w*g.scale-width)/2*Number(e.target.value)/100;
      if(e.target.dataset.position==='y')y=(h*g.scale-height)/2*Number(e.target.value)/100;
      draw();
    });
    canvas.addEventListener('pointerdown',e=>{drag={id:e.pointerId,x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId)});
    canvas.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;const rect=canvas.getBoundingClientRect();x+=(e.clientX-drag.x)*width/rect.width;y+=(e.clientY-drag.y)*height/rect.height;drag.x=e.clientX;drag.y=e.clientY;draw()});
    for(const ev of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(ev,()=>{drag=null});
    dialog.addEventListener('click',e=>{
      const action=e.target.closest('button')?.dataset.action;if(!action)return;
      if(action==='cancel')return finish(null);
      if(action==='fit'||action==='rotate'){if(action==='rotate')rotation=(rotation+90)%360;zoom=1;x=0;y=0;}
      if(action==='plus')zoom=Math.min(4,zoom+.1);if(action==='minus')zoom=Math.max(1,zoom-.1);draw();
      if(action==='use'){dialog.querySelectorAll('button').forEach(b=>b.disabled=true);canvas.toBlob(blob=>{if(!blob){dialog.querySelector('.adjust-error').textContent='Não foi possível gerar o recorte.';dialog.querySelectorAll('button').forEach(b=>b.disabled=false);return}finish(new File([blob],`${kind}.jpg`,{type:'image/jpeg'}))},'image/jpeg',.94)}
    });
    dialog.showModal();draw();
  });
}
