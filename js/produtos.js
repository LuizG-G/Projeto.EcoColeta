// Script para listar produtos e permitir troca por pontos

document.addEventListener('DOMContentLoaded', async function () {
  const lista = document.getElementById('produtos-lista');
  const scoreDiv = document.getElementById('score-usuario');
  // Redireciona para login se não estiver logado
  let userId = localStorage.getItem('usuarioLogado');
  if (!userId) {
    window.location.href = 'login.html';
    return;
  }
  let accessToken = localStorage.getItem('accessToken');

  async function carregarScore() {
    try {
      const resp = await fetch(`http://localhost:3000/users/${userId}`);
      if (!resp.ok) throw new Error('Erro ao buscar score');
      const user = await resp.json();
      scoreDiv.innerHTML = `Seu score: <span id='score-atual'>${user.score}</span>`;
      return user.score;
    } catch (e) {
      scoreDiv.innerHTML = 'Erro ao carregar score.';
      return 0;
    }
  }

  async function carregarProdutos() {
    try {
      const resp = await fetch('http://localhost:3000/item');
      if (!resp.ok) throw new Error('Erro ao buscar produtos');
      const produtos = await resp.json();
      lista.innerHTML = '';
      produtos.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'produto-card';
        card.innerHTML = `
          <h3>${produto.name}</h3>
          <p>${produto.description}</p>
          <div class='preco'>Preço: ${produto.price} pontos</div>
          <div class='estoque'>Estoque: ${produto.stock}</div>
          <button ${produto.stock <= 0 ? 'disabled' : ''}>Trocar</button>
        `;
        const btn = card.querySelector('button');
        btn.addEventListener('click', async () => {
          btn.disabled = true;
          btn.textContent = 'Processando...';
          try {
            const tradeResp = await fetch('http://localhost:3000/trade/make', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {})
              },
              body: JSON.stringify({ userId: Number(userId), itemId: produto.id })
            });
            if (tradeResp.ok) {
              btn.textContent = 'Trocado!';
              await carregarScore();
              setTimeout(() => { btn.textContent = 'Trocar'; btn.disabled = false; }, 2000);
              showModalSucessoTroca();
            } else {
              const erro = await tradeResp.json();
              btn.textContent = 'Erro';
              alert(erro.message || 'Erro ao realizar troca.');
              setTimeout(() => { btn.textContent = 'Trocar'; btn.disabled = false; }, 2000);
            }
          } catch (e) {
            btn.textContent = 'Erro';
            alert('Erro ao realizar troca.');
            setTimeout(() => { btn.textContent = 'Trocar'; btn.disabled = false; }, 2000);
          }
        });
        lista.appendChild(card);
      });
    } catch (e) {
      lista.innerHTML = '<div style="color:red">Erro ao carregar produtos.</div>';
    }
  }

  // Adiciona um modal customizado para sucesso de troca
  function showModalSucessoTroca() {
    let modal = document.getElementById('modal-troca-sucesso');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'modal-troca-sucesso';
      modal.style.position = 'fixed';
      modal.style.top = '0';
      modal.style.left = '0';
      modal.style.width = '100vw';
      modal.style.height = '100vh';
      modal.style.background = 'rgba(0,0,0,0.35)';
      modal.style.display = 'flex';
      modal.style.alignItems = 'center';
      modal.style.justifyContent = 'center';
      modal.style.zIndex = '9999';
      modal.innerHTML = `
        <div style="background:#fff; border-radius:12px; box-shadow:0 2px 16px #0003; padding:32px 28px; max-width:340px; text-align:center;">
          <h3 style="color:#1b5e20; margin-bottom:12px;">Troca efetuada com sucesso!</h3>
          <p style="color:#388e3c; font-size:1.1em;">Para mais informações, verifique seu e-mail.</p>
          <button id="fechar-modal-troca" style="margin-top:18px; background:#388e3c; color:#fff; border:none; border-radius:6px; padding:10px 28px; font-weight:bold; font-size:1em; cursor:pointer;">OK</button>
        </div>
      `;
      document.body.appendChild(modal);
      document.getElementById('fechar-modal-troca').onclick = () => {
        modal.remove();
      };
    } else {
      modal.style.display = 'flex';
    }
  }

  await carregarScore();
  await carregarProdutos();
});
