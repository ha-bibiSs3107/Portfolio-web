import textosIngles from "./textos-ingles.js";
import textosPortugues from "./textos-portugues.js";

const botaoCurriculo = document.querySelector('.botao-curriculo');
const botaoLinguagem = document.querySelector('.botao-linguagem');
const containerProjetos = document.querySelector('.container-card-projetos');
const botaoInicio = document.querySelector('.botao-inicio');

//ELEMENTOS QUE VÃO MUDAR DE IDIOMA
const tituloBanner = document.getElementById('titulo-banner');
const descricaoBanner = document.getElementById('descricao-banner');
const botaoProjetoBanner = document.getElementById('botao-projeto-banner');
const botaoTecnologiasBanner = document.getElementById('botao-tecnologias-banner');
const tituloTecnologias = document.getElementById('titulo-tecnologias');
const tituloBaterPapo = document.getElementById('titulo-bater-papo');
const descricaoBaterPapo = document.getElementById('descricao-bater-papo');
const botaoBaterPapo = document.getElementById('botao-bater-papo');
const tituloProjetos = document.getElementById('titulo-projetos');
const subtituloProjetos = document.getElementById('subtitulo-projetos');
const tituloFooter = document.getElementById('titulo-footer');
const subtituloFooter = document.getElementById('subtitulo-footer');

// Variável para controlar o idioma atual
let idiomaAtual = 'portugues';

function trocarLinguagem(linguagem) {
    idiomaAtual = linguagem;
    const dados = linguagem == 'portugues' ? textosPortugues : textosIngles;

    // Atualizar apenas o texto do botão, mantendo o ícone
    const spanTexto = botaoCurriculo.querySelector('span:last-child');
    if (spanTexto) {
        spanTexto.textContent = dados.header.botoes.curriculo;
    }

    tituloBanner.textContent = dados.banner.titlo;
    descricaoBanner.textContent = dados.banner.descricao;
    botaoProjetoBanner.textContent = dados.banner.botoes.projetos;
    botaoTecnologiasBanner.textContent = dados.banner.botoes.tecnologias;
    tituloTecnologias.textContent = dados.tecnologias.titulo;
    tituloBaterPapo.textContent = dados.contato.titulo;
    descricaoBaterPapo.textContent = dados.contato.descricao;
    botaoBaterPapo.textContent = dados.contato.botao;
    tituloProjetos.textContent = dados.projetos.titulo;
    subtituloProjetos.textContent = dados.projetos.subtitulo;
    tituloFooter.textContent = dados.footer.desenvolvedor;
    subtituloFooter.textContent = dados.footer.agradecimento;

    containerProjetos.innerHTML = '';

    dados.projetos.lista.forEach((projeto) => {
        const div = document.createElement('div');
        div.classList.add('card-projeto');
        div.innerHTML = `
            <h6 class="title is-5">${projeto.nome}</h6>
            <p>Tecnologias: <span class="span-linguagens">${projeto.tecnologias}</span></p>
            <p class="mt-5 mb-5">${projeto.descricao}</p>
            <div class="is-flex">
                <button class="button mr-4">${projeto.botoes.repositorio}</button>
                <button class="button">${projeto.botoes.aplicacao}</button>
            </div>
        `;

        containerProjetos.appendChild(div);
    });
}

// Event listener para download do currículo
botaoCurriculo.addEventListener('click', function() {
    const link = document.createElement('a');
    
    // Define o arquivo baseado no idioma atual
    if (idiomaAtual === 'portugues') {
        link.href = './assets/BEATRIZ_SANTOS_PT-BR.pdf';
        link.download = 'BEATRIZ_SANTOS_PT-BR.pdf';
    } else {
        link.href = './assets/BEATRIZ_SANTOS_EN.pdf';
        link.download = 'BEATRIZ_SANTOS_EN.pdf';
    }
    
    link.click();
});

// Event listener para voltar ao topo da página
if (botaoInicio) {
    botaoInicio.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Event listener para trocar idioma
botaoLinguagem.addEventListener('click', function() {
    const imgBandeira = botaoLinguagem.querySelector('img');
    
    if (!imgBandeira) {
        console.error('Imagem da bandeira não encontrada');
        return;
    }
    
    const srcAtual = imgBandeira.getAttribute('src');
    
    // Se está em português (bandeira do Brasil), muda para inglês
    if (srcAtual.includes('brasil')) {
        imgBandeira.setAttribute('src', './imagens/bandeira eua.png');
        trocarLinguagem('ingles');
    } else {
        // Se está em inglês (bandeira dos EUA), muda para português
        imgBandeira.setAttribute('src', './imagens/brasil.webp');
        trocarLinguagem('portugues');
    }
});

// Iniciar em português
trocarLinguagem('portugues');