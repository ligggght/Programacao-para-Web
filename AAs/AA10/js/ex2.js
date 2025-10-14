var callback = function () {
  console.log("Estou na funcao de callback");
};

function executarEx2() {
  console.log("Iniciei");
  setTimeout(callback, 5000);
  console.log("Estou após o setTimeout");
}
