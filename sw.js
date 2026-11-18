/* sw.js (ปิดการใช้งาน) · ล้างแคชเดิมและยกเลิกตัวเอง เพื่อให้ผู้ที่ติดตั้งแอปจากลิงก์เก่าเห็นหน้า "ย้ายแล้ว" */
self.addEventListener('install',function(){self.skipWaiting()});
self.addEventListener('activate',function(e){
  e.waitUntil((async function(){
    try{var k=await caches.keys();await Promise.all(k.map(function(n){return caches.delete(n)}))}catch(x){}
    try{await self.registration.unregister()}catch(x){}
    try{var cs=await self.clients.matchAll({type:'window'});cs.forEach(function(c){c.navigate(c.url)})}catch(x){}
  })());
});
self.addEventListener('fetch',function(){});
