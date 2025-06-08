// Script para importar o header.html e ativar o menu e logoff em todas as páginas

async function carregarHeader() {
  const headerContainer = document.getElementById('header-container');
  if (!headerContainer) return;
  try {
    const resp = await fetch('header.html');
    const html = await resp.text();
    headerContainer.innerHTML = html;
    ativarMenuELogoff();
  } catch (e) {
    headerContainer.innerHTML = '<div style="color:red">Erro ao carregar menu</div>';
  }
}

function ativarMenuELogoff() {
  const emailLogado = localStorage.getItem("usuarioEmail");
  const isLogado = !!localStorage.getItem("usuarioLogado");
  // Esconde links de páginas restritas se não estiver logado
  const linksRestritos = [
    'a[href="produtos.html"]',
    'a[href="deposito.html"]',
    'a[href="historico.html"]',
    'a[href="admin.html"]'
  ];
  if (!isLogado) {
    linksRestritos.forEach(sel => {
      const el = document.querySelector(sel);
      if (el) el.style.display = 'none';
    });
  }
  // Exibe link admin só se for admin
  const role = localStorage.getItem('usuarioRole');
  const adminLink = document.querySelector('a[href="admin.html"]');
  if (adminLink) {
    adminLink.style.display = (role === 'ADMIN') ? '' : 'none';
  }

  if (emailLogado) {
    document.querySelector('.menu-login').style.display = 'none';
    document.querySelector('.menu-cadastro').style.display = 'none';
    const usuarioTopo = document.getElementById('usuario-logado-topo');
    usuarioTopo.style.display = 'block';
    usuarioTopo.innerHTML = `👤 ${emailLogado} <span id='icon-logoff' title='Sair' style='cursor:pointer; margin-left:8px; color:#c62828; font-size:1.2em; vertical-align:middle;'>🚪</span>`;
    document.getElementById('icon-logoff').onclick = function() {
      localStorage.removeItem('usuarioLogado');
      localStorage.removeItem('usuarioEmail');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('usuarioRole');
      window.location.href = 'login.html';
    };
  }
  // Menu expansível para mobile com ícone
  const menuToggle = document.getElementById('menu-toggle');
  const menuIcon = document.getElementById('menu-icon');
  const menuNav = document.getElementById('menu-navegacao');
  let menuAberto = false;
  function alternarMenu() {
    menuAberto = !menuAberto;
    menuNav.style.display = menuAberto ? 'flex' : 'none';
  }
  menuToggle.addEventListener('click', alternarMenu);
  menuIcon.addEventListener('click', alternarMenu);
  menuNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 800) {
        menuNav.style.display = 'none';
        menuAberto = false;
      }
    });
  });
  function ajustarMenuPorTamanho() {
    if (window.innerWidth >= 800) {
      menuNav.style.display = 'flex';
      menuIcon.style.display = 'none';
    } else {
      menuIcon.style.display = 'inline-block';
      if (!menuAberto) menuNav.style.display = 'none';
    }
  }
  window.addEventListener('resize', ajustarMenuPorTamanho);
  ajustarMenuPorTamanho();
}

document.addEventListener('DOMContentLoaded', carregarHeader);
