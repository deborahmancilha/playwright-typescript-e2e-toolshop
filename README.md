# Automação de testes E2E com Playwright · Toolshop

[![Playwright 1.64.1](https://img.shields.io/badge/Playwright-1.64.1-2EAD33)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js 22.20.0](https://img.shields.io/badge/Node.js-22.20.0-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Playwright Tests](https://github.com/deborahmancilha/playwright-typescript-e2e-toolshop/actions/workflows/playwright.yml/badge.svg?branch=main)](https://github.com/deborahmancilha/playwright-typescript-e2e-toolshop/actions/workflows/playwright.yml)

Projeto de automação de testes web de ponta a ponta (E2E) com **Playwright** e **TypeScript**, voltado à validação dos fluxos de compra da aplicação [Toolshop](https://practicesoftwaretesting.com/).

## Status do projeto

`██░░░░░░░░` **WIP - em desenvolvimento (primeira suíte em progresso)**

O ambiente está configurado com Playwright e TypeScript, incluindo projetos para Chromium, Firefox e WebKit. A primeira suíte oficial, `tests/busca-produto.spec.ts`, implementa buscas com três conjuntos de dados e verifica o nome do produto nos resultados e após abrir seus detalhes. Os demais cenários do MVP seguem em evolução.

## Aplicação em teste

- **Aplicação:** Toolshop
- **Endereço:** https://practicesoftwaretesting.com/

## Tecnologias

| Tecnologia | Finalidade |
| --- | --- |
| Playwright | Automação dos testes web E2E |
| TypeScript | Linguagem utilizada na implementação dos testes |

## Escopo do MVP

O MVP contempla cinco cenários:

| ID | Cenário | Resultado esperado | Status |
| --- | --- | --- | --- |
| CT01 | Buscar um produto | Exibir produtos correspondentes ao termo pesquisado. |  Em progresso     |
| CT02 | Filtrar produtos por categoria | Exibir produtos pertencentes à categoria selecionada. | Planejado |
| CT03 | Abrir detalhes de um produto | Exibir a página de detalhes do produto selecionado. | Planejado |
| CT04 | Adicionar produto ao carrinho | Incluir o produto selecionado no carrinho de compras. | Planejado |
| CT05 | Validar produto, quantidade e preço no carrinho | Exibir o produto adicionado, a quantidade selecionada e o preço correspondente. | Planejado |

## Arquitetura atual

Os testes usam o Playwright Test diretamente para abrir páginas, interagir com o navegador e verificar os resultados. A configuração compartilhada define quais navegadores executar e como gerar os relatórios.

```text
playwright-typescript-e2e-toolshop/
  .github/workflows/
    playwright.yml
  .vscode/
    settings.json
  tests/
    busca-produto.spec.ts
  .gitignore
  package.json
  package-lock.json
  playwright.config.ts
  tsconfig.json
  README.md
```

| Arquivo ou pasta | Responsabilidade |
| --- | --- |
| `tests/` | Contém os cenários automatizados em arquivos `.spec.ts`. A suíte de busca organiza os dados, localiza elementos por atributos `data-test` e verifica os resultados com `expect`. |
| `playwright.config.ts` | Define a URL base do Toolshop, a pasta de testes, os projetos Chromium, Firefox e WebKit, o relatório HTML e as opções de execução local e no CI. |
| `tsconfig.json` | Configura a checagem de tipos dos testes e da configuração do Playwright, incluindo os tipos do Node.js. |
| `package.json` e `package-lock.json` | Declaram as dependências e registram as versões instaladas para reproduzir o ambiente. |
| `.github/workflows/playwright.yml` | Instala dependências e navegadores, executa os testes e publica o relatório HTML no GitHub Actions. |
| `.vscode/settings.json` | Guarda configurações do editor para o projeto. |
| `.gitignore` | Define quais dependências, arquivos locais e resultados gerados ficam fora do versionamento. |

Ao executar um comando de teste, o Playwright lê `playwright.config.ts`, encontra os cenários em `tests/` e os executa nos navegadores selecionados. Depois, gera o relatório em `playwright-report/` e os artefatos em `test-results/`.

## Instalação e execução

### Pré-requisitos

- Node.js e npm disponíveis no terminal. 
- Git para clonar o repositório.
- Acesso à internet para instalar as dependências, baixar os navegadores e acessar as páginas testadas.

Para conferir as ferramentas instaladas:

```bash
node --version
npm --version
git --version
```

### Preparar o projeto

Clone o repositório e entre na pasta:

```bash
git clone https://github.com/deborahmancilha/playwright-typescript-e2e-toolshop.git
cd playwright-typescript-e2e-toolshop
```

Se você já tem o projeto na máquina, abra um terminal nessa pasta e continue com a instalação das dependências:

```bash
npm ci
npx playwright install
```

O `npm ci` instala as versões registradas no `package-lock.json`. O segundo comando baixa Chromium, Firefox e WebKit, usados em `playwright.config.ts`.

Em Linux, instale também as dependências de sistema dos navegadores:

```bash
npx playwright install --with-deps
```
### Ambiente de desenvolvimento

O desenvolvimento é realizado no **Visual Studio Code**, com a extensão **Playwright Test for VSCode**, da Microsoft, para executar e depurar os testes pelo editor.

O VS Code e a extensão são opcionais. Os comandos da seção de instalação e execução também podem ser usados diretamente no terminal.

### Executar os testes

Execute todos os testes nos três navegadores configurados:

```bash
npx playwright test
```

Para executar somente no Chromium:

```bash
npx playwright test --project=chromium
```

Para acompanhar a execução com a janela do navegador aberta:

```bash
npx playwright test --project=chromium --headed
```

Para executar especificamente a suíte de busca de produtos:

```bash
npx playwright test tests/busca-produto.spec.ts
```

Para executar essa suíte somente no Chromium:

```bash
npx playwright test tests/busca-produto.spec.ts --project=chromium
```

Atualmente, a suíte disponível é `tests/busca-produto.spec.ts`. Novos cenários serão adicionados conforme a evolução do MVP.

### UI Mode

Para abrir a interface interativa do Playwright, execute na pasta do projeto:

```bash
npx playwright test --ui
```

O **UI Mode** permite selecionar e executar testes pela interface, acompanhar os resultados e investigar falhas durante o desenvolvimento.

### Consultar os resultados

Após uma execução, abra o relatório HTML:

```bash
npx playwright show-report
```

O relatório fica em `playwright-report/` e os artefatos dos testes em `test-results/`. Essas pastas e `node_modules/` estão no `.gitignore`; o `package-lock.json` deve ser versionado para permitir reproduzir a instalação.
