// CineMatch JS - Versão 8.0

// Altera a codificação do terminal para UTF-8, apenas no windows
if (process.platform === "win32") {
  try {
    require("child_process").execSync("chcp 65001", { stdio: "ignore" });
  } catch {}
}

const prompt = require("prompt-sync")({ sigint: true });

// RF09 - Criar uma classe
// RF10 - Usar herança
// RF11 - Demonstrar uso do this

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

class Serie extends Conteudo {
  constructor(titulo, generos, duracaoMinutos, temporadas) {
    super(titulo, "Série", generos, duracaoMinutos);
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
  new Conteudo("Paulo, Apóstolo de Cristo", "Filme", ["Drama", "Biografia"], 108),
];

//RF13 - Clousure
function criarContadorDeRecomendacoes() {
  let total = 0;
  return function () {
    total++;
    console.log(`Total de recomendações: ${total}\n`);
    return total;
  };
}

const contarRecomendacao = criarContadorDeRecomendacoes();

// RF12 - Callback
function finalizarOnboarding(nomeUsuario, callback) {
  console.log(`\nOnboarding finalizado com sucesso!`);
  callback(nomeUsuario);
}

function exibirMensagemFinal(nome) {
  console.log(`${nome}, aproveite sua maratona!\n`);
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

// RF03 - Calcula compatibilidade
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

  return { conteudo, percentual, comuns, faltantes };
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

// RF08 - Métodos de array
function calcularCompatibilidades(usuario, catalogo) {
  const resultados = catalogo.map((conteudo) =>
    calcularCompatibilidade(usuario, conteudo),
  );

  console.log("\nConteúdo compatível:\n");

  resultados.forEach((r, index) => {
    console.log(`${index + 1}. ${r.conteudo.exibirResumo()}`);
    if (r.conteudo instanceof Serie) {
      console.log(`   ${r.conteudo.exibirTemporadas()}`);
    }
    console.log(`${r.percentual}% - ${classificarCompatibilidade(r.percentual)}`);
    console.log(`Gêneros em comum: ${r.comuns.join(", ") || "Nenhum"}`);
    console.log(`Gêneros não explorados: ${r.faltantes.join(", ") || "Nenhum"}`);
    console.log("");
  });

  const altaAfinidade = resultados.filter((r) => r.percentual >= 80);
  if (altaAfinidade.length > 0) {
    console.log(`CONTEÚDOS COM ALTA AFINIDADE (${altaAfinidade.length}):`);
    altaAfinidade.forEach((r) => {
      console.log(`   - ${r.conteudo.titulo} (${r.percentual}%)`);
    });
  }

  const totalCompatibilidade = resultados.reduce((acc, r) => acc + r.percentual, 0);
  const media = Math.round(totalCompatibilidade / resultados.length);
  console.log(`\nMédia de compatibilidade: ${media}%`);

  return resultados;
}

// RF06 - Encontrar melhor conteúdo
function encontrarMelhorConteudo(usuario, catalogo) {
  const resultados = catalogo.map((conteudo) =>
    calcularCompatibilidade(usuario, conteudo),
  );
  const melhor = resultados.reduce((melhor, atual) =>
    atual.percentual > melhor.percentual ? atual : melhor,
  );

  return melhor;
}

// RF07 - Recomendação personalizada
function gerarRecomendacaoPersonalizada(usuario, resultado) {
  console.log(`\nRecomendação personalizada para ${usuario.nome}:\n`);

  if (resultado.faltantes.length > 0) {
    const proximoGenero = resultado.faltantes[0];
    const generoConhecido = resultado.comuns[0] || usuario.generosFavoritos[0];
    console.log(` Então você curte "${generoConhecido}"? Que tal arriscar um pouco de "${proximoGenero}"?`);
    console.log(` "${resultado.conteudo.titulo}" pode ser uma ótima escolha!\n`);
  } else {
    console.log(` Você já explorou todos os gêneros!\n`);
  }
}

function exibirRecomendacaoPrincipal(usuario, catalogo) {
  const melhor = encontrarMelhorConteudo(usuario, catalogo);

  console.log("\nRECOMENDAÇÃO PRINCIPAL:");
  console.log(`${melhor.conteudo.titulo} (${melhor.conteudo.tipo})`);
  console.log(`Compatibilidade: ${melhor.percentual}%`);
  console.log(`${classificarCompatibilidade(melhor.percentual)}`);

  gerarRecomendacaoPersonalizada(usuario, melhor);

  contarRecomendacao();
}

function exibirPerfil(usuario) {
  console.log("\nSEU PERFIL:");
  console.log(`   Nome: ${usuario.nome}`);
  console.log(`   Idade: ${usuario.idade} anos`);
  console.log(`   Gêneros favoritos: ${usuario.generosFavoritos.join(", ")}`);
}

function exibirCatalogo(catalogo) {
  console.log("\nCATÁLOGO COMPLETO:");
  catalogo.forEach((conteudo, index) => {
    console.log(`\n${index + 1}. ${conteudo.exibirResumo()}`);
    if (conteudo instanceof Serie) {
      console.log(`   ${conteudo.exibirTemporadas()}`);
    }
    console.log(`   Gêneros: ${conteudo.generos.join(", ")}`);
    console.log(`   Duração: ${conteudo.duracaoMinutos} min`);
  });
}

async function main() {
  console.log("\n" + "-".repeat(60));
  console.log(`                        CineMatch JS                          \n`);
  console.log(`  Bem vindo! ao Sistema de Recomendação de Filmes e Séries      `);
  console.log("-".repeat(60));

  // RF01 – Cria o perfil da pessoa usuária via terminal
  console.log(`\n                Vamos criar seu perfil!                     \n`);

  const nome = prompt("Qual é o seu nome? ");
  const idade = Number(prompt("Qual é a sua idade? "));
  const generosInput = prompt(
    "Quais gêneros você mais gosta? (separe por vírgula): ",
  );

  const usuario = {
    nome: nome,
    idade: idade,
    generosFavoritos: generosInput
      .split(",")
      .map((g) => g.trim())
      .filter((g) => g.length > 0),
  };

  console.log(`\nOlá, ${usuario.nome}!`);
  console.log(`Você gosta de: ${usuario.generosFavoritos.join(", ")}`);

  finalizarOnboarding(usuario.nome, exibirMensagemFinal);

  const catalogoCarregado = await iniciarSistema(catalogo);

  let opcao;

  do {
    console.log("\n" + "-".repeat(50));
    console.log("CineMatch JS - Menu Principal");
    console.log("-".repeat(50));
    console.log("1. Ver meu perfil");
    console.log("2. Ver catálogo completo");
    console.log("3. Calcular compatibilidade com todos os conteúdos");
    console.log("4. Ver o conteúdo mais recomendado");
    console.log("5. Sair");
    console.log("-".repeat(50));

    opcao = prompt("Escolha uma opção (1-5): ");

    switch (opcao) {
      case "1":
        exibirPerfil(usuario);
        break;

      case "2":
        exibirCatalogo(catalogoCarregado);
        break;

      case "3":
        calcularCompatibilidades(usuario, catalogoCarregado);
        break;

      case "4":
        exibirRecomendacaoPrincipal(usuario, catalogoCarregado);
        break;

      case "5":
        console.log("\nAté a próxima maratona!");
        console.log("\nCineMatch JS agradece sua visita!\n");
        break;

      default:
        console.log("\nOpção inválida! Tente novamente.");
    }

    if (opcao !== "5") {
      prompt("\nPressione Enter para continuar...");
    }
  } while (opcao !== "5");
}

main();