const formSenha = document.getElementById("formSenha");
const novaSenhaInput = document.getElementById("novaSenha"); 
const confirmarNovaSenhaInput = document.getElementById("confirmarNovaSenha"); 
const mensagemErroNovaSenha = document.getElementById("mensagemErroNovaSenha"); 
formSenha.addEventListener("submit", async function (event) {
  event.preventDefault();

  if (localStorage.getItem("podeRedefinirSenha") !== "true") {
    mensagemErroNovaSenha.textContent = "Acesso não autorizado. Siga o fluxo de recuperação de senha.";
    return;
  }

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
    return;
  }

  const userId = localStorage.getItem("usuarioRecuperar");
  if (!userId) {
    mensagemErroNovaSenha.textContent = "Usuário não identificado. Siga o fluxo de recuperação de senha.";
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password: novaSenhaInput.value })
    });
    if (response.ok) {
      mensagemErroNovaSenha.textContent = "";
      alert("Senha alterada com sucesso!");
      // Limpa os dados de recuperação
      localStorage.removeItem("usuarioRecuperar");
      localStorage.removeItem("podeRedefinirSenha");
      window.location.href = "login.html";
    } else {
      mensagemErroNovaSenha.textContent = "Erro ao alterar senha.";
    }
  } catch (error) {
    mensagemErroNovaSenha.textContent = "Erro ao conectar ao servidor.";
  }
});