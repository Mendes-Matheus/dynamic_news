const arrayPolitica = new Array();

for (let i = 0; i < 10; i++) {
    arrayPolitica.push({
        id: i + 1, // incrementa o ID para cada politica
        titulo: `Título da Noticia ${i + 1}`,
        resumo: `Resumo da Noticia ${i + 1}.`,
        conteudo: `Conteúdo da Noticia ${i + 1}.`,
        imagem: "https://i1.wp.com/www.esmaelmorais.com.br/wp-content/uploads/2023/06/lula-faz-l.jpg"
    });
}

function carregaPolitica() {
    const gridPolitica = document.getElementById('politica-grid');
    if (!gridPolitica) {
        console.error('Elemento "politica-grid" não encontrado.');
        return;
    }

    arrayPolitica.forEach(politica => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';

        const cardLink = document.createElement('a');
        cardLink.href = `/src/noticia/noticia.html?id=${politica.id}`;
        cardLink.className = 'text-decoration-none text-dark';
        cardLink.style.display = 'block';

        const card = document.createElement('div');
        card.className = 'card h-100';

        const cardImg = document.createElement('img');
        cardImg.src = politica.imagem;
        cardImg.className = 'card-img-top';
        cardImg.alt = politica.titulo;

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const cardTitle = document.createElement('h3');
        cardTitle.className = 'card-title';
        cardTitle.textContent = politica.titulo;

        const cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.textContent = politica.resumo;

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);

        card.appendChild(cardImg); // Adiciona a imagem ao card antes do corpo do card
        card.appendChild(cardBody);
        cardLink.appendChild(card);
        col.appendChild(cardLink);

        gridPolitica.appendChild(col);
    });

    console.log('Lista de politicas carregada com sucesso.');
}

function carregarPolitica() {
    const params = new URLSearchParams(window.location.search);
    const politicaId = parseInt(params.get('id'));
    const politica = arrayPolitica.find(f => f.id === politicaId);

    if (politica) {
        document.getElementById('politica-titulo').textContent = politica.titulo;
        document.getElementById('politica-conteudo').textContent = politica.conteudo;
    } else {
        console.error('politica não encontrada.');
    }
}


function carregarHeaderFooter() {
    let headerContent = sessionStorage.getItem('header');
    if (headerContent) {
        document.getElementById('header-placeholder').innerHTML = headerContent;
        console.log('Header carregado do sessionStorage.');
    } else {
        $('#header-placeholder').load('header.html', function (response, status, xhr) {
            if (status == "error") {
                console.error("Erro ao carregar o header: " + xhr.status + " " + xhr.statusText);
            } else {
                sessionStorage.setItem('header', response);
                document.getElementById('header-placeholder').innerHTML = response;
                console.log('Header carregado via AJAX e salvo no sessionStorage.');
            }
        });
    }

    let footerContent = sessionStorage.getItem('footer');
    if (footerContent) {
        document.getElementById('footer-placeholder').innerHTML = footerContent;
        console.log('Footer carregado do sessionStorage.');
    } else {
        $('#footer-placeholder').load('footer.html', function (response, status, xhr) {
            if (status == "error") {
                console.error("Erro ao carregar o footer: " + xhr.status + " " + xhr.statusText);
            } else {
                sessionStorage.setItem('footer', response);
                document.getElementById('footer-placeholder').innerHTML = response;
                console.log('Footer carregado via AJAX e salvo no sessionStorage.');
            }
        });
    }
}


// carregarHeaderFooter();

document.addEventListener("DOMContentLoaded", function () {
    carregarHeaderFooter();
    carregaPolitica();
    console.log('Página carregada: ' + window.location.pathname);
});