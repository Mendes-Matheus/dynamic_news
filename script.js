const noticias = [
    { id: 1, titulo: "Título da Notícia 1", conteudo: "Conteúdo da Notícia 1." },
    { id: 2, titulo: "Título da Notícia 2", conteudo: "Conteúdo da Notícia 2." },
    { id: 3, titulo: "Título da Notícia 3", conteudo: "Conteúdo da Notícia 3." },
    { id: 4, titulo: "Título da Notícia 4", conteudo: "Conteúdo da Notícia 4." },
    { id: 5, titulo: "Título da Notícia 5", conteudo: "Conteúdo da Notícia 5." },
    { id: 6, titulo: "Título da Notícia 6", conteudo: "Conteúdo da Notícia 6." },
    { id: 7, titulo: "Título da Notícia 7", conteudo: "Conteúdo da Notícia 7." },
    { id: 8, titulo: "Título da Notícia 8", conteudo: "Conteúdo da Notícia 8." },
    { id: 9, titulo: "Título da Notícia 9", conteudo: "Conteúdo da Notícia 9." },
    { id: 10, titulo: "Título da Notícia 10", conteudo: "Conteúdo da Notícia 10." },
    { id: 11, titulo: "Título da Notícia 11", conteudo: "Conteúdo da Notícia 11." },
    { id: 12, titulo: "Título da Notícia 12", conteudo: "Conteúdo da Notícia 12." },
    { id: 13, titulo: "Título da Notícia 13", conteudo: "Conteúdo da Notícia 13." },
    { id: 14, titulo: "Título da Notícia 14", conteudo: "Conteúdo da Notícia 14." },
    { id: 15, titulo: "Título da Notícia 15", conteudo: "Conteúdo da Notícia 15." },
    { id: 16, titulo: "Título da Notícia 16", conteudo: "Conteúdo da Notícia 16." },
    { id: 17, titulo: "Título da Notícia 17", conteudo: "Conteúdo da Notícia 17." },
    { id: 18, titulo: "Título da Notícia 18", conteudo: "Conteúdo da Notícia 18." },
    { id: 19, titulo: "Título da Notícia 19", conteudo: "Conteúdo da Notícia 19." },
    { id: 20, titulo: "Título da Notícia 20", conteudo: "Conteúdo da Notícia 20." },
    // Adicione mais notícias conforme necessário
];

function carregarNoticias() {
    const gridNoticias = document.getElementById('noticias-grid');
    if (!gridNoticias) {
        console.error('Elemento "noticias-grid" não encontrado.');
        return;
    }

    noticias.forEach(noticia => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4'; // Define a coluna com largura md-4 e margem inferior mb-4

        const card = document.createElement('div');
        card.className = 'card h-100'; // Define o card com altura 100%

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const cardTitle = document.createElement('h2');
        cardTitle.className = 'card-title';
        cardTitle.textContent = noticia.titulo;

        const cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.textContent = noticia.conteudo;

        const cardLink = document.createElement('a');
        cardLink.href = `noticia.html?id=${noticia.id}`;
        cardLink.className = 'btn btn-primary';
        cardLink.textContent = 'Ler mais';

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(cardLink);

        card.appendChild(cardBody);
        col.appendChild(card);

        gridNoticias.appendChild(col);
    });

    console.log('Lista de notícias carregada com sucesso.');
}

function carregarNoticia() {
    const params = new URLSearchParams(window.location.search);
    const noticiaId = parseInt(params.get('id'));
    const noticia = noticias.find(n => n.id === noticiaId);

    if (noticia) {
        document.getElementById('noticia-titulo').textContent = noticia.titulo;
        document.getElementById('noticia-conteudo').textContent = noticia.conteudo;
    } else {
        console.error('Notícia não encontrada.');
    }
}

function carregarHeaderFooter() {
    let headerContent = localStorage.getItem('header');
    if (headerContent) {
        document.getElementById('header-placeholder').innerHTML = headerContent;
        console.log('Header carregado do localStorage.');
    } else {
        $('#header-placeholder').load('header.html', function(response, status, xhr) {
            if (status == "error") {
                console.error("Erro ao carregar o header: " + xhr.status + " " + xhr.statusText);
            } else {
                localStorage.setItem('header', response);
                console.log('Header carregado via AJAX e salvo no localStorage.');
            }
        });
    }

    let footerContent = localStorage.getItem('footer');
    if (footerContent) {
        document.getElementById('footer-placeholder').innerHTML = footerContent;
        console.log('Footer carregado do localStorage.');
    } else {
        $('#footer-placeholder').load('footer.html', function(response, status, xhr) {
            if (status == "error") {
                console.error("Erro ao carregar o footer: " + xhr.status + " " + xhr.statusText);
            } else {
                localStorage.setItem('footer', response);
                console.log('Footer carregado via AJAX e salvo no localStorage.');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    carregarHeaderFooter();

    if (window.location.pathname.includes('noticia.html')) {
        carregarNoticia();
    } else if (window.location.pathname.includes('index.html')) {
        carregarNoticias();
    }

    console.log('Página carregada: ' + window.location.pathname);
});
