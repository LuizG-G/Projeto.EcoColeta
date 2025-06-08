// Este script carrega os pontos de coleta do back-end e plota no mapa Leaflet

document.addEventListener('DOMContentLoaded', async function () {
  // Centraliza o mapa em Recife e ajusta o zoom para mostrar os pontos
  const map = L.map('map').setView([-8.05, -34.9], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Busca pontos de coleta do back-end
  try {
    const response = await fetch('http://localhost:3000/deposit-station');
    if (!response.ok) throw new Error('Erro ao buscar pontos de coleta');
    const pontos = await response.json();

    const markers = [];
    pontos.forEach(ponto => {
      if (ponto.latitude && ponto.longitude) {
        const marker = L.marker([ponto.latitude, ponto.longitude])
          .addTo(map)
          .bindPopup(
            `<b>${ponto.name}</b><br>` +
            (ponto.address ? `<b>Endereço:</b> ${ponto.address}<br>` : '') +
            `${ponto.description ? ponto.description + '<br>' : ''}` +
            `<b>Categoria:</b> ${ponto.category}`
          );
        markers.push(marker);
      }
    });
    // Ajusta o mapa para mostrar todos os pontos
    if (markers.length > 0) {
      const group = L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.2));
    }
  } catch (err) {
    alert('Erro ao carregar pontos de coleta.');
    console.error(err);
  }
});
