import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  PlaneGeometry,
  ShaderMaterial,
  Mesh,
  Vector2,
  Vector3,
  Raycaster,
  DoubleSide,
} from "three";

export const MOTIF = { insight: 0, stack: 1, lens: 2, filings: 3, hero: 4 };

const TRAIL = 16;
const PLANE_W = 18;
const PLANE_H = 12;
const THREADS_PER_UNIT = 20;

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uBillow;
uniform float uLiftAmp;
uniform vec3 uTrail[${TRAIL}];
uniform vec2 uSize;

varying vec2 vUv;
varying vec3 vPos;
varying vec3 vN;
varying vec3 vTx;
varying vec3 vTy;
varying float vLift;

float lift(vec2 uv) {
  float l = 0.0;
  for (int i = 0; i < ${TRAIL}; i++) {
    vec2 d = (uv - uTrail[i].xy) * uSize;
    l += uTrail[i].z * exp(-dot(d, d) / 0.8);
  }
  return 1.0 - exp(-l);
}

float height(vec2 p, vec2 uv) {
  float t = uTime * 0.32;
  float z = sin(p.x * 0.52 + t + p.y * 0.14) * 0.42
          + sin(p.y * 0.85 - t * 1.25 + p.x * 0.27) * 0.24
          + sin((p.x * 0.8 + p.y) * 1.6 + t * 1.8) * 0.05;
  return z * uBillow + lift(uv) * uLiftAmp;
}

void main() {
  vUv = uv;
  vec2 p = position.xy;
  float e = 0.06;
  vec2 eu = vec2(e / uSize.x, 0.0);
  vec2 ev = vec2(0.0, e / uSize.y);
  float h = height(p, uv);
  float hx = (height(p + vec2(e, 0.0), uv + eu) - height(p - vec2(e, 0.0), uv - eu)) / (2.0 * e);
  float hy = (height(p + vec2(0.0, e), uv + ev) - height(p - vec2(0.0, e), uv - ev)) / (2.0 * e);
  vLift = lift(uv);

  mat3 m = mat3(modelMatrix);
  vN = normalize(m * vec3(-hx, -hy, 1.0));
  vTx = normalize(m * vec3(1.0, 0.0, hx));
  vTy = normalize(m * vec3(0.0, 1.0, hy));

  vec4 world = modelMatrix * vec4(p, h, 1.0);
  vPos = world.xyz;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

const fragmentShader = /* glsl */ `
uniform float uTime;
uniform float uWeave;
uniform vec2 uThreads;
uniform float uMotifA;
uniform float uMotifB;
uniform float uSweep;
uniform vec3 uCam;
uniform vec2 uRes;
uniform float uShade;
uniform float uShadeX;
uniform float uHeroShade;
uniform float uGlow;

varying vec2 vUv;
varying vec3 vPos;
varying vec3 vN;
varying vec3 vTx;
varying vec3 vTy;
varying float vLift;

const vec3 BG = vec3(0.165, 0.035, 0.063);
const vec3 SHADE = vec3(0.13, 0.026, 0.05);
const vec3 WARP = vec3(0.36, 0.055, 0.105);
const vec3 WEFT = vec3(0.23, 0.035, 0.07);
const vec3 GOLD = vec3(0.80, 0.56, 0.20);
const vec3 GOLD_HI = vec3(1.0, 0.86, 0.55);
const vec3 GAP = vec3(0.05, 0.008, 0.016);

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float diamond(vec2 p) { return abs(p.x) + abs(p.y); }
float square(vec2 p) { return max(abs(p.x), abs(p.y)); }

// bunga tabur: half-drop eight-point stars
float mStars(vec2 c, float s) {
  float row = floor(c.y / s);
  vec2 q = vec2(c.x + mod(row, 2.0) * s * 0.5, c.y);
  vec2 p = mod(q, s) - s * 0.5 + 0.5;
  float star = max(step(diamond(p), 8.0), step(square(p), 5.0));
  float inner = max(step(diamond(p), 5.0), step(square(p), 2.5));
  float core = step(diamond(p), 1.0);
  vec2 k = mod(q + s * 0.5, s) - s * 0.5 + 0.5;
  float seed = step(diamond(k), 1.5);
  return max(max(star - inner, core), seed);
}

// pucuk rebung: rows of bamboo-shoot triangles
float mShoots(vec2 c) {
  float w = 18.0, h = 26.0;
  vec2 p = vec2(mod(c.x, w) - w * 0.5 + 0.5, mod(c.y, h));
  float hw = (h - 4.0 - p.y) * 0.36;
  float tri = step(abs(p.x), hw) * step(p.y, h - 4.0);
  float hollow = step(abs(p.x), hw - 2.0) * step(p.y, h - 8.0) * step(2.0, p.y);
  float spine = step(abs(p.x), 0.5) * step(4.0, p.y) * step(p.y, h - 10.0);
  float band = step(p.y, 1.0) * step(mod(c.x, 4.0), 2.0);
  return max(max(tri - hollow, spine), band);
}

// bunga cengkih: focusing diamond rings
float mRings(vec2 c) {
  float s = 30.0;
  vec2 p = mod(c, s) - s * 0.5 + 0.5;
  float d = diamond(p);
  float rings = step(mod(d + 0.5, 4.0), 1.0) * step(d, 13.0);
  float core = step(d, 1.5);
  return max(rings, core);
}

// teluk berantai: chained lattice with an index mark in each cell
float mLattice(vec2 c) {
  float s = 16.0;
  float a = step(mod(c.x + c.y, s), 1.9);
  float b = step(mod(c.x - c.y, s), 1.9);
  vec2 p = mod(vec2(c.x + c.y, c.x - c.y), s) - s * 0.5;
  float mark = step(square(p), 1.6);
  return max(max(a, b), mark);
}

// kepala kain: shoot border at the head, scattered stars in the body
float mHero(vec2 c) {
  float y = mod(c.y, 150.0);
  if (y < 28.0) return mShoots(c);
  if (y < 32.0) return step(mod(c.x + y, 3.0), 1.0) * step(29.0, y) * step(y, 30.0);
  return mStars(c, 34.0);
}

float motif(float id, vec2 c) {
  if (id < 0.5) return mStars(c, 26.0);
  if (id < 1.5) return mShoots(c);
  if (id < 2.5) return mRings(c);
  if (id < 3.5) return mLattice(c);
  return mHero(c);
}

void main() {
  vec2 g = (vUv + vec2(0.0, uWeave)) * uThreads;
  vec2 c = floor(g);
  vec2 f = fract(g);

  vec2 sp = gl_FragCoord.xy / uRes;
  float gate = sp.y * 0.85 + hash(floor(c / 3.0)) * 0.15;
  float id = gate < uSweep ? uMotifB : uMotifA;
  float gold = motif(id, c);

  float tie = step(mod(c.x + mod(c.y, 2.0) * 3.0, 6.0), 0.5);
  bool goldTop = gold > 0.5 && tie < 0.5;
  bool warpTop = mod(c.x + c.y, 2.0) < 1.0;

  vec3 N = normalize(vN);
  vec3 T;
  vec3 B;
  float across;
  float along;
  vec3 base;
  float width;
  if (goldTop) {
    T = vTx; B = vTy; across = f.y; along = f.x; base = GOLD; width = 0.47;
  } else if (warpTop) {
    T = vTy; B = vTx; across = f.x; along = f.y; base = WARP; width = 0.42;
  } else {
    T = vTx; B = vTy; across = f.y; along = f.x; base = WEFT; width = 0.42;
  }

  float n = clamp((across - 0.5) / width, -1.0, 1.0);
  float cover = 1.0 - smoothstep(0.86, 1.0, abs((across - 0.5) / width));
  vec3 Nt = normalize(N * sqrt(1.0 - n * n) + B * n);
  float dip = goldTop ? 1.0 : 0.72 + 0.28 * sin(3.14159 * along);

  vec3 V = normalize(uCam - vPos);
  vec3 L = normalize(vec3(-0.45, 0.65, 0.75));
  vec3 H = normalize(L + V);
  float diff = max(dot(Nt, L), 0.0) * 0.75 + 0.25;
  float th = dot(normalize(T), H);
  float sinTH = sqrt(max(1.0 - th * th, 0.0));
  float facing = smoothstep(-0.1, 0.2, dot(Nt, L));

  vec3 col;
  if (goldTop) {
    float spec = pow(sinTH, 34.0) * facing;
    col = base * (0.35 + diff * 0.75) + GOLD_HI * spec * 1.25;
    col += GOLD_HI * vLift * uGlow * 0.3;
  } else {
    float spec = pow(sinTH, 70.0) * facing;
    col = base * diff * dip + vec3(0.55, 0.22, 0.25) * spec * 0.35;
    col += vec3(0.5, 0.16, 0.12) * vLift * uGlow * 0.25;
  }
  col = mix(GAP, col, cover);

  float flat_diff = max(dot(N, L), 0.0) * 0.75 + 0.25;
  vec3 avg = mix((WARP + WEFT) * 0.5 * flat_diff * 0.9, GOLD * (0.35 + flat_diff * 0.7), gold * 0.8);
  avg += GOLD_HI * vLift * uGlow * 0.4 * gold;
  vec2 fw = fwidth(g);
  float detail = 1.0 - smoothstep(0.35, 0.85, max(fw.x, fw.y));
  col = mix(avg, col, detail);

  float side = 1.0 - smoothstep(uShadeX - 0.08, uShadeX + 0.22, sp.x);
  float hero = (1.0 - smoothstep(0.12, 0.92, sp.y)) * (0.7 + 0.3 * (1.0 - smoothstep(0.3, 0.95, sp.x)));
  float shade = max(side * uShade, hero * uHeroShade);
  col = mix(col, SHADE, shade * 0.8);
  col = min(col, vec3(1.0, 0.93, 0.75));

  float dist = length(uCam - vPos);
  col = mix(col, BG, smoothstep(9.0, 16.0, dist) * 0.85);

  gl_FragColor = vec4(col, 1.0);
}
`;

export function createLoom(canvas, { reduced }) {
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: false, powerPreference: "high-performance" });
  } catch {
    return null;
  }
  renderer.setClearColor(0x2a0910, 1);

  const scene = new Scene();
  const camera = new PerspectiveCamera(38, 1, 0.1, 60);
  camera.position.set(0, -0.6, 9.2);

  const uniforms = {
    uTime: { value: 0 },
    uBillow: { value: 1 },
    uLiftAmp: { value: 0.55 },
    uTrail: { value: Array.from({ length: TRAIL }, () => new Vector3(-9, -9, 0)) },
    uSize: { value: new Vector2(PLANE_W, PLANE_H) },
    uWeave: { value: 0 },
    uThreads: { value: new Vector2(PLANE_W * THREADS_PER_UNIT, PLANE_H * THREADS_PER_UNIT) },
    uMotifA: { value: MOTIF.hero },
    uMotifB: { value: MOTIF.hero },
    uSweep: { value: 0 },
    uCam: { value: camera.position },
    uRes: { value: new Vector2(1, 1) },
    uShade: { value: 0 },
    uShadeX: { value: 0.55 },
    uHeroShade: { value: 1 },
    uGlow: { value: 1 },
  };

  const mesh = new Mesh(
    new PlaneGeometry(PLANE_W, PLANE_H, 180, 120),
    new ShaderMaterial({ uniforms, vertexShader, fragmentShader, side: DoubleSide }),
  );
  scene.add(mesh);

  const pose = { rx: -0.42, ry: 0, rz: 0.06, x: 0, y: 0, billow: 1, shade: 0, shadeX: 0.55, heroShade: 1 };
  const target = { ...pose };

  const raycaster = new Raycaster();
  const ndc = new Vector2();
  let trailIndex = 0;
  let lastUv = null;
  let lastMoveT = 0;

  const sweep = { from: MOTIF.hero, to: MOTIF.hero, t: 1, dur: 1.1 };

  let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  let width = 0;
  let height = 0;
  let running = false;
  let lastT = performance.now();
  let slowFrames = 0;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.fov = width < 700 ? 46 : 38;
    camera.updateProjectionMatrix();
    uniforms.uRes.value.set(width * dpr, height * dpr);
    if (reduced) frame(performance.now());
  }

  function setPose(next) {
    Object.assign(target, next);
    if (reduced) {
      Object.assign(pose, target);
        frame(performance.now());
    }
  }

  function setMotif(id) {
    if (id === sweep.to) return;
    if (reduced) {
      sweep.from = sweep.to = id;
      sweep.t = 1;
      frame(performance.now());
      return;
    }
    sweep.from = sweep.to;
    sweep.to = id;
    sweep.t = 0;
  }

  function setWeave(v) {
    if (reduced) return;
    uniforms.uWeave.value = v;
  }

  function pointer(clientX, clientY) {
    if (reduced) return;
    ndc.set((clientX / width) * 2 - 1, -(clientY / height) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    const hit = raycaster.intersectObject(mesh, false)[0];
    if (!hit || !hit.uv) return;
    const now = performance.now();
    const uv = hit.uv;
    if (lastUv) {
      const dx = (uv.x - lastUv.x) * PLANE_W;
      const dy = (uv.y - lastUv.y) * PLANE_H;
      const dist = Math.hypot(dx, dy);
      if (dist < 0.12) return;
      const speed = dist / Math.max((now - lastMoveT) / 1000, 0.016);
      const strength = Math.min(0.25 + speed * 0.05, 0.85);
      uniforms.uTrail.value[trailIndex].set(uv.x, uv.y, strength);
      trailIndex = (trailIndex + 1) % TRAIL;
    }
    lastUv = uv.clone();
    lastMoveT = now;
  }

  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  function frame(now) {
    const dt = Math.min((now - lastT) / 1000, 0.05);
    lastT = now;

    if (!reduced) {
      uniforms.uTime.value += dt;
      const k = 1 - Math.exp(-dt * 2.4);
      for (const key of Object.keys(pose)) pose[key] += (target[key] - pose[key]) * k;
      const decay = Math.exp(-dt * 1.5);
      for (const p of uniforms.uTrail.value) p.z *= decay;
      if (sweep.t < 1) sweep.t = Math.min(1, sweep.t + dt / sweep.dur);
    }

    mesh.rotation.set(pose.rx, pose.ry, pose.rz);
    mesh.position.set(pose.x, pose.y, 0);
    uniforms.uBillow.value = pose.billow;
    uniforms.uShade.value = pose.shade;
    uniforms.uShadeX.value = pose.shadeX;
    uniforms.uHeroShade.value = pose.heroShade;
    uniforms.uMotifA.value = sweep.from;
    uniforms.uMotifB.value = sweep.to;
    uniforms.uSweep.value = sweep.t >= 1 ? 2 : ease(sweep.t) * 1.15;
    if (sweep.t >= 1) sweep.from = sweep.to;

    renderer.render(scene, camera);

    if (!reduced && dt > 0.034) {
      slowFrames += 1;
      if (slowFrames > 45 && dpr > 0.75) {
        dpr = Math.max(0.75, dpr - 0.25);
        slowFrames = 0;
        resize();
      }
    } else if (slowFrames > 0) {
      slowFrames -= 0.5;
    }
  }

  function loop(now) {
    if (!running) return;
    frame(now);
    requestAnimationFrame(loop);
  }

  function start() {
    if (reduced) {
      frame(performance.now());
      return;
    }
    if (running) return;
    running = true;
    lastT = performance.now();
    requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
  }

  resize();
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));

  return { start, setPose, setMotif, setWeave, pointer };
}
