// Script para página de histórico de depósitos e trocas

document.addEventListener('DOMContentLoaded', async function () {
  const lista = document.getElementById('historico-lista');
  const vazio = document.getElementById('historico-vazio');
  // Redireciona para login se não estiver logado
  let userId = localStorage.getItem('usuarioLogado');
  if (!userId) {
    window.location.href = 'login.html';
    return;
  }
  let accessToken = localStorage.getItem('accessToken');

  function formatarData(dataStr) {
    if (!dataStr) return '';
    const data = new Date(dataStr);
    return data.toLocaleString('pt-BR', { hour12: false });
  }

  async function carregarHistorico() {
    lista.innerHTML = '';
    let historico = [];
    try {
      // Busca depósitos
      const respDeposito = await fetch(`http://localhost:3000/deposit/usuario/${userId}`);
      let depositos = [];
      if (respDeposito.ok) {
        depositos = await respDeposito.json();
        depositos = depositos.map(dep => ({
          tipo: 'Depósito',
          data: dep.createdAt || dep.data || dep.updatedAt,
          descricao: dep.description || '-',
          valor: dep.weightInKg ? `${dep.weightInKg} kg` : '',
          extra: dep.category ? `Categoria: ${dep.category}` : ''
        }));
      }
      // Busca trocas
      const respTroca = await fetch(`http://localhost:3000/trade/usuario/${userId}`);
      let trocas = [];
      if (respTroca.ok) {
        trocas = await respTroca.json();
        trocas = trocas.map(trade => {
          let nomeProduto = '-';
          if (trade.item && trade.item.name) {
            nomeProduto = trade.item.name;
          } else if (trade.itemId && trade.itemId.name) {
            nomeProduto = trade.itemId.name;
          } else if (trade.itemId && typeof trade.itemId === 'string') {
            nomeProduto = trade.itemId;
          }
          return {
            tipo: 'Troca',
            data: trade.createdAt || trade.data || trade.updatedAt,
            descricao: nomeProduto !== '-' ? `Produto: ${nomeProduto}` : '-',
            valor: trade.item && trade.item.price ? `-${trade.item.price} pontos` : (trade.price ? `-${trade.price} pontos` : ''),
            extra: trade.status ? `Status: ${trade.status}` : ''
          };
        });
      }
      historico = [...depositos, ...trocas];
      // Ordena o histórico pela data (mais recente primeiro)
      historico.sort((a, b) => {
        // Tenta pegar a data do campo 'data', se não existir tenta extrair da description
        const getData = (item) => {
          if (item.data) return new Date(item.data);
          if (item.descricao) {
            // Procura por um padrão de data na descrição (ex: 2025-06-08 ou 08/06/2025)
            const match = item.descricao.match(/(\d{4}-\d{2}-\d{2})|(\d{2}\/\d{2}\/\d{4})/);
            if (match) {
              // Tenta converter para Date
              const str = match[0];
              if (str.includes('-')) return new Date(str);
              if (str.includes('/')) {
                const [dia, mes, ano] = str.split('/');
                return new Date(`${ano}-${mes}-${dia}`);
              }
            }
          }
          return new Date(0); // Se não achar, joga pro final
        };
        return getData(b) - getData(a);
      });
    } catch (e) {
      vazio.style.display = '';
      vazio.textContent = 'Erro ao carregar histórico.';
      return;
    }
    if (!historico.length) {
      vazio.style.display = '';
      vazio.textContent = 'Nenhum depósito ou troca encontrado.';
      return;
    }
    vazio.style.display = 'none';
    historico.forEach(item => {
      const card = document.createElement('div');
      card.className = 'historico-card';
      card.innerHTML = `
        <div class="tipo">${item.tipo}</div>
        <div class="data">${formatarData(item.data)}</div>
        <div class="descricao">${item.descricao}</div>
        <div class="valor">${item.valor}</div>
        ${item.extra ? `<div class="extra">${item.extra}</div>` : ''}
      `;
      lista.appendChild(card);
    });
  }

  await carregarHistorico();
});
