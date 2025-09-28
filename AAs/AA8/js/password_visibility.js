// function mostrarSenha() {
//     document.getElementById('login-password').type = 'text';
// }

// function ocultarSenha() {
//     document.getElementById('login-password').type = 'password';
// }


function toggleVisibilidadeSenha() {
  let campoSenha = document.getElementById("login-password");
  let olho = document.getElementById("olho");
  if (campoSenha.type === "password") {
    campoSenha.type = "text";
    olho.src =
      "https://cdn2.iconfinder.com/data/icons/general-pack-3/24/Non-Visible-256.png";
  } else {
    campoSenha.type = "password";
    olho.src =
      "https://cdn0.iconfinder.com/data/icons/ui-icons-pack/100/ui-icon-pack-14-512.png";
  }
}
