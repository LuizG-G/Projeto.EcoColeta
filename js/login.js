const form = document.getElementById("login-form");
const mensagemErro = document.getElementById("mensagem-erro");

// Usuário "registrado" para testes
const emailRegistrado = "teste@teste.com";
const senhaRegistrada = "123456";

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  if (email === emailRegistrado && senha === senhaRegistrada) {
    localStorage.setItem("usuarioLogado", email); // simula autenticação
    window.location.href = "tela principal.html"; 
  } else {
    mensagemErro.textContent = "Email ou senha incorretos.";
  }
});