# CineMatch JS

## Sobre o projeto

O CineMatch JS é um simulador interativo de recomendação de streaming que 
funciona diretamente no terminal. O sistema conversa com a pessoa usuária, 
coleta seu perfil (nome, idade, gêneros favoritos) e compara com um catálogo 
de filmes e séries para sugerir o que assistir.

O projeto mostra:

- Percentual de compatibilidade com cada conteúdo;
- Gêneros em comum entre usuário e conteúdo;
- Gêneros ainda não explorados;
- Conteúdo mais compatível;
- Recomendação personalizada;
- Menu interativo para navegar entre as funcionalidades.

## Objetivo

Praticar os principais conceitos do Módulo 01:

- lógica de programação;
- JavaScript;
- tipos de dados;
- condicionais;
- operadores;
- escopo;
- laços de repetição;
- funções;
- arrow functions;
- arrays;
- métodos de array;
- objetos;
- classes;
- herança;
- this;
- callbacks;
- closures;
- Promises;
- async/await;
- entrada de dados via terminal (prompt-sync);
- GitHub;
- Kanban.

## Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (versão 12 ou superior)
- [VS Code](https://code.visualstudio.com/) 
- Git (para clonar o repositório)

### Passo a passo

1. Clone o repositório.
2. Instale as dependências `npm install prompt-sync`.
3. Execute o Projeto `node cinematch.js`.
4. Responda as perguntas exibidas no terminal.
5. Use o menu para navegar entre perfil, catálogo, compatibilidade,
recomendação e sair.

## Estrutura do projeto

cinematch-js/
│
├── .gitignore          
├── cinematch.js         
├── package.json   
├── package-lock.json             
└── README.md   

## Como a internet funciona

A internet é uma rede global de computadores interconectados que se 
comunicam através de um conjunto padronizado de protocolos, sendo o principal 
o TCP/IP (Transmission Control Protocol/Internet Protocol).

Funcionamento básico:

1. Cliente e Servidor: Quando você acessa um site, seu computador (cliente) faz uma 
requisição para um servidor (computador que hospeda o site).

2. Endereços IP: Cada dispositivo na internet possui um endereço único (IP) para identificação.

3. DNS (Domain Name System): Traduz nomes de domínio (ex: google.com) para endereços IP.

4. Protocolos:

- HTTP/HTTPS: Protocolo para transferência de páginas web

- TCP: Garante que os dados cheguem completos e em ordem

- IP: Responsável pelo roteamento dos pacotes de dados

# No contexto do projeto:

O CineMatch JS simula uma requisição a um servidor através de uma Promise 
com setTimeout(), simulando o tempo de resposta de uma API real:


function buscarCatalogoSimulado(catalogo) {
  return new Promise((resolve) => {
    console.log('📡 Carregando catálogo do servidor...');
    setTimeout(() => {
      resolve(catalogo);
    }, 1000);
  });
}


## Sobre as variáveis: var, let e const

- const (Padrão): Escopo de bloco {}. Use para valores que não mudam de referência. 
Não permite redeclarar nem reatribuir.

- let (Se mudar): Escopo de bloco {}. Use quando o valor precisar ser reatribuído (ex: 
contadores, loops). Não permite redeclarar.

- var (Evitar): Escopo de função ou global. Permite redeclaração e sofre hoisting, 
o que gera bugs.

Regra de ouro: Use const por padrão. Troque por let apenas se for reatribuir. Nunca use var.

# No projeto CineMatch JS:


const catalogo = [ ... ]; // Array constante 

let opcao = 0; // Será reatribuída no loop

var nome = "João"; // Evitado


## Funcionalidades implementadas

Requisitos Funcionais (RF) 
	
- RF01	Criar perfil da pessoa usuária via terminal	
- RF02	Criar catálogo de conteúdos	
- RF03	Calcular compatibilidade com cada conteúdo	
- RF04	Classificar a compatibilidade (Alta/Média/Baixa)	
- RF05	Listar habilidades faltantes (gêneros não explorados)	
- RF06	Encontrar o conteúdo com maior compatibilidade	
- RF07	Gerar recomendação personalizada	
- RF08	Usar métodos de array (map, filter, reduce)
- RF09	Criar classe (Conteudo)	
- RF10	Usar herança (Serie extends Conteudo)	
- RF11	Demonstrar uso do this	
- RF12	Usar callback	
- RF13	Usar closure	
- RF14	Usar Promise e async/await	
- RF15	Criar menu interativo	

## Vídeo de demonstração

Acesso:

## Quadro Kanban

Acesso: https://trello.com/b/r0qLb2Yc

## Desenvolvido por

Luiz Paulo - https://github.com/Senaalvess

## Licença

Este projeto foi desenvolvido para fins educacionais como parte do curso de 
Programação Desenvolvimento Mobile React Native.