const form = document.getElementById("cadastro-form");
const senhaInput = document.getElementById("senha"); 
const confirmarSenhaInput = document.getElementById("confirmar-senha"); 
const mensagemErro = document.getElementById("mensagem-erro");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  if (senhaInput.value !== confirmarSenhaInput.value) {
    mensagemErro.textContent = "As senhas não coincidem!";
    return;
  }

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = senhaInput.value;

  try {
    const response = await fetch("http://localhost:3000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: nome, email: email, password: senha })
    });
    if (response.ok) {
      mensagemErro.textContent = "";
      alert("Cadastro realizado com sucesso!");
      window.location.href = "login.html";
    } else if (response.status === 409) {
      mensagemErro.textContent = "E-mail já cadastrado.";
    } else {
      mensagemErro.textContent = "Erro ao cadastrar. Tente novamente.";
    }
  } catch (error) {
    mensagemErro.textContent = "Erro ao conectar ao servidor.";
  }
});