let palavraSecreta = 'JAVASCRIPT';
let letrasChutadas = [];
let tracos = [];
let erros = 0;
let maxErros = 6;

// Pegando os elementos do HTML
let imagem = document.getElementById('imagem');
let textoPalavra = document.getElementById('palavra');
let textoMensagem = document.getElementById('mensagem');
let textoErros = document.getElementById('erros');
let botaoReiniciar = document.getElementById('reiniciar');
let botoesLetras = document.querySelectorAll('.letra');

// Função para iniciar o jogo
function iniciarJogo() {

    letrasChutadas = [];
    erros = 0;
    tracos = [];

    // Criando os traços da palavra
    for (let i = 0; i < palavraSecreta.length; i++) {
        tracos.push('_');
    }

    textoPalavra.textContent = tracos.join(' ');
    textoMensagem.textContent = '';
    textoMensagem.className = '';
    textoErros.textContent = 'Erros: 0 de ' + maxErros;

    imagem.src = 'img/1.png';

    // Ativando os botões novamente
    botoesLetras.forEach(function (botao) {
        botao.disabled = false;
    });
}

// Evento de clique nas letras
botoesLetras.forEach(function (botao) {

    botao.addEventListener('click', function () {

        botao.disabled = true;

        verificarLetra(botao.textContent);

    });

});

// Função para verificar se a letra está na palavra
function verificarLetra(letra) {

    letrasChutadas.push(letra);

    if (palavraSecreta.includes(letra)) {

        // Percorre a palavra procurando a letra
        for (let i = 0; i < palavraSecreta.length; i++) {

            if (palavraSecreta[i] === letra) {
                tracos[i] = letra;
            }

        }

        textoPalavra.textContent = tracos.join(' ');

    } else {

        // Se errar, aumenta a quantidade de erros
        erros++;

        imagem.src = 'img/' + (erros + 1) + '.png';

        textoErros.textContent = 'Erros: ' + erros + ' de ' + maxErros;

    }

    verificarFimDeJogo();

}

// Função para verificar vitória ou derrota
function verificarFimDeJogo() {

    // Verifica se o jogador venceu
    if (!tracos.includes('_')) {

        textoMensagem.textContent = 'Parabéns, você venceu!';
        textoMensagem.className = 'vitoria';

        desativarTeclado();

    }

    // Verifica se o jogador perdeu
    if (erros === maxErros) {

        textoMensagem.textContent = 'Fim de Jogo! A palavra era: ' + palavraSecreta;

        textoMensagem.className = 'derrota';

        textoPalavra.textContent = palavraSecreta.split('').join(' ');

        imagem.src = 'img/7.png';

        desativarTeclado();

    }

}

// Função para desativar o teclado
function desativarTeclado() {

    botoesLetras.forEach(function (botao) {

        botao.disabled = true;

    });

}

// Evento do botão reiniciar
botaoReiniciar.addEventListener('click', iniciarJogo);

// Inicia o jogo quando a página carregar
iniciarJogo();