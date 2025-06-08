// Script para importar o footer.html em todas as páginas

document.addEventListener('DOMContentLoaded', async function () {
  const footerContainer = document.getElementById('footer-container');
  if (!footerContainer) return;
  try {
    const resp = await fetch('footer.html');
    const html = await resp.text();
    footerContainer.innerHTML = html;
  } catch (e) {
    footerContainer.innerHTML = '<div style="color:red">Erro ao carregar o rodapé</div>';
  }
});
