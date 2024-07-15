// const fofocas = [
//     { id: 1, titulo: "Título da Fofoca 1", resumo: "Resumo da Fofoca 1.", conteudo: "Conteúdo da Fofoca 1.", imagem: "https://www.strepro.com.br/storage/bulls/Js0XH5tYdugKfsxWGezGHgN8maANww43QWi7w2g5.jpg" },
//     { id: 2, titulo: "Título da Fofoca 2", resumo: "Resumo da Fofoca 2.", conteudo: "Conteúdo da Fofoca 2.", imagem: "https://www.strepro.com.br/storage/bulls/Js0XH5tYdugKfsxWGezGHgN8maANww43QWi7w2g5.jpg" },
//     { id: 3, titulo: "Título da Fofoca 3", resumo: "Resumo da Fofoca 3.", conteudo: "Conteúdo da Fofoca 3.", imagem: "https://www.strepro.com.br/storage/bulls/Js0XH5tYdugKfsxWGezGHgN8maANww43QWi7w2g5.jpg" },
//     { id: 4, titulo: "Título da Fofoca 4", resumo: "Resumo da Fofoca 4.", conteudo: "Conteúdo da Fofoca 4.", imagem: "https://www.strepro.com.br/storage/bulls/Js0XH5tYdugKfsxWGezGHgN8maANww43QWi7w2g5.jpg" },
//     { id: 5, titulo: "Título da Fofoca 5", resumo: "Resumo da Fofoca 5.", conteudo: "Conteúdo da Fofoca 5.", imagem: "https://www.strepro.com.br/storage/bulls/Js0XH5tYdugKfsxWGezGHgN8maANww43QWi7w2g5.jpg" },
//     { id: 6, titulo: "Título da Fofoca 6", resumo: "Resumo da Fofoca 6.", conteudo: "Conteúdo da Fofoca 5.", imagem: "https://www.strepro.com.br/storage/bulls/Js0XH5tYdugKfsxWGezGHgN8maANww43QWi7w2g5.jpg" },
//     { id: 7, titulo: "Título da Fofoca 7", resumo: "Resumo da Fofoca 7.", conteudo: "Conteúdo da Fofoca 7.", imagem: "https://www.strepro.com.br/storage/bulls/Js0XH5tYdugKfsxWGezGHgN8maANww43QWi7w2g5.jpg" },
// ];

const arrayFofocas = new Array();

for (let i = 0; i < 10; i++) {
    arrayFofocas.push({
        id: i + 1, // incrementa o ID para cada fofoca
        titulo: `Título da Fofoca ${i + 1}`,
        resumo: `Resumo da Fofoca ${i + 1}.`,
        conteudo: `Conteúdo da Fofoca ${i + 1}.`,
        imagem: "https://www.strepro.com.br/storage/bulls/Js0XH5tYdugKfsxWGezGHgN8maANww43QWi7w2g5.jpg"
    });
}

function carregaPolitica() {
    const gridFofocas = document.getElementById('fofocas-grid');
    if (!gridFofocas) {
        console.error('Elemento "fofocas-grid" não encontrado.');
        return;
    }

    arrayFofocas.forEach(fofoca => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';

        const cardLink = document.createElement('a');
        cardLink.href = `/src/pages/noticia/noticia.html?id=${fofoca.id}`;
        cardLink.className = 'text-decoration-none text-dark';
        cardLink.style.display = 'block';

        const card = document.createElement('div');
        card.className = 'card h-100';

        const cardImg = document.createElement('img');
        cardImg.src = fofoca.imagem;
        cardImg.className = 'card-img-top';
        cardImg.alt = fofoca.titulo;

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const cardTitle = document.createElement('h3');
        cardTitle.className = 'card-title';
        cardTitle.textContent = fofoca.titulo;

        const cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.textContent = fofoca.resumo;

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);

        card.appendChild(cardImg); // Adiciona a imagem ao card antes do corpo do card
        card.appendChild(cardBody);
        cardLink.appendChild(card);
        col.appendChild(cardLink);

        gridFofocas.appendChild(col);
    });

    console.log('Lista de fofocas carregada com sucesso.');
}

function carregarFofoca() {
    const params = new URLSearchParams(window.location.search);
    const fofocaId = parseInt(params.get('id'));
    const fofoca = arrayFofocas.find(f => f.id === fofocaId);

    if (fofoca) {
        document.getElementById('fofoca-titulo').textContent = fofoca.titulo;
        document.getElementById('fofoca-conteudo').textContent = fofoca.conteudo;
    } else {
        console.error('Fofoca não encontrada.');
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
        $('#footer-placeholder').load('/src/footer.html', function (response, status, xhr) {
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