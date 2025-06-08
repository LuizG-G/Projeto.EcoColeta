// Script para página de depósito de materiais

document.addEventListener('DOMContentLoaded', async function () {
  const scoreDiv = document.getElementById('score-usuario');
  const selectStation = document.getElementById('station');
  const formDeposito = document.getElementById('form-deposito');
  const codigoDiv = document.getElementById('codigo-ficticio');
  const loadingDiv = document.getElementById('loading');
  const sucessoDiv = document.getElementById('deposito-sucesso');
  const novoDepositoBtn = document.getElementById('novo-deposito');
  const selectCategoria = document.getElementById('categoria');
  const stationGroup = document.getElementById('station-group');
  const inputWeight = document.getElementById('weight');
  const weightGroup = document.getElementById('weight-group');
  let userId = localStorage.getItem('usuarioLogado');
  let accessToken = localStorage.getItem('accessToken');
  let userScore = 0;

  // Redireciona para login se não estiver logado
  if (!userId) {
    window.location.href = 'login.html';
    return;
  }

  async function carregarScore() {
    try {
      const resp = await fetch(`http://localhost:3000/users/${userId}`);
      if (!resp.ok) throw new Error('Erro ao buscar score');
      const user = await resp.json();
      userScore = user.score;
      scoreDiv.innerHTML = `Seu score: <span id='score-atual'>${user.score}</span>`;
    } catch (e) {
      scoreDiv.innerHTML = 'Erro ao carregar score.';
    }
  }

  async function carregarStations() {
    try {
      const resp = await fetch('http://localhost:3000/deposit-station');
      if (!resp.ok) throw new Error('Erro ao buscar estações');
      const stations = await resp.json();
      let categoriaSelecionada = selectCategoria.value;
      selectStation.innerHTML = '<option value="">Selecione uma estação</option>';
      stations.forEach(station => {
        // Exibe se for "Todos" ou se a categoria da estação for igual à selecionada
        if (
          !categoriaSelecionada ||
          station.category === 'Todos' ||
          station.category === categoriaSelecionada
        ) {
          const opt = document.createElement('option');
          opt.value = station.id;
          opt.textContent = `${station.name} - ${station.address}`;
          selectStation.appendChild(opt);
        }
      });
    } catch (e) {
      selectStation.innerHTML = '<option value="">Erro ao carregar estações</option>';
    }
  }

  // Esconde o campo de estação e peso até escolher categoria
  selectStation.disabled = true;
  stationGroup.style.display = 'none';
  weightGroup.style.display = 'none';

  selectCategoria.addEventListener('change', function() {
    if (selectCategoria.value) {
      selectStation.disabled = false;
      stationGroup.style.display = '';
      weightGroup.style.display = '';
      carregarStations();
    } else {
      selectStation.disabled = true;
      stationGroup.style.display = 'none';
      weightGroup.style.display = 'none';
      selectStation.innerHTML = '<option value="">Selecione uma estação</option>';
    }
    validarForm();
  });

  function gerarCodigoFicticio() {
    // Exemplo: 6 dígitos aleatórios
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Desabilita o botão de submit até os campos obrigatórios estarem preenchidos
  const btnSubmit = formDeposito.querySelector('button[type="submit"]');
  function validarForm() {
    const categoriaOk = !!selectCategoria.value;
    const stationOk = !!selectStation.value && !selectStation.disabled && stationGroup.style.display !== 'none';
    const weightOk = !!inputWeight.value && weightGroup.style.display !== 'none' && parseFloat(inputWeight.value) > 0;
    btnSubmit.disabled = !(categoriaOk && stationOk && weightOk);
  }
  selectCategoria.addEventListener('change', validarForm);
  selectStation.addEventListener('change', validarForm);
  inputWeight.addEventListener('input', validarForm);
  // Inicializa o botão desabilitado
  btnSubmit.disabled = true;

  formDeposito.addEventListener('submit', function (e) {
    e.preventDefault();
    const stationId = selectStation.value;
    const categoria = selectCategoria.value;
    const weight = parseFloat(inputWeight.value);
    if (!stationId || !categoria || !weight || weight <= 0) return;
    formDeposito.style.display = 'none';
    codigoDiv.textContent = 'Seu código de depósito: ' + gerarCodigoFicticio();
    codigoDiv.style.display = 'block';
    loadingDiv.style.display = 'none';
    sucessoDiv.style.display = 'none';
    novoDepositoBtn.style.display = 'none';
    // Após 10 segundos, mostra loading
    setTimeout(() => {
      codigoDiv.style.display = 'none';
      loadingDiv.style.display = 'block';
      // Após 2 segundos, faz o depósito
      setTimeout(async () => {
        try {
          // Gera descrição customizada
          const data = new Date();
          const dataBR = data.toLocaleString('pt-BR', { hour12: false });
          const description = `Depósito de ${categoria} em ${dataBR}`;
          const resp = await fetch('http://localhost:3000/deposit/make', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {})
            },
            body: JSON.stringify({ userId: Number(userId), depositStationId: Number(stationId), category: categoria, description, weightInKg: weight })
          });
          if (resp.ok) {
            loadingDiv.style.display = 'none';
            sucessoDiv.textContent = 'Depósito realizado com sucesso!';
            sucessoDiv.style.display = 'block';
            await carregarScore();
            novoDepositoBtn.style.display = 'block';
          } else {
            loadingDiv.style.display = 'none';
            sucessoDiv.textContent = 'Erro ao realizar depósito.';
            sucessoDiv.style.display = 'block';
            novoDepositoBtn.style.display = 'block';
          }
        } catch (e) {
          loadingDiv.style.display = 'none';
          sucessoDiv.textContent = 'Erro ao realizar depósito.';
          sucessoDiv.style.display = 'block';
          novoDepositoBtn.style.display = 'block';
        }
      }, 2000);
    }, 10000);
  });

  novoDepositoBtn.addEventListener('click', function () {
    formDeposito.reset();
    formDeposito.style.display = 'block';
    codigoDiv.style.display = 'none';
    loadingDiv.style.display = 'none';
    sucessoDiv.style.display = 'none';
    novoDepositoBtn.style.display = 'none';
    stationGroup.style.display = 'none';
    selectStation.disabled = true;
    weightGroup.style.display = 'none';
    validarForm();
  });

  await carregarScore();
});
