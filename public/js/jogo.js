import Perguntas, { quiz } from "./perguntas.js";

let dadoAtivo = true;
let jogadorAtual = "usuario";
let posicaoUsuario = 0;
let posicaoRobo = 0;
let posicaoUsuarioAnterior = 0;
let posicaoRoboAnterior = 0;
let tempoRestante;
let intervaloCronometro;
const marcadorUsuario = document.getElementById("marcadorUsuarioContainer");
const marcadorRobo = document.getElementById("marcadorRoboContainer");
const posicoes = document.querySelectorAll(".item");
const nivelPerguntas = sessionStorage.getItem("nivelPerguntas");
const perguntasQuiz = new Perguntas(quiz);

function rolarDado() {
  const numeroGerado = 6;
  // const numeroGerado = Math.floor(Math.random() * 6) + 1;
  const randomX = Math.floor(Math.random() * 4) * 360;
  const randomY = Math.floor(Math.random() * 4) * 360;
  const cubo = document.getElementById("cubo");
  cubo.style.transform = `rotateX(${randomX}deg) rotateY(${randomY}deg)`;

  setTimeout(() => {
    let finalX = randomX;
    let finalY = randomY;

    switch (numeroGerado) {
      case 1:
        break;
      case 2:
        finalY -= 90;
        break;
      case 3:
        finalY -= 180;
        break;
      case 4:
        finalY += 90;
        break;
      case 5:
        finalX -= 90;
        break;
      case 6:
        finalX += 90;
        break;
    }

    cubo.style.transition = "transform 2s ease-in-out";
    cubo.style.transform = `rotateX(${finalX}deg) rotateY(${finalY}deg)`;
  }, 1000);

  return numeroGerado;
}

function moverJogador(dadoResultado) {
  let marcador;

  if (jogadorAtual === "usuario") {
    marcador = marcadorUsuario;
    posicaoUsuarioAnterior = posicaoUsuario;
    posicaoUsuario = Math.min(
      posicaoUsuarioAnterior + dadoResultado,
      posicoes.length - 1
    );
  } else {
    marcador = marcadorRobo;
    posicaoRoboAnterior = posicaoRobo;
    posicaoRobo = Math.min(
      posicaoRoboAnterior + dadoResultado,
      posicoes.length - 1
    );
  }

  const elemento =
    posicoes[jogadorAtual === "usuario" ? posicaoUsuario : posicaoRobo];

  if (elemento) {
    setTimeout(() => {
      const estilo = window.getComputedStyle(elemento);
      marcador.style.gridColumn = estilo.gridColumn;
      marcador.style.gridRow = estilo.gridRow;
    }, 3000);
  }
}

function jogarDado() {
  if (dadoAtivo) {
    dadoAtivo = false; // Desabilita cliques enquanto a ação está em andamento
    const resultado = rolarDado(); // Rola o dado
    console.log(`Dado rolado: ${resultado}`);
    moverJogador(resultado); // Move o jogador conforme o resultado

    setTimeout(() => {
      exibirPergunta("usuario", resultado, marcadorUsuario);
      console.log("Nova posição do usuário: " + posicaoUsuario);
    }, 4000); // Após 4 segundos, exibe a pergunta

    // Reabilita o dado após a ação ser concluída (exibição da pergunta)
    setTimeout(() => {
      dadoAtivo = true; // Reabilita o clique no dado
    }, 4500); // Dado fica desabilitado por 4.5 segundos para impedir múltiplos cliques
  }
}

function atualizarPosicao(marcador, posicao) {
  const elemento = posicoes[posicao];
  if (elemento) {
    const estilo = window.getComputedStyle(elemento);
    marcador.style.gridColumn = estilo.gridColumn;
    marcador.style.gridRow = estilo.gridRow;
  }
}
function sortearMovimentoCoringa() {
  const movimentos = [-3, -2, -1, 1, 2, 3];
  const indiceAleatorio = Math.floor(Math.random() * movimentos.length);
  return movimentos[indiceAleatorio];
}
function exibirModalCoringa(jogador, valorDado, marcador) {
  const presente = document.getElementsByClassName("presente")[0];
  const escurecer = document.getElementById("escurecer");
  const caixa = document.querySelector(".caixa");
  const container = document.querySelector(".container");
  const mensagem = document.getElementById("mensagem");

  escurecer.style.display = "block";
  presente.style.display = "block";
  presente.style.display = "flex";

  // Remova o evento de clique manual para que possamos simular para o robô
  caixa.removeEventListener("click", () => {
    if (container.style.transform === "rotate(-15deg) translateY(-3rem)") {
      container.style.transform = "rotate(0deg) translateY(0)";
    } else {
      container.style.transform = "rotate(-15deg) translateY(-3rem)";
    }
  });

  // Sorteio do movimento do coringa
  const resultado = sortearMovimentoCoringa();

  // Função que será chamada para simular o clique do robô e atualizar a posição
  const clicarPresente = () => {
    mensagem.style.display = "block";

    // Exibe a mensagem conforme o sorteio
    if (resultado === -1) {
      mensagem.innerText = "Volte uma casa!";
    } else if (resultado === -2) {
      mensagem.innerText = "Volte duas casas!";
    } else if (resultado === -3) {
      mensagem.innerText = "Volte três casas!";
    } else if (resultado === 1) {
      mensagem.innerText = "Avance uma casa!";
    } else if (resultado === 2) {
      mensagem.innerText = "Avance duas casas!";
    } else {
      mensagem.innerText = "Avance três casas!";
    }

    // Oculta a mensagem e o presente após 1.5 segundos
    setTimeout(() => {
      mensagem.style.display = "none";
      escurecer.style.display = "none";
      presente.style.display = "none";
    }, 1500);

    setTimeout(() => {
      const novaPosicao = resultado + valorDado;
      atualizarPosicao(marcador, novaPosicao);

      if (jogador === "usuario") {
        posicaoUsuarioAnterior = valorDado;
        posicaoUsuario = novaPosicao;
        if (resultado > 0) {
          exibirPergunta(jogador, novaPosicao, marcadorUsuario);
        } else {
          trocarTurno();
        }
      } else {
        posicaoRoboAnterior = valorDado;
        posicaoRobo = novaPosicao;
        if (resultado > 0) {
          exibirPergunta(jogador, novaPosicao, marcadorRobo);
        } else {
          trocarTurno();
        }
      }
    }, 2000);
  };

  // Desabilita o clique no presente se for a vez do robô
  if (jogador === "robo") {
    presente.style.pointerEvents = "none"; // Desabilita o clique para o usuário
    setTimeout(() => {
      clicarPresente(); // Chama a função de clicar no presente automaticamente
    }, 1000); // Simula um atraso para o robô tomar a ação

    // Após o robô clicar, reabilita o clique para o usuário
    setTimeout(() => {
      presente.style.pointerEvents = "auto"; // Reabilita o clique para o usuário
    }, 1500); // Após a animação, o usuário pode clicar novamente
  } else {
    // Se for o usuário, mantém a interação manual
    presente.onclick = () => {
      clicarPresente(); // Chama a função de clicar no presente
    };
  }
}

function exibirPergunta(respondente, ods, marcador) {
  const perguntaSorteada = perguntasQuiz.sortearPergunta(ods);
  if (perguntaSorteada) {
    const perguntasContainer = document.getElementById("perguntas");
    perguntasContainer.style.display = "block";
    const alternativasLimpa = document.querySelectorAll(
      'input[name="alternativa"]'
    );
    alternativasLimpa.forEach((input) => (input.checked = false));
    document.getElementById("pergunta-texto").textContent =
      perguntaSorteada.texto;
    document.getElementById("labelA").textContent =
      perguntaSorteada.alternativas[0];
    document.getElementById("labelB").textContent =
      perguntaSorteada.alternativas[1];
    document.getElementById("labelC").textContent =
      perguntaSorteada.alternativas[2];
    document.getElementById("alternativaA").value =
      perguntaSorteada.alternativas[0];
    document.getElementById("alternativaB").value =
      perguntaSorteada.alternativas[1];
    document.getElementById("alternativaC").value =
      perguntaSorteada.alternativas[2];
    const alternativas = document.querySelectorAll('input[name="alternativa"]');
    const enviarRespostaBtn = document.getElementById("enviarResposta");

    if (respondente === "robo") {
      alternativas.forEach((input) => (input.disabled = true));
      enviarRespostaBtn.disabled = true;
      iniciarCronometro(
        "dificil",
        posicaoRoboAnterior,
        marcadorRobo,
        "robo",
        perguntaSorteada
      );
      setTimeout(() => {
        const indiceEscolhido = Math.floor(
          Math.random() * perguntaSorteada.alternativas.length
        );
        alternativas[indiceEscolhido].checked = true;
        setTimeout(() => {
          verificarResposta(perguntaSorteada, "robo");
          pararCronometro();
        }, 2000);
      }, 2000);
    } else {
      alternativas.forEach((input) => (input.disabled = false));
      enviarRespostaBtn.disabled = false;
      iniciarCronometro(
        "medio",
        posicaoUsuarioAnterior,
        marcadorUsuario,
        "usuario",
        perguntaSorteada
      );
      enviarRespostaBtn.onclick = () => {
        verificarResposta(perguntaSorteada, "usuario");
        pararCronometro();
      };
    }
  } else {
    exibirModalCoringa(respondente, ods, marcador);
  }
}

function verificarResposta(pergunta, respondente) {
  const alternativaSelecionada = document.querySelector(
    'input[name="alternativa"]:checked'
  );
  if (!alternativaSelecionada) {
    alert("Por favor, selecione uma resposta!");
    return;
  }
  const respostaUsuario = alternativaSelecionada.value;
  if (respostaUsuario === pergunta.respostaCorreta) {
    alert("Resposta correta!");
  } else {
    alert("Resposta incorreta.");
    if (respondente === "usuario") {
      posicaoUsuario = posicaoUsuarioAnterior;
      atualizarPosicao(marcadorUsuario, posicaoUsuario);
    } else {
      posicaoRobo = posicaoRoboAnterior;
      atualizarPosicao(marcadorRobo, posicaoRobo);
    }
  }
  document.getElementById("perguntas").style.display = "none";
  trocarTurno();
}

function trocarTurno() {
  jogadorAtual = jogadorAtual === "usuario" ? "robo" : "usuario";
  if (jogadorAtual === "robo") {
    dadoAtivo = false;
    const resultado = rolarDado();
    moverJogador(resultado);
    setTimeout(() => {
      exibirPergunta("robo", resultado, marcadorRobo);
    }, 4000);
  } else {
    dadoAtivo = true;
  }
}

function iniciarCronometro(
  nivel,
  posicaoAnterior,
  marcador,
  respondente,
  pergunta
) {
  const cronometro = document.getElementById("cronometro");
  if (nivel === "facil") {
    tempoRestante = 25000;
  } else if (nivel === "medio") {
    tempoRestante = 20000;
  } else if (nivel === "dificil") {
    tempoRestante = 15000;
  } else {
    console.error("Nível inválido: " + nivel);
    return;
  }
  atualizarCronometro(cronometro);
  intervaloCronometro = setInterval(() => {
    if (tempoRestante > 0) {
      tempoRestante -= 10;
      atualizarCronometro(cronometro);
    } else {
      clearInterval(intervaloCronometro);
      alert("Tempo esgotado! Você perdeu a vez.");
      atualizarPosicao(marcador, posicaoAnterior);
      document.getElementById("perguntas").style.display = "none";
      trocarTurno();
    }
  }, 10);
}

function atualizarCronometro(cronometro) {
  const minutos = Math.floor(tempoRestante / 60000);
  const segundos = Math.floor((tempoRestante % 60000) / 1000);
  const milissegundos = tempoRestante % 1000;
  cronometro.textContent = `${minutos.toString().padStart(2, "0")}:${segundos
    .toString()
    .padStart(2, "0")}:${milissegundos.toString().padStart(3, "0")}`;
  if (tempoRestante < 15000) {
    cronometro.style.color = "red";
  } else {
    cronometro.style.color = "black";
  }
}

function pararCronometro() {
  if (tempoRestante > 0) {
    clearInterval(intervaloCronometro);
  }
}

const dado = document.getElementById("container-dado");
dado.addEventListener("click", () => jogarDado());
