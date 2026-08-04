// CineMatch JS - Versão 2.0

// Altera a codificação do terminal para UTF-8
require('child_process').execSync('chcp 65001', {stdio: 'ignore'});
const prompt = require('prompt-sync')({ sigint: true });

console.log(`================================================================`);
console.log(`                        CineMatch JS                            `);
console.log(`================================================================`);
console.log(`\n   Bem vindo! ao Sistema de Recomendação de Filmes e Séries   `);

// RF01 – Criar o perfil da pessoa usuária via terminal
console.log(`\n                Vamos criar seu perfil!                     \n`);

const nome = prompt('Qual é o seu nome? ');
const idade = Number(prompt('Qual é a sua idade? '));
const generosInput = prompt(
  'Quais gêneros você mais gosta? (separe por vírgula, ex: Ação, Comédia, Terror): '
);

// Cria objeto usuario
const usuario = {
  nome: nome,
  idade: idade,
  generosFavoritos: generosInput.split(',').map((g) => g.trim()).filter((g) => g.length > 0),
};

// Exibe as informações do perfil
console.log(`\nPerfil criado com sucesso!`);
console.log(`\nOlá, ${usuario.nome}`);
console.log(`Você gosta de: ${usuario.generosFavoritos.join(', ')}`);
console.log(`Idade: ${usuario.idade} anos`);