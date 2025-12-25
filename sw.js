const CACHE="kasir-pro-offline-v1";
const FILES=[
"./","./index.html","./style.css","./app.js",
"./barcode-camera.js","./manifest.webmanifest",
"./icon-192.png","./icon-512.png",
"./libs/quagga.min.js","./libs/xlsx.full.min.js"
];
self.addEventListener("install",e=>{
e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));
});
self.addEventListener("fetch",e=>{
e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
