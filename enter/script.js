document.getElementById("preferences-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    const name = document.getElementById("name").value;
    const selectedGenres = Array.from(document.querySelectorAll('input[name="genre"]:checked'))
        .map(checkbox => checkbox.value);
    const action = document.querySelector('input[name="action"]:checked').value;

    // Armazenar as informações no localStorage
    localStorage.setItem("userName", name);
    localStorage.setItem("userGenres", JSON.stringify(selectedGenres));
    localStorage.setItem("userAction", action);

    // Exibir um alerta com as informações (opcional)
    alert(`Nome: ${name}\nGêneros: ${selectedGenres.join(', ')}\nAção: ${action}`);

    // Redirecionar para a página inicial
    window.location.href = "home.html"; // Altere para o arquivo da sua página inicial
});
