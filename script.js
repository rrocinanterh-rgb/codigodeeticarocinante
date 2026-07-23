(() => {
  "use strict";

  const REGISTRATION_URL =
    "https://script.google.com/macros/s/AKfycbwefWtLTQs_ODAPhE0UJfZXmyaF3MwZ-Flh2VAF_TK_TUAlovivlTNOCwh0FOAyo28OYg/exec";
  const DOCUMENT_VERSION = "1.0";

  const identificationSection = document.querySelector("#identification-section");
  const identificationForm = document.querySelector("#identification-form");
  const employeeEmailInput = document.querySelector("#employee-email");
  const startButton = document.querySelector("#start-button");
  const startMessage = document.querySelector("#start-message");

  const documentSection = document.querySelector("#document-section");
  const confirmationSection = document.querySelector("#confirmation-section");
  const employeeSummary = document.querySelector("#employee-summary");
  const confirmationForm = document.querySelector("#confirmation-form");
  const checkbox = document.querySelector("#read-confirmation");
  const confirmButton = document.querySelector("#confirm-button");
  const formMessage = document.querySelector("#form-message");

  let readingStarted = false;
  let readingConfirmed = false;
  let visibleSeconds = 0;
  let sessionId = "";
  let employeeEmail = "";

  function createSessionId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }

    return (
      Date.now().toString(36) +
      "-" +
      Math.random().toString(36).slice(2) +
      "-" +
      Math.random().toString(36).slice(2)
    );
  }

  async function sendRegistration(eventName) {
    const data = new URLSearchParams({
      evento: eventName,
      sessao: sessionId,
      nome: "",
      identificacao: employeeEmail,
      tempo: String(visibleSeconds),
      versao: DOCUMENT_VERSION
    });

    const response = await fetch(REGISTRATION_URL, {
      method: "POST",
      body: data,
      redirect: "follow"
    });

    if (!response.ok) {
      throw new Error("O servidor não aceitou o registro.");
    }

    return response.text();
  }

  window.setTimeout(() => {
    window.alert(
      "ATENÇÃO!\n\n" +
      "Não feche, atualize ou saia desta página antes de concluir a leitura " +
      "integral do Código de Ética.\n\n" +
      "Primeiro, informe seu e-mail para iniciar."
    );
  }, 300);

  window.setInterval(() => {
    if (readingStarted && !readingConfirmed && !document.hidden) {
      visibleSeconds += 1;
    }
  }, 1000);

  identificationForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!identificationForm.reportValidity()) {
      return;
    }

    employeeEmail = employeeEmailInput.value.trim().toLowerCase();
    sessionId = createSessionId();

    startButton.disabled = true;
    startButton.textContent = "Registrando...";
    startMessage.classList.remove("erro");
    startMessage.textContent = "Aguarde enquanto registramos o início da leitura.";

    try {
      await sendRegistration("abertura");

      readingStarted = true;
      employeeEmailInput.disabled = true;
      identificationSection.hidden = true;
      documentSection.hidden = false;
      confirmationSection.hidden = false;
      employeeSummary.textContent =
        "Leitura iniciada com o e-mail " + employeeEmail + ".";

      documentSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (error) {
      sessionId = "";
      startButton.disabled = false;
      startButton.textContent = "Tentar novamente";
      startMessage.classList.add("erro");
      startMessage.textContent =
        "Não foi possível registrar o início. Verifique a internet e tente novamente.";
    }
  });

  checkbox.addEventListener("change", () => {
    confirmButton.disabled = !checkbox.checked;
  });

  confirmationForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!checkbox.checked || !readingStarted) {
      checkbox.focus();
      return;
    }

    confirmButton.disabled = true;
    confirmButton.textContent = "Registrando...";
    formMessage.classList.remove("erro");
    formMessage.textContent = "Aguarde enquanto registramos sua confirmação.";

    try {
      await sendRegistration("confirmacao");

      readingConfirmed = true;
      checkbox.disabled = true;
      confirmButton.textContent = "Leitura confirmada";
      formMessage.textContent =
        "Confirmação registrada. Agora você pode fechar esta página.";

      window.alert(
        "LEITURA CONFIRMADA!\n\n" +
        "Sua confirmação foi registrada! " +
        "Agora essa página pode ser fechada."
      );
    } catch (error) {
      confirmButton.disabled = false;
      confirmButton.textContent = "Tentar novamente";
      formMessage.classList.add("erro");
      formMessage.textContent =
        "Não foi possível registrar a confirmação. Verifique a internet e tente novamente.";
    }
  });

  window.addEventListener("beforeunload", (event) => {
    if (!readingConfirmed) {
      event.preventDefault();
      event.returnValue = "";
    }
  });
})();
