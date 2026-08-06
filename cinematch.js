// CineMatch JS - Versão 4.0

// Altera a codificação do terminal para UTF-8
require("child_process").execSync("chcp 65001", { stdio: "ignore" });
const prompt = require("prompt-sync")({ sigint: true });

// RF02 - Cria um catálogo de conteúdos
const catalogo = [
  // Séries
  {
    id: 1,
    titulo: "The Walking Dead",
    tipo: "Série",
    generos: ["Drama", "Terror", "Ficção Científica"],
    duracaoMinutos: 45,
    temporadas: 11,
  },
  {
    id: 2,
    titulo: "The Big Bang Theory",
    tipo: "Série",
    generos: ["Comédia", "Sitcom"],
    duracaoMinutos: 22,
    temporadas: 12,
  },
  {
    id: 3,
    titulo: "Stranger Things",
    tipo: "Série",
    generos: ["Animação", "Ficção Científica", "Mistério"],
    duracaoMinutos: 50,
    temporadas: 5,
  },
  {
    id: 4,
    titulo: "Arcane",
    tipo: "Série",
    generos: ["Animação", "Ação", "Ficção Científica"],
    duracaoMinutos: 40,
    temporadas: 2,
  },
  {
    id: 5,
    titulo: "Breaking Bad",
    tipo: "Série",
    generos: ["Crime", "Drama", "Suspense"],
    duracaoMinutos: 49,
    temporadas: 5,
  },

  // Filmes
  {
    id: 6,
    titulo: "O Poderoso Chefão",
    tipo: "Filme",
    generos: ["Crime", "Drama"],
    duracaoMinutos: 175,
  },
  {
    id: 7,
    titulo: "O iluminado",
    tipo: "Filme",
    generos: ["Drama", "Terror"],
    duracaoMinutos: 146,
  },
  {
    id: 8,
    titulo: "Matrix",
    tipo: "Filme",
    generos: ["Ficção Científica", "Ação", "Cyberpunk"],
    duracaoMinutos: 136,
  },
  {
    id: 9,
    titulo: "Clube da Luta",
    tipo: "Filme",
    generos: ["Suspense Psicológico", "Drama"],
    duracaoMinutos: 139,
  },
  {
    id: 10,
    titulo: "A viagem de Chihiro",
    tipo: "Filme",
    generos: ["Animação", "Aventura", "Família"],
    duracaoMinutos: 125,
  },
  {
    id: 11,
    titulo: "Cegos, Surdos e Loucos",
    tipo: "Filme",
    generos: ["Comédia"],
    duracaoMinutos: 103,
  },
  {
    id: 12,
    titulo: "Whiplash: Em Busca da Perfeição",
    tipo: "Filme",
    generos: ["Drama", "Música"],
    duracaoMinutos: 107,
  },
  {
    id: 13,
    titulo: "Harry Potter e as Relíquias da Morte: Parte 2",
    tipo: "Filme",
    generos: ["Fantasia", "Ação", "Aventura"],
    duracaoMinutos: 130,
  },
  {
    id: 14,
    titulo: "O Exorcista",
    tipo: "Filme",
    generos: ["Terror", "Sobrenatural"],
    duracaoMinutos: 122,
  },
  {
    id: 15,
    titulo: "Paulo, Apóstolo de Cristo",
    tipo: "Filme",
    generos: ["Drama", "Histórico", "Biografia"],
    duracaoMinutos: 108,
  },
];

// RF03 - Calcula compatibilidade com cada conteúdo
// RF05 – Gêneros não explorados
function calcularCompatibilidade(usuario, conteudo) {
  const generosUsuario = usuario.generosFavoritos.map((g) => g.toLowerCase());
  const generosConteudo = conteudo.generos;
  const comuns = generosConteudo.filter((g) =>
    generosUsuario.includes(g.toLowerCase()),
  );
  const faltantes = generosConteudo.filter(
    (g) => !generosUsuario.includes(g.toLowerCase()),
  );
  const percentual = Math.round((comuns.length / generosConteudo.length) * 100);

  return {
    conteudo,
    percentual,
    comuns,
    faltantes,
  };
}

// RF04 - Classificar compatibilidade
function classificarCompatibilidade(percentual) {
  if (percentual >= 80) {
    return "Alta afinidade";
  } else if (percentual >= 50) {
    return "Média afinidade";
  } else {
    return "Baixa afinidade";
  }
}

console.log(`================================================================`);
console.log(`                        CineMatch JS                            `);
console.log(`================================================================`);
console.log(`\n   Bem vindo! ao Sistema de Recomendação de Filmes e Séries   `);

// RF01 – Cria o perfil da pessoa usuária via terminal
console.log(`\n                Vamos criar seu perfil!                     \n`);

const nome = prompt("Qual é o seu nome? ");
const idade = Number(prompt("Qual é a sua idade? "));
const generosInput = prompt(
  "Quais gêneros você mais gosta? (separe por vírgula, ex: Ação, Comédia, Terror): ",
);

// Cria objeto usuario
const usuario = {
  nome: nome,
  idade: idade,
  generosFavoritos: generosInput
    .split(",")
    .map((g) => g.trim())
    .filter((g) => g.length > 0),
};

console.log(`\nOlá, ${usuario.nome}!`);
console.log(`Você gosta de: ${usuario.generosFavoritos.join(', ')}`);

console.log('\nConteúdo compatível:\n');

catalogo.forEach(conteudo => {
  const resultado = calcularCompatibilidade(usuario, conteudo);
  
  console.log(`${resultado.conteudo.titulo} (${resultado.conteudo.tipo})`);
  console.log(`Compatibilidade: ${resultado.percentual}%`);
  console.log(`${classificarCompatibilidade(resultado.percentual)}`);
  console.log(`Gêneros em comum: ${resultado.comuns.join(', ') || 'Nenhum'}`);
 
  if (resultado.faltantes.length > 0) {
    console.log(`Gêneros não explorados: ${resultado.faltantes.join(', ')}`);
  } else {
    console.log(`Você curte TODOS os gêneros!`);
  }
  console.log('');
});