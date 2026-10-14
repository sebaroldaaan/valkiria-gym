/* A lightweight studio renderer: bevelled geometry, distinct rubber/metal surfaces,
   analytic softbox reflections, and a bounded render loop. No external 3D assets. */
window.initValkiriaScene = function initValkiriaScene(motion) {
  const canvas = document.getElementById('scene');
  const hero = canvas.closest('.hero');
  let gl;
  try { gl = canvas.getContext('webgl', { alpha: true, antialias: true, powerPreference: 'low-power' }); } catch { /* Static hero stays usable. */ }
  if (!gl) {
    canvas.hidden = true;
    hero.dataset.scene = 'unavailable';
    return () => {};
  }
  const vertexSource = `
    attribute vec3 aPosition;
    attribute vec3 aNormal;
    attribute vec3 aColor;
    attribute vec2 aMaterial;
    uniform float uAspect, uAngle, uTilt, uScale, uX, uY;
    varying vec3 vPosition, vNormal, vColor, vLocal;
    varying vec2 vMaterial;
    void main() {
      float c=cos(uAngle), s=sin(uAngle), a=cos(uTilt), b=sin(uTilt);
      mat3 ry=mat3(c,0.,-s, 0.,1.,0., s,0.,c);
      mat3 rz=mat3(a,b,0., -b,a,0., 0.,0.,1.);
      vec3 world=rz*ry*aPosition*uScale + vec3(uX,uY,0.);
      vPosition=world; vNormal=rz*ry*aNormal;
      vColor=aColor; vMaterial=aMaterial; vLocal=aPosition;
      vec3 view=world-vec3(0.,0.,8.);
      gl_Position=vec4(view.x*2.6/uAspect,view.y*2.6,-view.z*1.01-.2,-view.z);
    }
  `;
  const fragmentSource = `
    precision highp float;
    varying vec3 vPosition, vNormal, vColor, vLocal;
    varying vec2 vMaterial;
    const float PI=3.14159265;
    vec3 fresnel(float h, vec3 f0) { return f0+(1.-f0)*pow(1.-h,5.); }
    vec3 light(vec3 pos, vec3 radiance, vec3 n, vec3 v, vec3 color, float rough, float metal) {
      vec3 l=normalize(pos-vPosition), h=normalize(v+l);
      float nl=max(dot(n,l),0.), nv=max(dot(n,v),.001), nh=max(dot(n,h),0.);
      float a=rough*rough, a2=a*a;
      float d=a2/(PI*pow(nh*nh*(a2-1.)+1.,2.)+.0001);
      float k=pow(rough+1.,2.)/8.;
      float g=(nv/(nv*(1.-k)+k))*(nl/(nl*(1.-k)+k));
      vec3 f=fresnel(max(dot(h,v),0.),mix(vec3(.04),color,metal));
      vec3 spec=d*g*f/(4.*nv*nl+.001);
      return ((1.-f)*(1.-metal)*color/PI+spec)*radiance*nl;
    }
    void main() {
      vec3 n=normalize(vNormal), v=normalize(vec3(0.,0.,8.)-vPosition);
      float rough=vMaterial.x, metal=vMaterial.y;
      vec3 color=vColor;
      // Fine crossing cuts catch light on the grip without a texture download.
      if (metal>.8 && abs(vLocal.x)<.73) {
        float angle=atan(vLocal.z,vLocal.y);
        float cut=sin(angle*56.+vLocal.x*170.)*sin(angle*56.-vLocal.x*170.);
        color*=.78+.22*smoothstep(-.4,.4,cut);
        rough+=.07*(1.-cut);
      }
      vec3 lit=light(vec3(-3.,4.,5.),vec3(4.5,4.3,4.1),n,v,color,rough,metal);
      lit+=light(vec3(5.,1.,4.),vec3(1.6,1.15,1.3),n,v,color,rough,metal);
      lit+=light(vec3(2.,3.,-4.),vec3(3.4,.22,.8),n,v,color,rough,metal);
      vec3 r=reflect(-v,n);
      float wide=exp(-pow((r.x+.35)/.6,2.)-pow((r.y-.7)/(.09+rough*.28),2.));
      float strip=exp(-pow((r.x-.68)/(.045+rough*.2),2.)-pow((r.y-.2)/.85,2.));
      vec3 environment=vec3(.12,.13,.16)+vec3(1.8,1.75,1.7)*wide+vec3(1.2,.18,.42)*strip;
      vec3 f=fresnel(max(dot(n,v),0.),mix(vec3(.04),color,metal));
      lit+=environment*f*(1.-rough*.65)+color*(1.-metal)*.13;
      lit=lit/(lit+vec3(1.));
      gl_FragColor=vec4(pow(max(lit,vec3(0.)),vec3(1./2.2)),1.);
    }
  `;
  const resources = [];
  function shader(type, source) {
    const value = gl.createShader(type); resources.push(['shader', value]);
    gl.shaderSource(value, source); gl.compileShader(value);
    if (!gl.getShaderParameter(value, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(value));
    return value;
  }
  let program, buffer, uniforms;
  function freeResources() {
    for (const [type, value] of resources) {
      if (type === 'shader') gl.deleteShader(value);
      if (type === 'program') gl.deleteProgram(value);
      if (type === 'buffer') gl.deleteBuffer(value);
    }
  }
  try {
    program = gl.createProgram(); resources.push(['program', program]);
    gl.attachShader(program, shader(gl.VERTEX_SHADER, vertexSource));
    gl.attachShader(program, shader(gl.FRAGMENT_SHADER, fragmentSource));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
    gl.useProgram(program);
  } catch (error) {
    freeResources(); canvas.hidden = true; hero.dataset.scene = 'unavailable';
    console.warn('La portada continúa sin WebGL:', error.message);
    return () => {};
  }
  const vertices = [];
  const vertex = (p, n, color, rough, metal) => vertices.push(...p, ...n, ...color, rough, metal);
  function lathe(profile, color, rough, metal, sign = 1, segments = 96) {
    function point(j, angle) {
      const [x, r] = profile[j];
      const previous = profile[Math.max(0, j-1)], next = profile[Math.min(profile.length-1, j+1)];
      const dx=next[0]-previous[0], dr=next[1]-previous[1], length=Math.hypot(dx,dr)||1;
      return [[x*sign,r*Math.cos(angle),r*Math.sin(angle)],[-dr/length*sign,dx/length*Math.cos(angle),dx/length*Math.sin(angle)]];
    }
    for (let j=0; j<profile.length-1; j++) for (let i=0; i<segments; i++) {
      const a=i*Math.PI*2/segments, b=(i+1)*Math.PI*2/segments;
      const points=[point(j,a),point(j+1,a),point(j+1,b),point(j,a),point(j+1,b),point(j,b)];
      points.forEach(([p,n])=>vertex(p,n,color,rough,metal));
    }
  }
  const steel=[.52,.54,.58], rubber=[.032,.028,.035], edge=[.065,.055,.067];
  lathe([[-1.03,0],[-1.03,.12],[-.96,.16],[.96,.16],[1.03,.12],[1.03,0]],steel,.23,1);
  for (const sign of [-1,1]) {
    lathe([[.73,.16],[.76,.19],[.88,.19],[.91,.16]],steel,.26,1,sign);
    lathe([[.88,.16],[.88,.26],[.91,.3],[.99,.3],[1.02,.26],[1.02,.16]],steel,.2,1,sign);
    lathe([[.99,.17],[.99,.68],[1.02,.75],[1.07,.79],[1.28,.79],[1.33,.75],[1.36,.68],[1.36,.17]],rubber,.68,0,sign);
    lathe([[1.32,.17],[1.32,.74],[1.36,.82],[1.41,.85],[1.69,.85],[1.74,.82],[1.78,.74],[1.78,.17]],rubber,.63,0,sign);
    lathe([[1.44,.848],[1.45,.862],[1.47,.862],[1.48,.848]],edge,.47,.12,sign);
    lathe([[1.62,.848],[1.63,.862],[1.65,.862],[1.66,.848]],edge,.47,.12,sign);
    lathe([[1.78,.16],[1.78,.53],[1.79,.56],[1.81,.56],[1.82,.53],[1.82,.16]],edge,.42,.2,sign);
    lathe([[1.815,.16],[1.815,.43],[1.825,.445],[1.84,.43],[1.84,.16]],steel,.3,.92,sign);
    lathe([[1.84,0],[1.84,.16],[1.85,.18],[1.88,.18],[1.9,.15],[1.9,0]],steel,.19,1,sign);
  }
  buffer=gl.createBuffer(); resources.push(['buffer',buffer]);
  gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices),gl.STATIC_DRAW);
  [['aPosition',3,0],['aNormal',3,12],['aColor',3,24],['aMaterial',2,36]].forEach(([name,size,offset])=>{
    const attribute=gl.getAttribLocation(program,name);
    gl.enableVertexAttribArray(attribute); gl.vertexAttribPointer(attribute,size,gl.FLOAT,false,44,offset);
  });
  uniforms=Object.fromEntries(['Aspect','Angle','Tilt','Scale','X','Y'].map(name=>[name,gl.getUniformLocation(program,'u'+name)]));
  gl.enable(gl.DEPTH_TEST); gl.clearColor(0,0,0,0);
  canvas.hidden=false; hero.dataset.scene='ready';
  const events=new AbortController();
  const on=(target,type,fn,options={})=>target.addEventListener(type,fn,{...options,signal:events.signal});
  let frameId=0,last=0,time=motion.paused?2:0,inView=false,lost=false,disposed=false;
  let px=0,py=0,targetX=0,targetY=0,scroll=0,restoredCleanup;
  function render() {
    const r=canvas.getBoundingClientRect(), mobile=innerWidth<=650;
    const ratio=Math.min(devicePixelRatio,mobile?1.35:1.6);
    const w=Math.max(1,Math.round(r.width*ratio)),h=Math.max(1,Math.round(r.height*ratio));
    if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;gl.viewport(0,0,w,h);}
    const aspect=w/h;
    const entrance=1-Math.pow(1-Math.min(time/.95,1),3);
    gl.useProgram(program);
    gl.uniform1f(uniforms.Aspect,aspect);
    gl.uniform1f(uniforms.Angle,.38+Math.sin(time*.32)*.09+px*.12+(1-entrance)*.18+scroll*.12);
    gl.uniform1f(uniforms.Tilt,-.42+py*.045+Math.sin(time*.24)*.018);
    // On desktop the model occupies the right side of the full-width canvas.
    gl.uniform1f(uniforms.Scale,mobile?Math.min(aspect*1.38,1.7):Math.min(aspect*(innerWidth>1000?.66:.76),1.45)*(.97+.03*entrance));
    gl.uniform1f(uniforms.X,mobile?0:aspect*(innerWidth>1000?1.30:1.49));
    gl.uniform1f(uniforms.Y,mobile?.06:-.12+Math.sin(time*.48)*.025);
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES,0,vertices.length/11);
  }
  const playing=()=>!motion.paused&&inView&&!document.hidden&&!lost&&!disposed;
  function tick(now) {
    frameId=0;
    if(lost||disposed||document.hidden)return;
    const dt=last?Math.min((now-last)/1000,.04):0;
    last=now;
    if(playing()){
      time+=dt; const ease=1-Math.exp(-dt*5);
      px+=(targetX-px)*ease; py+=(targetY-py)*ease;
    }
    render();
    if(playing())frameId=requestAnimationFrame(tick);
  }
  function schedule() {
    cancelAnimationFrame(frameId);frameId=0;last=0;
    if(!lost&&!disposed&&!document.hidden)frameId=requestAnimationFrame(tick);
  }
  on(hero,'pointermove',e=>{
    if(e.pointerType!=='mouse'||motion.paused)return;
    const r=hero.getBoundingClientRect();
    targetX=(e.clientX-r.left)/r.width-.5;targetY=(e.clientY-r.top)/r.height-.5;
  },{passive:true});
  on(hero,'pointerleave',()=>{targetX=0;targetY=0;});
  on(window,'scroll',()=>{if(inView&&!motion.paused)scroll=Math.min(Math.max(-hero.getBoundingClientRect().top/innerHeight,0),1);},{passive:true});
  on(document,'visibilitychange',schedule);
  on(canvas,'webglcontextlost',e=>{e.preventDefault();lost=true;cancelAnimationFrame(frameId);hero.dataset.scene='unavailable';canvas.style.opacity='0';});
  on(canvas,'webglcontextrestored',()=>{dispose();canvas.style.opacity='';restoredCleanup=window.initValkiriaScene(motion);});
  const visibility=new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;schedule();});
  visibility.observe(canvas);
  const resize=new ResizeObserver(schedule);resize.observe(canvas);
  const unsubscribe=motion.subscribe(schedule);
  schedule();
  function dispose(){
    if(disposed)return;disposed=true;
    cancelAnimationFrame(frameId);events.abort();visibility.disconnect();resize.disconnect();unsubscribe();freeResources();
  }
  return()=>{dispose();restoredCleanup?.();};
};
