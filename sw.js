// Service worker mínimo: no cachea nada, solo habilita que el navegador
// ofrezca "Instalar app". Deja pasar sin tocar cualquier pedido que no sea
// del propio origen (Firebase, fuentes de Google, etc.) para no interferir.
const ORIGEN = self.location.origin;

self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', (e) => { e.waitUntil(self.clients.claim()); });

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    if (url.origin !== ORIGEN) return; // no tocar Firebase / fuentes externas
    event.respondWith(fetch(event.request));
});
