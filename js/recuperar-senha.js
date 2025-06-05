function enviarCodigo() {
  const email = document.getElementById("email").value;
  if (email === "") {
    alert("Por favor, digite seu e-mail.");
    return;
  }
 
  alert("Código enviado para " + email + " (Simulação - use 123456 para testar).");

  document.getElementById("emailBox").style.display = "none";
  document.getElementById("codigoBox").style.display = "block";
}

function validarCodigo() {
  const codigo = document.getElementById("codigo").value;
  if (codigo === "123456") { 
    window.location.href = "nova-senha.html";
  } else {
    alert("Código inválido.");
  }
}