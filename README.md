# Projeto Next.js

Este é um projeto [Next.js](https://nextjs.org/) criado com [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Pré-requisitos

1. **Node.js**
2. **npm**

## Instalando Node.js e npm

1. Acesse o site oficial do Node.js: [Node.js Downloads](https://nodejs.org/).
2. Siga as instruções do instalador. Durante a instalação, você pode selecionar as opções padrão.
3. Você pode verificar se o Node.js está instalado rodando node -v no terminal. Para o npm, use npm -v.


```bash
node -v
npm -v
```

## Instalando uma IDE (se ainda não possuir uma dessas instalada)

1. **IntelliJ IDEA:**
   - Acesse a [página de downloads do IntelliJ IDEA](https://www.jetbrains.com/idea/download/).
   - Baixe a versão Community (gratuita) ou a versão Ultimate (paga, com mais recursos).
   - Siga as instruções de instalação para o seu sistema operacional.
   - Após a instalação, importe o projeto Spring Boot:
     1. Abra o IntelliJ IDEA.
     2. Selecione **Open** e navegue até o diretório do projeto Spring Boot.
     3. Selecione o diretório e clique em **OK** para abrir o projeto.

2. **Visual Studio Code (VSCode):**
   - Acesse a [página de downloads do VSCode](https://code.visualstudio.com/).
   - Baixe e instale a versão apropriada para o seu sistema operacional.
   - Após a instalação, você precisará instalar algumas extensões para trabalhar com Java e Spring:
     - **Java Extension Pack** (inclui suporte para Java e Maven/Gradle)
     - **Spring Boot Extension Pack**
   - Após instalar as extensões, abra o VSCode e importe o projeto Spring Boot:
     1. Abra o VSCode.
     2. Selecione **File > Open Folder** e navegue até o diretório do projeto Spring Boot.
     3. Selecione o diretório e clique em **Open**.


## 2. Clonando o Repositório
1. Navegue até o diretório onde você deseja clonar o projeto
2. Clone o repositório usando o comando git clone

```bash
git clone https://link_copiado_do_gitLab
```

## Iniciando

Para começar, siga os passos abaixo para instalar as dependências e iniciar o servidor de desenvolvimento:

```bash
npm install
npm run dev
```

## Código Atualizado

Para garantir que o processo de desenvolvimento esteja sempre atualizado, lembre-se de executar o seguinte comando na branch develop antes de criar uma branch nova:

```bash
git pull origin dev
```

## Executando a Aplicação

Após configurar e instalar as dependências, você pode iniciar a aplicação:

1. Execute o comando `npm run dev` para iniciar o servidor de desenvolvimento.
2. Abra [http://localhost:3000](http://localhost:3000) no seu navegador para visualizar a aplicação.



# Padrões de desenvolvimento

## Criação de Branches

- O nome da branch a ser criada deve seguir o modelo `tipo/us-00/tarefa`;
- exemplo: feat/us1/botao-login

```
Feature: branches para implementação de funcionalidades novas.
Fix: branches para correção de bugs.
Update: branches para atualizações.
```
Todos os MRs dessas branches devem sempre ser abertos para develop.

## Commits

- Mensagens de commit devem ser escritas no imperativo e na língua inglesa; 

## Merge Requests

O título do merge request deve seguir o mesmo formato acima. Os MRs precisam passar todos os jobs no pipeline e, após isso, podem ser mergeados por um AGES III. É obrigatório submeter o MR no formato definido pelo template.

## Branches

As branches para desenvolvimento devem ser feitas a partir da `develop`. Os nomes de branch devem seguir `<tipo>/<escopo>/<descrição>`, onde a descrição **deve ser breve** e com hífen no lugar dos espaços. Tipo e escopo são definidos conforme dito anteriormente.


## Saiba Mais

Para saber mais sobre o Next.js, confira os seguintes recursos:

- [Documentação do Next.js](https://nextjs.org/docs) - Aprenda sobre os recursos e a API do Next.js.
- [Aprenda Next.js](https://nextjs.org/learn) - Um tutorial interativo de Next.js.


