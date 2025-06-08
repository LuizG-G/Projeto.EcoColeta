function calcularValor() {
  const materialSelect = document.getElementById("material");
  const quantidadeInput = document.getElementById("quantidade");
  const resultadoDiv = document.getElementById("resultado");

  if (!materialSelect || !quantidadeInput || !resultadoDiv) {
    resultadoDiv.innerHTML = "Erro ao carregar calculadora. Tente recarregar a página.";
    return;
  }

  const material = materialSelect.value;
  const quantidade = parseFloat(quantidadeInput.value);

  if (quantidadeInput.value.trim() === "" || isNaN(quantidade) || quantidade <= 0) {
    resultadoDiv.innerHTML = "Por favor, insira uma quantidade válida (ex: 1.5).";
    quantidadeInput.focus();
    return;
  }

  // Cálculo de pontos igual ao backend
  let multiplicador = 1;
  switch (material) {
    case "papel":
    case "papelao":
      multiplicador = 2;
      break;
    case "plastico":
      multiplicador = 2;
      break;
    case "metal":
      multiplicador = 3;
      break;
    case "vidro":
      multiplicador = 2;
      break;
    case "organico":
      multiplicador = 1; // Valor sugerido para orgânico
      break;
    default:
      multiplicador = 1;
  }
  const pontos = Math.floor(quantidade * multiplicador);
  resultadoDiv.innerHTML = `🎯 Você ganharia <b>${pontos} ponto${pontos === 1 ? '' : 's'}</b> com esse material!`;
}
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const headerOffset = document.querySelector('header').offsetHeight || 0;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});