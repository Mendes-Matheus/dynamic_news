const arrayNoticias = new Array();

for (let i = 0; i < 10; i++) {
    arrayNoticias.push({
        id: i + 1, // incrementa o ID para cada notícia
        titulo: `Título da Notícia ${i + 1} `,
        resumo: `Resumo da Notícia ${i + 1}.`,
        conteudo: `Conteúdo da Notícia ${i + 1}. Aenean malesuada, sapien nec pellentesque iaculis, leo nibh maximus nibh, eget suscipit neque enim vel ante. Donec vitae libero ut diam aliquet sodales. Nulla facilisi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent nisl ligula, sodales ultricies venenatis vitae, fringilla sed risus. Vivamus fringilla diam pretium vestibulum pretium. Curabitur elementum pellentesque nisl, ut posuere urna aliquet non. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam erat volutpat. Pellentesque iaculis ante et scelerisque congue. Aenean varius congue lorem eu molestie. In convallis sagittis nibh, eget vestibulum eros euismod dignissim. In ullamcorper felis metus, sit amet tristique lacus vestibulum a. Etiam eu libero sapien. Suspendisse sollicitudin risus a placerat egestas.`,
        imagem: "https://i1.wp.com/www.esmaelmorais.com.br/wp-content/uploads/2023/06/lula-faz-l.jpg",
        descImagem: `Descrição da imagem da noticia ${i + 1}.`
    });
}


function carregarNoticias() {
    const gridNoticias = document.getElementById('noticias-grid');
    if (!gridNoticias) {
        console.error('Elemento "noticias-grid" não encontrado.');
        return;
    }

    arrayNoticias.forEach(noticia => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';

        const cardLink = document.createElement('a');
        cardLink.href = `/src/pages/noticia/noticia.html?id=${noticia.id}`;
        cardLink.className = 'text-decoration-none text-dark';
        cardLink.style.display = 'block';

        const card = document.createElement('div');
        card.className = 'card h-100';

        const cardImg = document.createElement('img');
        cardImg.src = noticia.imagem;
        cardImg.className = 'card-img-top';
        cardImg.alt = noticia.titulo;

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const cardTitle = document.createElement('h3');
        cardTitle.className = 'card-title';
        cardTitle.textContent = noticia.titulo;

        const cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.textContent = noticia.resumo;

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);

        card.appendChild(cardImg); // Adiciona a imagem ao card antes do corpo do card
        card.appendChild(cardBody);
        cardLink.appendChild(card);
        col.appendChild(cardLink);

        gridNoticias.appendChild(col);
    });

    console.log('Lista de notícias carregada com sucesso.');
}

function carregarNoticia() {
    const params = new URLSearchParams(window.location.search);
    const noticiaId = parseInt(params.get('id'));
    const noticia = arrayNoticias.find(n => n.id === noticiaId);

    if (noticia) {
        document.getElementById('noticia-titulo').textContent = noticia.titulo;
        document.getElementById('noticia-imagem').src = noticia.imagem;
        document.getElementById('imagem-descricao').textContent = noticia.descImagem;
        document.getElementById('noticia-conteudo').textContent = noticia.conteudo;
    } else {
        console.error('Notícia não encontrada.');
    }
}

function carregarHeaderFooter() {
    $('#header-placeholder').load('/src/header.html', function (response, status, xhr) {
        if (status == "error") {
            console.error("Erro ao carregar o header: " + xhr.status + " " + xhr.statusText);
        } else {
            sessionStorage.setItem('header', response);
            document.getElementById('header-placeholder').innerHTML = response;
            console.log('Header carregado via AJAX e salvo no sessionStorage.');
        }
    });
    
    let footerContent = sessionStorage.getItem('footer');
    if (footerContent) {
        document.getElementById('footer-placeholder').innerHTML = footerContent;
        console.log('Footer carregado do sessionStorage.');
    } else {
        $('#footer-placeholder').load('/src/footer.html', function(response, status, xhr) {
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


document.addEventListener("DOMContentLoaded", function() {
    carregarHeaderFooter();

    if (window.location.pathname.includes('noticia.html')) {
        carregarNoticia();
    } else if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        carregarNoticias();
    }

    console.log('Página carregada: ' + window.location.pathname);
});
