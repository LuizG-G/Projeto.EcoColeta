// Função da Calculadora de Reciclagem
function calcularValor() {
  const materialSelect = document.getElementById("material");
  const quantidadeInput = document.getElementById("quantidade");
  const resultadoDiv = document.getElementById("resultado");

  // Validação dos elementos
  if (!materialSelect || !quantidadeInput || !resultadoDiv) {
    console.error("Um ou mais elementos do formulário da calculadora não foram encontrados.");
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

  let valorPorKg;

  switch (material) {
    case "plastico": valorPorKg = 0.90; break;
    case "vidro": valorPorKg = 0.30; break;
    case "metal": valorPorKg = 1.50; break;
    case "papelao": valorPorKg = 0.40; break;
    case "cobre": valorPorKg = 20.00; break;
    case "biodegradavel": valorPorKg = 0.10; break;
    default: valorPorKg = 0;
  }

  const total = (quantidade * valorPorKg).toFixed(2);
  resultadoDiv.innerHTML = `💰 Valor estimado: R$ ${total.replace('.', ',')}`; // Formata para padrão brasileiro
}
// Smooth scroll para links da navegação interna da página (seções como #reciclagem)
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