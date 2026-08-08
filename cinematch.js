// CineMatch JS - Versão 7.1

const { waitForDebugger } = require("inspector");

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

//RF13 - Clousure
function criarContadorDeRecomendacoes(){
  let total = 0;
  return function () {
    total++;
    console.log(`Total de recomendações: ${total}\n`)
  };
}

const contarRecomendacao = criarContadorDeRecomendacoes();

// RF12 - Callback
function finalizarOnboarding(nomeUsuario, callback) {
  console.log(`\nOnboarding finalizado com sucesso!`);
  callback(nomeUsuario);
}

function exibirMensagemFinal(nome) {
  console.log(`${nome}, aproveite sua maratona!`);
}

// RF14 - Promise e aync/await
function buscarCatalogoSimulado(catalogo) {
  return new Promise((resolve) => {
    console.log(`\nCarregando catálogo ...`);
    setTimeout(() => {
      console.log(`\nCatálogo carregado com sucesso!!!`);
      resolve(catalogo);
    }, 1500);
  });
}

async function iniciarSistema(catalogo) {
  const catalogoCarregado = await buscarCatalogoSimulado(catalogo);
  return catalogoCarregado;
}

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

// RF06 - Encontrar melhor conteúdo
function encontrarMelhorConteudo(usuario, catalogo) {
  const resultados = catalogo.map(conteudo =>
    calcularCompatibilidade(usuario, conteudo)
  );
  const melhor = resultados.reduce((melhor, atual) =>
    atual.percentual > melhor.percentual ? atual : melhor
  );

  return melhor;
}

// RF07 - Recomendação personalizada
function gerarRecomendacaoPersonaliza(usuario, melhorResultado, catalogo) {
  console.log(`\nRecomendação personalizada para ${usuario.nome}:\n`);

  const outros = catalogo.filter(c => c.titulo !== melhorResultado.conteudo.titulo);

  const sugerido = outros.find(c => 
    c.generos.some(g => !usuario.generosFavoritos.includes(g))
  );

  if(sugerido) {
   const generoNovo = sugerido.generos.find(g => 
    !usuario.generosFavoritos.includes(g));
    console.log(`Então você curte "${usuario.generosFavoritos[0]}"? Que tal arriscar um poco de "${generoNovo}"?`);
    console.log(`"${sugerido.titulo}" pode ser uma ótima escolha!\n`);
    } else {
      console.log(`Você já explorou todos os gêneros!\n`);
  }
}

async function main() {
  console.log(`\n                      CineMatch JS                          \n`);
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

  finalizarOnboarding(usuario.nome, exibirMensagemFinal);

  const catalogoCarregado = await iniciarSistema(catalogo);

  const melhor = encontrarMelhorConteudo(usuario, catalogoCarregado);

  console.log(`\nRecomendação Principal:\n`);
  console.log(`${melhor.conteudo.titulo} (${melhor.conteudo.tipo})`);
  console.log(`Compatibilidade: ${melhor.percentual}%`);
  console.log(`${classificarCompatibilidade(melhor.percentual)}`);

  gerarRecomendacaoPersonaliza(usuario, melhor, catalogoCarregado);

  contarRecomendacao(); 
''}

main();