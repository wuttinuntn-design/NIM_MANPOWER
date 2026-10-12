/* Service worker: ให้ติดตั้งเป็นแอปได้ + เปิดเร็วขึ้น (ข้อมูลจาก Google Sheet ไม่ถูกแคช) */
const C='roster-v49';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','manifest.webmanifest','icon-192.png']).catch(()=>{})))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||/script\.google(usercontent)?\.com$/.test(u.hostname))return;      // API: ไม่แคช
  if(u.hostname==='cdnjs.cloudflare.com'||u.hostname.endsWith('gstatic.com')){                    // ไลบรารี/ฟอนต์: แคชก่อน
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{const cp=n.clone();caches.open(C).then(c=>c.put(e.request,cp));return n})));return}
  if(u.origin===location.origin){                                                                    // หน้าเว็บ: ออนไลน์ก่อน ไม่มีเน็ตใช้ที่แคช
    e.respondWith(fetch(e.request).then(n=>{const cp=n.clone();caches.open(C).then(c=>c.put(e.request,cp));return n}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./'))))}
});
