let mis_peliculas_iniciales = [
    {titulo: "Superlópez",   director: "Javier Ruiz Caldera", "miniatura": "files/superlopez.png"},
    {titulo: "Jurassic Park", director: "Steven Spielberg", "miniatura": "files/jurassicpark.png"},
    {titulo: "Interstellar",  director: "Christopher Nolan", "miniatura": "files/interstellar.png"}
];

localStorage.mis_peliculas = localStorage.mis_peliculas || JSON.stringify(mis_peliculas_iniciales);

const indexView = (peliculas) => {
    let i=0;
    let view = "";

    while(i < peliculas.length) {
      view += `
        <div class="movie">
           <div class="movie-img">
                <img data-my-id="${i}" src="${peliculas[i].miniatura}" onerror="this.src='files/placeholder.png'"/>
           </div>
           <div class="title">
               ${peliculas[i].titulo || "<em>Sin título</em>"}
           </div>
           <div class="actions">
               <button class="ver" data-my-id="${i}">ver</button>
               <button class="editar" data-my-id="${i}">editar</button>
               <button class="eliminar" data-my-id="${i}">borrar</button>
            </div>
        </div>\n`;
      i = i + 1;
    };

    view += `<div class="actions">
                <button class="añadir">Añadir</button>
                <button class="resetear">Reset</button>
            </div>`;

    return view;
};

const editView = (i, pelicula) => {
    return `<h2>Editar Película </h2>
        <div class="field">
        Título <br>
        <input  type="text" id="titulo" placeholder="Título" 
                value="${pelicula.titulo}">
        </div>
        <div class="field">
        Director <br>
        <input  type="text" id="director" placeholder="Director" 
                value="${pelicula.director}">
        </div>
        <div class="field">
        Miniatura <br>
        <input  type="text" id="miniatura" placeholder="URL de la miniatura" 
                value="${pelicula.miniatura}">
        </div>
        <div class="actions">
            <button class="actualizar" data-my-id="${i}">
                Actualizar
            </button>
            <button class="index">
                Volver
            </button>
       `;
}
const showView = (i,pelicula) => {
    return `
        Film : ${pelicula.titulo}
        Director: ${pelicula.director}      
     <div class="actions">
        <button class="index">Volver</button>
     </div>`;
}

const newView = () => {

    return `<h2>Crear Película</h2>
        <div class="field">
          Titulo<br>
          <input type="text" id="titulo" placeholder="Título">
          </div>
          <div class="field">
          Director<br>
          <input type="text" id="director" placeholder="Director">
          </div>
          <div class="field">
          Miniatura<br>
          <input type="text" id="miniatura" placeholder="URL de la miniatura">
          </div>
          
        <div class="actions">
            <button class="crear">crear</button>
            <button class="index">Volver</button>
           
        </div>`;
}

const indexContr = () => {
    let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
    document.getElementById('main').innerHTML = indexView(mis_peliculas);
};

const showContr = (i) => {

    let pelicula = JSON.parse(localStorage.mis_peliculas)[i];
    document.getElementById('main').innerHTML = showView(i,pelicula);

};

const newContr = (i) => {
    document.getElementById('main').innerHTML = newView();
    
};

const createContr = () => {
    let peliculas = JSON.parse(localStorage.mis_peliculas);
    let pelicula = {titulo: document.getElementById('titulo').value, director: document.getElementById('director').value, miniatura: document.getElementById('miniatura').value};
    peliculas.push(pelicula);
    localStorage.mis_peliculas = JSON.stringify(peliculas);
  
};

const editContr = (i) => {
    let pelicula = JSON.parse(localStorage.mis_peliculas)[i];
    document.getElementById('main').innerHTML = editView(i, pelicula);
};

const updateContr = (i) => {
    let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
    mis_peliculas[i].titulo    = document.getElementById('titulo').value;
    mis_peliculas[i].director  = document.getElementById('director').value;
    mis_peliculas[i].miniatura = document.getElementById('miniatura').value;
    localStorage.mis_peliculas = JSON.stringify(mis_peliculas);
    indexContr(); 
};

const deleteContr = (i) => {
let peliculas = JSON.parse(localStorage.mis_peliculas);
peliculas.splice(i,1);
localStorage.mis_peliculas = JSON.stringify(peliculas);
indexContr();

};

const resetContr = () => {
    localStorage.mis_peliculas = JSON.stringify(mis_peliculas_iniciales);
    let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
    document.getElementById('main').innerHTML = indexView(mis_peliculas);

};

const matchEvent = (ev, sel) => ev.target.matches(sel);
const myId = (ev) => Number(ev.target.dataset.myId);

document.addEventListener('click', ev => {
    if      (matchEvent(ev, '.index'))  indexContr  ();
    else if (matchEvent(ev, '.editar'))   editContr   (myId(ev));
    else if (matchEvent(ev, '.actualizar')) updateContr (myId(ev));
    else if(matchEvent(ev, '.ver')) showContr  (myId(ev));
    else if (matchEvent(ev, '.añadir')) newContr (myId(ev));
    else if(matchEvent(ev, '.eliminar')) deleteContr(myId(ev));
    else if(matchEvent(ev, '.resetear')) resetContr();
    else if(matchEvent(ev, '.crear')) createContr();
})
      
document.addEventListener('DOMContentLoaded', indexContr);