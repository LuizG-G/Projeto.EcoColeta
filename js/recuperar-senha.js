async function enviarCodigo() {
  const email = document.getElementById("email").value;
  if (email === "") {
    alert("Por favor, digite seu e-mail.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/users?email=${encodeURIComponent(email)}`);
    if (response.ok) {
      const users = await response.json();
      if (users && users.length > 0) {
        localStorage.setItem("usuarioRecuperar", users[0].id);
        alert("Código enviado para " + email + " (Simulação - use 123456 para testar).");
        document.getElementById("emailBox").style.display = "none";
        document.getElementById("codigoBox").style.display = "block";
      } else {
        alert("E-mail não encontrado.");
      }
    } else {
      alert("Erro ao buscar usuário.");
    }
  } catch (error) {
    alert("Erro ao conectar ao servidor.");
  }
}

function validarCodigo() {
  const codigo = document.getElementById("codigo").value;
  if (codigo === "123456") {
    localStorage.setItem("podeRedefinirSenha", "true");
    window.location.href = "nova-senha.html";
  } else {
    alert("Código inválido.");
  }
}