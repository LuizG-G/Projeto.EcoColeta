const formSenha = document.getElementById("formSenha");
const novaSenhaInput = document.getElementById("novaSenha"); 
const confirmarNovaSenhaInput = document.getElementById("confirmarNovaSenha"); 
const mensagemErroNovaSenha = document.getElementById("mensagemErroNovaSenha"); 
formSenha.addEventListener("submit", function (event) {
  event.preventDefault();

  if (novaSenhaInput.value === "") {
    mensagemErroNovaSenha.textContent = "Por favor, digite a nova senha.";
    return;
  }
  if (confirmarNovaSenhaInput.value === "") {
    mensagemErroNovaSenha.textContent = "Por favor, confirme a nova senha.";
    return;
  }

  if (novaSenhaInput.value !== confirmarNovaSenhaInput.value) {
    mensagemErroNovaSenha.textContent = "As senhas não coincidem!";
  } else {
    mensagemErroNovaSenha.textContent = "";
    alert("Senha alterada com sucesso! (Simulação)");
    window.location.href = "login.html"; 
  }
});