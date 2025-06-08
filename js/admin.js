// JS para admin.html: controle de acesso, cadastro e listagem de deposit-stations e items

document.addEventListener('DOMContentLoaded', async function () {
  // Controle de acesso: só ADMIN pode acessar
  const role = localStorage.getItem('usuarioRole');
  if (role !== 'ADMIN') {
    window.location.href = 'login.html';
    return;
  }

  // --- Deposit Stations ---
  const dsForm = document.getElementById('form-deposit-station');
  const dsTableBody = document.querySelector('#table-deposit-stations tbody');

  // Função para renderizar estações como cards no mobile
  function renderDepositStationsMobile(data) {
    const container = document.createElement('div');
    container.className = 'admin-cards-container';
    data.forEach(ds => {
      const card = document.createElement('div');
      card.className = 'admin-card';
      card.innerHTML = `
        <div><strong>ID:</strong> ${ds.id}</div>
        <div><strong>Nome:</strong> ${ds.name}</div>
        <div><strong>Categoria:</strong> ${ds.category}</div>
        <div><strong>Latitude:</strong> ${ds.latitude}</div>
        <div><strong>Longitude:</strong> ${ds.longitude}</div>
        <div><strong>Status:</strong> ${ds.status ? 'Ativo' : 'Inativo'}</div>
        <button class="btn-excluir-ds" data-id="${ds.id}">Excluir</button>
      `;
      container.appendChild(card);
    });
    const datatable = document.getElementById('table-deposit-stations');
    if (datatable) datatable.style.display = 'none';
    let cardsWrapper = document.getElementById('cards-deposit-stations');
    if (!cardsWrapper) {
      cardsWrapper = document.createElement('div');
      cardsWrapper.id = 'cards-deposit-stations';
      datatable.parentNode.appendChild(cardsWrapper);
    }
    cardsWrapper.innerHTML = '';
    cardsWrapper.appendChild(container);
    cardsWrapper.style.display = '';
    // Adiciona evento de exclusão
    cardsWrapper.querySelectorAll('.btn-excluir-ds').forEach(btn => {
      btn.addEventListener('click', async function() {
        if (confirm('Tem certeza que deseja excluir esta estação?')) {
          const id = this.getAttribute('data-id');
          try {
            const resp = await fetch(`http://localhost:3000/deposit-station/${id}`, { method: 'DELETE' });
            if (!resp.ok) throw new Error('Erro ao excluir estação');
            await carregarDepositStations();
          } catch (e) {
            alert('Erro ao excluir estação');
          }
        }
      });
    });
  }

  async function carregarDepositStations() {
    try {
      const resp = await fetch('http://localhost:3000/deposit-station');
      if (!resp.ok) throw new Error('Erro ao buscar estações');
      const data = await resp.json();
      if (window.innerWidth <= 600) {
        renderDepositStationsMobile(data);
      } else {
        // Renderização da tabela como antes
        const datatable = document.getElementById('table-deposit-stations');
        if (datatable) datatable.style.display = '';
        const cardsWrapper = document.getElementById('cards-deposit-stations');
        if (cardsWrapper) cardsWrapper.style.display = 'none';
        dsTableBody.innerHTML = '';
        data.forEach(ds => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${ds.id}</td>
            <td>${ds.name}</td>
            <td>${ds.category}</td>
            <td>${ds.latitude}</td>
            <td>${ds.longitude}</td>
            <td>${ds.status ? 'Ativo' : 'Inativo'}</td>
            <td><button class="btn-excluir-ds" data-id="${ds.id}">Excluir</button></td>
          `;
          dsTableBody.appendChild(tr);
        });
        dsTableBody.querySelectorAll('.btn-excluir-ds').forEach(btn => {
          btn.addEventListener('click', async function() {
            if (confirm('Tem certeza que deseja excluir esta estação?')) {
              const id = this.getAttribute('data-id');
              try {
                const resp = await fetch(`http://localhost:3000/deposit-station/${id}`, { method: 'DELETE' });
                if (!resp.ok) throw new Error('Erro ao excluir estação');
                await carregarDepositStations();
              } catch (e) {
                alert('Erro ao excluir estação');
              }
            }
          });
        });
      }
    } catch (e) {
      dsTableBody.innerHTML = '<tr><td colspan="7">Erro ao carregar estações</td></tr>';
    }
  }

  dsForm.onsubmit = async function (e) {
    e.preventDefault();
    const body = {
      name: dsForm['ds-name'].value,
      description: dsForm['ds-description'].value,
      latitude: parseFloat(dsForm['ds-latitude'].value),
      longitude: parseFloat(dsForm['ds-longitude'].value),
      category: dsForm['ds-category'].value,
      address: dsForm['ds-address'].value,
      status: true
    };
    try {
      const resp = await fetch('http://localhost:3000/deposit-station', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!resp.ok) throw new Error('Erro ao cadastrar estação');
      dsForm.reset();
      await carregarDepositStations();
    } catch (e) {
      alert('Erro ao cadastrar estação');
    }
  };

  // --- Items ---
  const itemForm = document.getElementById('form-item');
  const itemTableBody = document.querySelector('#table-items tbody');

  // Função para renderizar produtos como cards no mobile
  function renderItemsMobile(data) {
    const container = document.createElement('div');
    container.className = 'admin-cards-container';
    data.forEach(item => {
      const card = document.createElement('div');
      card.className = 'admin-card';
      card.innerHTML = `
        <div><strong>ID:</strong> ${item.id}</div>
        <div><strong>Nome:</strong> ${item.name}</div>
        <div><strong>Preço:</strong> ${item.price}</div>
        <div><strong>Estoque:</strong> ${item.stock}</div>
        <div><strong>Disponível:</strong> ${item.tradeEnabled ? 'Sim' : 'Não'}</div>
        <button class="btn-excluir-item" data-id="${item.id}">Excluir</button>
      `;
      container.appendChild(card);
    });
    const datatable = document.getElementById('table-items');
    if (datatable) datatable.style.display = 'none';
    let cardsWrapper = document.getElementById('cards-items');
    if (!cardsWrapper) {
      cardsWrapper = document.createElement('div');
      cardsWrapper.id = 'cards-items';
      datatable.parentNode.appendChild(cardsWrapper);
    }
    cardsWrapper.innerHTML = '';
    cardsWrapper.appendChild(container);
    cardsWrapper.style.display = '';
    // Adiciona evento de exclusão
    cardsWrapper.querySelectorAll('.btn-excluir-item').forEach(btn => {
      btn.addEventListener('click', async function() {
        if (confirm('Tem certeza que deseja excluir este produto?')) {
          const id = this.getAttribute('data-id');
          try {
            const resp = await fetch(`http://localhost:3000/item/${id}`, { method: 'DELETE' });
            if (!resp.ok) throw new Error('Erro ao excluir produto');
            await carregarItems();
          } catch (e) {
            alert('Erro ao excluir produto');
          }
        }
      });
    });
  }

  async function carregarItems() {
    try {
      const resp = await fetch('http://localhost:3000/item');
      if (!resp.ok) throw new Error('Erro ao buscar produtos');
      const data = await resp.json();
      if (window.innerWidth <= 600) {
        renderItemsMobile(data);
      } else {
        // Renderização da tabela como antes
        const datatable = document.getElementById('table-items');
        if (datatable) datatable.style.display = '';
        const cardsWrapper = document.getElementById('cards-items');
        if (cardsWrapper) cardsWrapper.style.display = 'none';
        itemTableBody.innerHTML = '';
        data.forEach(item => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.stock}</td>
            <td>${item.tradeEnabled ? 'Sim' : 'Não'}</td>
            <td><button class="btn-excluir-item" data-id="${item.id}">Excluir</button></td>
          `;
          itemTableBody.appendChild(tr);
        });
        itemTableBody.querySelectorAll('.btn-excluir-item').forEach(btn => {
          btn.addEventListener('click', async function() {
            if (confirm('Tem certeza que deseja excluir este produto?')) {
              const id = this.getAttribute('data-id');
              try {
                const resp = await fetch(`http://localhost:3000/item/${id}`, { method: 'DELETE' });
                if (!resp.ok) throw new Error('Erro ao excluir produto');
                await carregarItems();
              } catch (e) {
                alert('Erro ao excluir produto');
              }
            }
          });
        });
      }
    } catch (e) {
      itemTableBody.innerHTML = '<tr><td colspan="6">Erro ao carregar produtos</td></tr>';
    }
  }

  itemForm.onsubmit = async function (e) {
    e.preventDefault();
    const body = {
      name: itemForm['item-name'].value,
      description: itemForm['item-description'].value,
      price: parseInt(itemForm['item-price'].value),
      stock: parseInt(itemForm['item-stock'].value),
      tradeEnabled: itemForm['item-trade-enabled'].checked
    };
    try {
      const resp = await fetch('http://localhost:3000/item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!resp.ok) throw new Error('Erro ao cadastrar produto');
      itemForm.reset();
      await carregarItems();
    } catch (e) {
      alert('Erro ao cadastrar produto');
    }
  };

  // Switch entre Deposit Station e Item
  const switchContainer = document.createElement('div');
  switchContainer.className = 'admin-switch-container';
  switchContainer.innerHTML = `
    <button id="switch-ds" class="admin-switch-btn admin-switch-btn-active">Estações de Depósito</button>
    <button id="switch-item" class="admin-switch-btn">Produtos</button>
  `;
  const adminSections = document.querySelector('.admin-sections');
  adminSections.parentNode.insertBefore(switchContainer, adminSections);

  const dsSection = adminSections.children[0];
  const itemSection = adminSections.children[1];

  function showSection(section) {
    if (section === 'ds') {
      dsSection.style.display = '';
      itemSection.style.display = 'none';
      dsForm.reset();
    } else {
      dsSection.style.display = 'none';
      itemSection.style.display = '';
      itemForm.reset();
    }
    document.getElementById('switch-ds').classList.toggle('admin-switch-btn-active', section === 'ds');
    document.getElementById('switch-item').classList.toggle('admin-switch-btn-active', section === 'item');
  }

  document.getElementById('switch-ds').onclick = () => showSection('ds');
  document.getElementById('switch-item').onclick = () => showSection('item');
  // Inicializa mostrando Deposit Station
  showSection('ds');

  // Inicialização
  await carregarDepositStations();
  await carregarItems();

  window.addEventListener('resize', () => {
    carregarDepositStations();
    carregarItems();
  });
});
