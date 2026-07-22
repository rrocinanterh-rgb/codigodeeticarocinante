# Página do Código de Ética da Rocinante

Este pacote está pronto para publicação no GitHub Pages. O PDF original já foi
incluído com um nome compatível com endereços da internet.

## Arquivos necessários

- `index.html`: estrutura da página;
- `styles.css`: aparência e adaptação para celular;
- `script.js`: alerta ao abrir, aviso antes de sair e confirmação;
- `logo-rocinante.png`: marca extraída do próprio documento;
- `codigo-de-etica-rocinante.pdf`: documento exibido na página.

Envie todos os arquivos para a raiz do mesmo repositório. Não coloque o PDF em
outra pasta sem também alterar os caminhos presentes no `index.html`.

## Publicação no GitHub Pages

1. Entre no GitHub e crie um repositório público, por exemplo `codigo-de-etica`.
2. Dentro do repositório, use **Add file > Upload files**.
3. Envie todos os arquivos deste pacote e confirme em **Commit changes**.
4. Abra **Settings > Pages**.
5. Em **Build and deployment**, escolha **Deploy from a branch**.
6. Selecione a branch `main`, a pasta `/ (root)` e clique em **Save**.
7. Aguarde a publicação e copie o endereço mostrado pelo GitHub.

O endereço normalmente terá este formato:

```text
https://SEU-USUARIO.github.io/codigo-de-etica/
```

## O que esta versão faz

- mostra o PDF dentro da página;
- oferece botões para abrir ou baixar o documento;
- funciona em computador e celular;
- mostra um alerta padrão de JavaScript assim que a página é aberta;
- mantém também um aviso visível em azul-marinho e branco;
- mostra um aviso do navegador ao tentar sair antes da confirmação;
- libera o encerramento depois que o colaborador marca e confirma a declaração.

## Limitação importante

Esta versão não envia nem salva a confirmação em uma planilha. A confirmação
existe apenas naquela sessão do navegador. Para obter uma lista com nome, data e
horário de cada colaborador, será necessário conectar a página a um serviço de
servidor ou formulário.

Os navegadores também podem decidir quando mostrar o aviso de saída. Em geral,
o colaborador precisa ter interagido com a página para o aviso aparecer, e em
alguns celulares ele pode não ser exibido.

## Atualização do PDF

Para trocar o documento no futuro, substitua o arquivo mantendo exatamente o
nome `codigo-de-etica-rocinante.pdf`. Depois, confirme a alteração no GitHub.
