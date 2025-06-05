const form = document.getElementById("cadastro-form");
const senhaInput = document.getElementById("senha"); 
const confirmarSenhaInput = document.getElementById("confirmar-senha"); 
const mensagemErro = document.getElementById("mensagem-erro");

form.addEventListener("submit", function (event) {
  if (senhaInput.value !== confirmarSenhaInput.value) {
    event.preventDefault();
    mensagemErro.textContent = "As senhas não coincidem!";
  } else {
    mensagemErro.textContent = "";
    event.preventDefault(); 
    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html";
  }
});