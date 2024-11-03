function showCadastro() {
    document.getElementById('cadastro').style.display = "block";
    document.getElementById('login').style.display = "none";
    document.getElementById('initialPrompt').style.display = "none"; // Esconde o prompt inicial
}

function showLogin() {
    document.getElementById('login').style.display = "block";
    document.getElementById('cadastro').style.display = "none";
    document.getElementById('initialPrompt').style.display = "none"; // Esconde o prompt inicial
}
