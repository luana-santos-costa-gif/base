document.addEventListener("DOMContentLoaded", function() {
    // Inicializa a interface do usuário
    initializeUserInterface();

    // Função de logout
    document.getElementById("logout-button").addEventListener("click", function() {
        localStorage.clear(); // Limpa o localStorage
        window.location.href = "../../index.html"; // Redireciona para a página de login
    });

    // Adiciona evento para mostrar/ocultar o menu de perfil
    document.getElementById("profile-image").addEventListener("click", toggleProfileMenu);
});

// Função para inicializar a interface do usuário
function initializeUserInterface() {
    const userName = localStorage.getItem("userName");
    const userGenres = JSON.parse(localStorage.getItem("userGenres")) || [];
    const userAction = localStorage.getItem("userAction");

    // Exibe as informações na tela
    displayUserGreeting(userName);
    displayUserGenres(userGenres);
    displayUserAction(userAction);
    displayRecommendedBooks(userGenres);
    loadSavedBooks();
}

// Funções auxiliares
function displayUserGreeting(userName) {
    const userGreeting = document.getElementById("user-greeting");
    userGreeting.textContent = userName ? `Olá, ${userName}!` : "Olá, visitante!";
}

function displayUserGenres(genres) {
    const genreList = document.getElementById("genre-list");
    genreList.innerHTML = genres.length > 0 
        ? genres.map(genre => `<div>${genre.charAt(0).toUpperCase() + genre.slice(1)}</div>`).join('')
        : "<div>Nenhum gênero selecionado.</div>";
}

function displayUserAction(action) {
    const genreList = document.getElementById("genre-list");
    if (action) {
        const actionText = action === "ler" ? "Você prefere apenas ler." : "Você prefere escrever e ler.";
        genreList.innerHTML += `<div>${actionText}</div>`;
    }
}

// Função para exibir livros recomendados
function displayRecommendedBooks(genres) {
    const booksList = document.getElementById("books-list");
    if (genres.length === 0) {
        booksList.innerHTML = "<div>Selecione pelo menos um gênero para recomendações.</div>";
        return;
    }

    const recommendedBooks = getRecommendedBooks(genres);
    booksList.innerHTML = recommendedBooks.map(book => 
        `<div class="book-item">
            <span>${book.title} - ${book.genre}</span>
            <button onclick="saveBook('${book.title}')">Salvar</button>
        </div>`).join('');
}

// Função para obter livros recomendados com base nos gêneros
function getRecommendedBooks(genres) {
    const allBooks = [
        { title: "O Senhor dos Anéis", genre: "fantasia" },
        { title: "1984", genre: "ficcao-cientifica" },
        { title: "Dom Casmurro", genre: "romance" },
        { title: "A Menina que Roubava Livros", genre: "historias" },
        { title: "O Hobbit", genre: "fantasia" },
        { title: "O Código Da Vinci", genre: "suspense" },
        { title: "Cem Anos de Solidão", genre: "ficcao-cientifica" },
        { title: "Harry Potter", genre: "fantasia" },
        // Adicione mais livros conforme necessário
    ];

    return allBooks.filter(book => genres.includes(book.genre));
}

// Função para salvar um livro
function saveBook(title) {
    let savedBooks = JSON.parse(localStorage.getItem("savedBooks")) || [];
    if (!savedBooks.includes(title)) {
        savedBooks.push(title);
        localStorage.setItem("savedBooks", JSON.stringify(savedBooks));
        loadSavedBooks(); // Atualiza a lista de livros salvos
        alert(`${title} foi salvo com sucesso!`); // Feedback ao usuário
    } else {
        alert("Este livro já está salvo.");
    }
}

// Função para carregar livros salvos
function loadSavedBooks() {
    const savedBooks = JSON.parse(localStorage.getItem("savedBooks")) || [];
    const savedBooksList = document.getElementById("saved-books-list");
    savedBooksList.innerHTML = savedBooks.length > 0 
        ? savedBooks.map(book => `<div>${book}</div>`).join('')
        : "<div>Nenhum livro salvo.</div>";
}

// Função para mostrar/ocultar o menu de perfil
function toggleProfileMenu() {
    const profileMenu = document.getElementById("profile-menu");
    profileMenu.classList.toggle("show");
}

// Função para alterar a imagem de perfil (exemplo)
function changeProfileImage() {
    const newImageUrl = prompt("Insira a URL da nova imagem:");
    if (newImageUrl) {
        document.getElementById("profile-image").src = newImageUrl; // Atualiza a imagem
    }
}
