// CineMatch JS - Versão 6.0

// Altera a codificação do terminal para UTF-8
require("child_process").execSync("chcp 65001", { stdio: "ignore" });
const prompt = require("prompt-sync")({ sigint: true });

// RF09 - Classe simples e RF11 - Uso do this
class Conteudo {
  constructor(titulo, tipo, generos, duracaoMinutos) {
    this.titulo = titulo;
    this.tipo = tipo;
    this.generos = generos;
    this.duracaoMinutos = duracaoMinutos;
  }

  exibirResumo() {
    return `${this.titulo} (${this.tipo}) - ${this.duracaoMinutos} min`;
  }
}

//RF10 - Herança
class Serie extends Conteudo {
  constructor(titulo, generos, duracaoMinutos, temporadas) {
    super(titulo, 'Série', generos, duracaoMinutos);
    this.temporadas = temporadas;
  }

  exibirTemporadas() {
    return `${this.titulo} tem ${this.temporadas} temporada(s)`;
  }
}

// RF02 - Cria um catálogo de conteúdos
const catalogo = [
  new Serie("The Walking Dead", ["Drama", "Terror"], 45, 11),
  new Serie("The Big Bang Theory", ["Comédia"], 22, 12),
  new Serie("Stranger Things", ["Ficção Científica", "Mistério"], 50, 5),
  new Serie("Arcane", ["Animação", "Ficção Científica"], 40, 2),
  new Serie("Breaking Bad", ["Crime", "Drama"], 49, 5),
  new Conteudo("O Poderoso Chefão", "Filme", ["Crime", "Drama"], 175),
  new Conteudo("O Iluminado", "Filme", ["Drama", "Terror"], 146),
  new Conteudo("Matrix", "Filme", ["Ficção Científica", "Ação"], 136),
  new Conteudo("Clube da Luta", "Filme", ["Suspense Psicológico", "Drama"], 139),
  new Conteudo("A Viagem de Chihiro", "Filme", ["Animação", "Aventura"], 125),
  new Conteudo("Cegos, Surdos e Loucos", "Filme", ["Comédia"], 103),
  new Conteudo("Whiplash: Em Busca da Perfeição", "Filme", ["Drama", "Música"], 107),
  new Conteudo("Harry Potter e as Relíquias da Morte: Parte 2", "Filme", ["Fantasia", "Aventura"], 130),
  new Conteudo("O Exorcista", "Filme", ["Terror", "Sobrenatural"], 122),
  new Conteudo("Paulo, Apóstolo de Cristo", "Filme", ["Drama", "Biografia"], 108)
];

// RF03 - Calcula compatibilidade, RF04 - Classificar compatibilidade e RF05 – Gêneros não explorados
function calcularCompatibilidade(usuario, conteudo) {
  const generosUsuario = usuario.generosFavoritos.map((g) => g.toLowerCase());
  const generosConteudo = conteudo.generos;

  const comuns = generosConteudo.filter((g) =>
    generosUsuario.includes(g.toLowerCase()),
  );

  const faltantes = generosConteudo.filter((g) => 
    !generosUsuario.includes(g.toLowerCase()),
  );

  const percentual = Math.round((comuns.length / generosConteudo.length) * 100);

  return { conteudo, percentual, comuns, faltantes };
}

function classificarCompatibilidade(percentual) {
  if (percentual >= 80) {
    return "Alta afinidade";
  } else if (percentual >= 50) {
    return "Média afinidade";
  } else {
    return "Baixa afinidade";
  }
}

// RF08 - Métodos de array
function calcularCompatibilidades(usuario, catalogo) {
  const resultados = catalogo.map((conteudo) =>
    calcularCompatibilidade(usuario, conteudo)
  );

  console.log(`\nConteúdo compatível`);

  resultados.forEach((r, index) => {
    console.log(`${index + 1}. ${r.conteudo.exibirResumo()}`);
    if (r.conteudo instanceof Serie) {
      console.log(`    ${r.conteudo.exibirTemporadas()}`);
    }
    console.log(`${r.percentual}% - ${classificarCompatibilidade(r.percentual)}`);
    console.log(`Gêneros em comum: ${r.comuns.join(", ") || "Nenhum"}`);
    console.log(`Não explorados: ${r.faltantes.join(", ") || "Nenhum"}`);
    console.log("");
  });

  const altaAfinidade = resultados.filter(r => r.percentual >= 80);
  if (altaAfinidade.length > 0) {
    console.log(`Conteúdos com Alta Afinidade:`);
    altaAfinidade.forEach(r => {
      console.log(`   - ${r.conteudo.titulo} (${r.percentual}%)`);
    });
  }
  return resultados;
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
  "Quais gêneros você mais gosta? (separe por vírgula): ",
);

// Cria objeto usuario
const usuario = {
  nome: nome,
  idade: idade,
  generosFavoritos: generosInput
      .split(",")
      .map((g) => g.trim())
      .filter((g) => g.length > 0)
};

console.log(`\nOlá, ${usuario.nome}!`);
console.log(`Você gosta de: ${usuario.generosFavoritos.join(", ")}`);

calcularCompatibilidades(usuario, catalogo);