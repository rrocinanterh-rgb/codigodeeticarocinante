(() => {
  "use strict";

  const form = document.querySelector("#confirmation-form");
  const checkbox = document.querySelector("#read-confirmation");
  const confirmButton = document.querySelector("#confirm-button");
  const formMessage = document.querySelector("#form-message");

  let readingConfirmed = false;

  // Este é o aviso padrão de JavaScript exibido ao abrir a página.
  window.setTimeout(() => {
    window.alert(
      "ATENÇÃO!\n\n" +
      "Não feche, atualize ou saia desta página antes de concluir a leitura " +
      "integral do Código de Ética.\n\n" +
      "Ao terminar, marque a confirmação de leitura no final da página."
    );
  }, 300);

  checkbox.addEventListener("change", () => {
    confirmButton.disabled = !checkbox.checked;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!checkbox.checked) {
      checkbox.focus();
      return;
    }

    readingConfirmed = true;
    checkbox.disabled = true;
    confirmButton.disabled = true;
    confirmButton.textContent = "Leitura confirmada";
    formMessage.textContent = "Confirmação concluída. Agora você pode fechar esta página.";

    window.alert(
      "LEITURA CONFIRMADA!\n\n" +
      "Você confirmou que leu e está ciente do Código de Ética da Rocinante. " +
      "Agora esta página pode ser fechada."
    );
  });

  // Solicita ao navegador um segundo aviso caso a pessoa tente sair antes de confirmar.
  window.addEventListener("beforeunload", (event) => {
    if (!readingConfirmed) {
      event.preventDefault();
      event.returnValue = "";
    }
  });
})();
