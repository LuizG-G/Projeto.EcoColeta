const form = document.getElementById("login-form");
const mensagemErro = document.getElementById("mensagem-erro");
const emailRegistrado = "teste@teste.com";
const senhaRegistrada = "123456";

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email, password: senha })
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("usuarioLogado", data.userId);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("usuarioEmail", email);
      // Buscar role do usuário
      fetch(`http://localhost:3000/users/${data.userId}`)
        .then(resp => resp.json())
        .then(user => {
          localStorage.setItem("usuarioRole", user.role || "USER");
          window.location.href = "tela-principal.html";
        });
    } else {
      mensagemErro.textContent = "Email ou senha incorretos.";
    }
  } catch (error) {
    mensagemErro.textContent = "Erro ao conectar ao servidor.";
  }
});