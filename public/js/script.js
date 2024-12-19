const btnIniciar = document.querySelector(".btn-iniciar");
const btnConfiguracao = document.querySelector(".btn-configuracao");
const modal = document.getElementById("game-settings-modal");
const closeBtn = document.getElementById("close-settings");
const soloCheckbox = document.getElementById("solo");
const robotCheckbox = document.getElementById("robot");
const friendsCheckbox = document.getElementById("friends");
const createRoomContainer = document.querySelector(".create-room");
const joinRoomContainer = document.querySelector(".join-room");
const roomCodeContainer = document.getElementById("codigo-sala");
const roomCodeInputContainer = document.getElementById("campo-codigo");
const createRoomBtn = document.getElementById("create-room-btn");
const joinRoomBtn = document.getElementById("join-room-btn");

// Lógica para abrir o modal de configurações
btnIniciar.addEventListener("click", () => {
  alert("Em breve");
});
// Lógica para abrir o modal de configurações
btnConfiguracao.addEventListener("click", () => {
  modal.classList.add("visible");
});
// Lógica para fechar o modal
closeBtn.addEventListener("click", () => {
  modal.classList.remove("visible");
});
createRoomBtn.classList.add("hidden");
joinRoomBtn.classList.add("hidden");
// Lógica para as opções de jogo
soloCheckbox.addEventListener("change", () => {
  if (soloCheckbox.checked || robotCheckbox.checked) {
    friendsCheckbox.checked = false;
    friendsCheckbox.disabled = true;

    // Oculta opções de amigos
    createRoomContainer.classList.add("hidden");
    joinRoomContainer.classList.add("hidden");
    roomCodeContainer.classList.add("hidden");
    roomCodeInputContainer.classList.add("hidden");
  } else {
    friendsCheckbox.disabled = false;
  }
});

robotCheckbox.addEventListener("change", () => {
  if (robotCheckbox.checked || soloCheckbox.checked) {
    friendsCheckbox.checked = false;
    friendsCheckbox.disabled = true;

    // Oculta opções de amigos
    createRoomContainer.classList.add("hidden");
    joinRoomContainer.classList.add("hidden");
    roomCodeContainer.classList.add("hidden");
    roomCodeInputContainer.classList.add("hidden");
  } else {
    friendsCheckbox.disabled = false;
  }
});

friendsCheckbox.addEventListener("change", () => {
  if (friendsCheckbox.checked) {
    soloCheckbox.checked = false;
    robotCheckbox.checked = false;
    soloCheckbox.disabled = true;
    robotCheckbox.disabled = true;

    // Exibe opções de amigos
    createRoomBtn.classList.remove("hidden");
    joinRoomBtn.classList.remove("hidden");
  } else {
    soloCheckbox.disabled = false;
    robotCheckbox.disabled = false;

    // Oculta opções de amigos
    createRoomContainer.classList.add("hidden");
    joinRoomContainer.classList.add("hidden");
    roomCodeContainer.classList.add("hidden");
    roomCodeInputContainer.classList.add("hidden");
  }
});

// Lógica para criar sala
createRoomBtn.addEventListener("click", () => {
  roomCodeContainer.classList.remove("hidden");
  roomCodeInputContainer.classList.add("hidden");
});

// Lógica para entrar na sala
joinRoomBtn.addEventListener("click", () => {
  roomCodeContainer.classList.add("hidden");
  roomCodeInputContainer.classList.remove("hidden");
});
