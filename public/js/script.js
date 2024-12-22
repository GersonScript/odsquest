(() => {
  const btnConfiguracao = document.querySelector(".btn-configuracao");
  const modal = document.getElementById("game-settings-modal");
  const closeBtn = document.getElementById("close-settings");
  const soloCheckbox = document.getElementById("solo");
  const robotCheckbox = document.getElementById("robot");
  const friendsCheckbox = document.getElementById("friends");
  const createRoomBtn = document.getElementById("create-room");
  const joinRoomBtn = document.getElementById("join-room");
  const codigoSala = document.getElementById("codigo-sala");
  const roomCodeInputContainer = document.getElementById("campo-codigo");
  const menuIcon = document.getElementById("menu-icon");
  const navLinks = document.getElementById("nav-links");
  const btnIniciar = document.getElementById("btn-iniciar");
  const btnRegras = document.getElementById("btn-regras");
  const criarContaLink = document.getElementById("criar-conta");
  const perfil = document.getElementById("perfil");
  const profileContainer = document.querySelector(".profile-container");
  const closeButton = document.getElementById("close-profile");
  const closeLogin = document.getElementById("close-login");
  const toggleLink = document.getElementById("toggle-link");
  const toggleText = document.getElementById("toggle-text");
  const signin = document.getElementById("signin");
  const signup = document.getElementById("signup");
  const codigoEmail = document.getElementById("codigoEmail");
  const entarConta = document.getElementById("entarConta");
  const submitBtn = document.getElementById("submitBtn");
  const titleLogin = document.getElementById("titleLogin");
  const containerLogin = document.querySelector(".container-login");

  criarContaLink.addEventListener("click", () => {
    containerLogin.style.display = "flex";
  });
  closeLogin.addEventListener("click", () => {
    containerLogin.style.display = "none";
  });

  btnIniciar.addEventListener("click", () => {
    alert("Opção em Desenvolvimento. Em Breve.");
  });

  btnRegras.addEventListener("click", () => {
    alert("Opção em Desenvolvimento. Em Breve.");
  });

  btnConfiguracao.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  perfil.addEventListener("click", () => {
    profileContainer.style.display = "flex";
  });

  closeButton.addEventListener("click", () => {
    containerLogin.style.display = "none";
    profileContainer.style.display = "none";
  });

  createRoomBtn.classList.add("hidden");
  joinRoomBtn.classList.add("hidden");
  codigoSala.classList.add("hidden");
  roomCodeInputContainer.classList.add("hidden");

  friendsCheckbox.addEventListener("change", () => {
    if (friendsCheckbox.checked) {
      soloCheckbox.checked = false;
      robotCheckbox.checked = false;
      soloCheckbox.disabled = true;
      robotCheckbox.disabled = true;
      createRoomBtn.classList.remove("hidden");
      joinRoomBtn.classList.remove("hidden");
    } else {
      soloCheckbox.disabled = false;
      robotCheckbox.disabled = false;
      createRoomBtn.classList.add("hidden");
      joinRoomBtn.classList.add("hidden");
      codigoSala.classList.add("hidden");
      roomCodeInputContainer.classList.add("hidden");
    }
  });

  soloCheckbox.addEventListener("change", () => {
    if (soloCheckbox.checked || robotCheckbox.checked) {
      friendsCheckbox.checked = false;
      friendsCheckbox.disabled = true;
      createRoomBtn.classList.add("hidden");
      joinRoomBtn.classList.add("hidden");
    } else {
      friendsCheckbox.disabled = false;
    }
  });

  robotCheckbox.addEventListener("change", () => {
    if (soloCheckbox.checked || robotCheckbox.checked) {
      friendsCheckbox.checked = false;
      friendsCheckbox.disabled = true;
      createRoomBtn.classList.add("hidden");
      joinRoomBtn.classList.add("hidden");
    } else {
      friendsCheckbox.disabled = false;
    }
  });

  createRoomBtn.addEventListener("click", () => {
    codigoSala.classList.remove("hidden");
    roomCodeInputContainer.classList.add("hidden");
  });

  joinRoomBtn.addEventListener("click", () => {
    roomCodeInputContainer.classList.remove("hidden");
    codigoSala.classList.add("hidden");
  });

  menuIcon.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  let isLogin = true;
  submitBtn.addEventListener("click", () => {
    titleLogin.textContent = `Enviamos um código para seu E-mail!`;
    codigoEmail.style.display = "block";
    entarConta.style.display = "block";
  });

  toggleLink.addEventListener("click", () => {
    isLogin = !isLogin;
    if (isLogin) {
      signin.style.display = "block";
      signup.style.display = "none";
      toggleText.textContent = "Ainda não tem uma conta?";
      toggleLink.textContent = "Criar conta";
    } else {
      signup.style.display = "block";
      signin.style.display = "none";
      toggleText.textContent = "Já tem uma conta?";
      toggleLink.textContent = "Fazer login";
    }
  });
  document
    .getElementById("criarConta")
    .addEventListener("click", function (event) {
      event.preventDefault();

      // Pegue os dados do formulário
      const usuario = document.getElementById("usuario").value;
      const email = document.getElementById("emailCriar").value;
      const idade = document.getElementById("idade").value;
      const estado = document.getElementById("estado").value;
      const nomeEscola = document.getElementById("nome_escola").value;
      const cidade = document.getElementById("cidade").value;
      const municipio = document.getElementById("municipio").value;
      const ano = document.getElementById("ano").value;

      // Envie os dados para o servidor
      fetch("/criar-conta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario,
          email,
          idade,
          estado,
          nomeEscola,
          cidade,
          municipio,
          ano,
        }),
      })
        .then((response) => response.json()) // Espera a resposta como JSON
        .then((data) => {
          console.log("Resposta do servidor:", data);
          alert(data.message); // Mostra a mensagem retornada pelo servidor
        })
        .catch((error) => {
          console.error("Erro ao criar conta:", error);
          alert("Erro ao criar conta.");
        });
    });
})();
