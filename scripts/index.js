import {
  closedEyeSVG,
  coloredHeartSVG,
  coloredStarSVG,
  heartSVG,
  openEyeSVG,
  starSVG,
} from "../utils.js";


const listaFilmes = [];


document
  .querySelector("form")
  .addEventListener("submit", (event) => event.preventDefault());


document.getElementById("search-input").addEventListener("input", (e) => {
    filtrarFilmes(e.target.value);
    });


window.adicionarFilme = () => {
 let titulo = document.getElementById("tituloDoFilm").value;
 let duracao = document.getElementById("duracaoDoFilm").value;
 let nota = document.getElementById("notaDoFilm").value;

  if (!titulo || !duracao || !nota) {
      alert(`Erro! Adicionar corretamente o filme, por favor!`);

  } else if (listaFilmes.find(filme => titulo === filme.titulo)) {
          alert(`Erro! Filme já cadastrado na lista`);
          return;
      };

      const filmeNovo = {
          titulo,
          duracao,
          nota,
          favorito: false,
          assistido: false,
      }

      listaFilmes.push(filmeNovo);
      alert(`Filme ${filmeNovo.titulo} adicionado com sucesso!`);
      console.log(listaFilmes);
      
      limparCadastro();
      catalogoDeFilmes(listaFilmes);

}


window.toggleWatched = (titulo) => {
  const index = getIndexDoFilme(titulo);
  listaFilmes[index].assistido = !listaFilmes[index].assistido;
  catalogoDeFilmes(listaFilmes);
};

window.toggleFavorite = (titulo) => {
  const index = getIndexDoFilme(titulo);
  listaFilmes[index].favorito = !listaFilmes[index].favorito;
  catalogoDeFilmes(listaFilmes);
};

function getIndexDoFilme(titulo) {
  return listaFilmes.findIndex((filme) => filme.titulo === titulo);
}


function limparCadastro() {
  document.getElementById("tituloDoFilm").value = "";
  document.getElementById("duracaoDoFilm").value = "";
  document.getElementById("notaDoFilm").value = "";
}


function catalogoDeFilmes(listaFilmes) {
  document.getElementById("container-catalogo").innerHTML = listaFilmes.map(
      (filme) =>
  `
  <div class="card" id="${filme.titulo.toLowerCase()}">
  <div class="image-wrapper">
    <img
      src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/football%2Csoccer%2Csport%2Cevent-design-template-31189bebe42fe7f743327895731b60ae_screen.jpg?ts=1637009195"
    />
    <div class="movie-icons">
      <button id="watched-btn" class="icon-btn" 
      onclick="toggleWatched('${
        filme.titulo
      }')">
        ${filme.assistido ? openEyeSVG : closedEyeSVG}
      </button>
      <button id="favorite-btn" class="icon-btn" 
      onclick="toggleFavorite('${
        filme.titulo
      }')">
        ${filme.favorito ? coloredHeartSVG : heartSVG}
      </button>
    </div>
  </div>
  <div class="filme-info">
    <h4 class="filme-titulo">${filme.titulo}</h4>
    <div class="filme-detalhes">
      <span class="duracao">Duração: ${filme.duracao}</span>
      <div class="nota">
        ${getScore(filme.nota)}
      </div>
    </div>
  </div>
</div>
` 
).join("");
}   

function calcularTempo(listaFilmes) {
  const totalMinutos = listaFilmes.reduce((nota, filme) =>
    (nota += filme.assistido ? +filme.duracao : 0),
    0
  );

  const horas = Math.floor(totalMinutos / 60);
  const minutos = totalMinutos % 60;
  return { horas, minutos };
}

function getScore(nota) {
  let notaHTML = "";
  for (let i = 0; i < 5; i++) {
    if (i < nota) {
      notaHTML += coloredStarSVG;
      continue;
    }
    notaHTML += starSVG;
  }

  return notaHTML;
}


function filtrarFilmes(filter) {
  const filmeFiltrado = listaFilmes.filter((filme) => { 
  if (filter) {
      return filme.titulo.toLowerCase().includes(filme.toLowerCase());
    } else {
      return true;
    }
  });

  if (!filmeFiltrado.length)
    alert("Não foi encontrado nenhum filme com esse titulo.");

    catalogoDeFilmes(filmeFiltrado.length ? filmeFiltrado : listaFilmes);
}

 