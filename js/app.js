//variables
const formulario = document.querySelector('#formulario');

const listaTweet = document.querySelector('#lista-tweets');

let tweets = [];
//event listeners
eventListeners();

function eventListeners(){

    formulario.addEventListener('submit',agregarTweet);

    //cuando el doc esta listo
    document.addEventListener('DOMContentLoaded', recuperarStorage);
}



//funciones

function agregarTweet(e){
const tweet = document.querySelector('#tweet').value; //adonde escribe, acordate el value
e.preventDefault();

 

if(tweet === ''){

    mostrarError('No puede ir vacio');
    return; // para que no siga de largo


}



const tweetObj = {
    id: Date.now(), // GUARDA EL TIEMPO DE EJECUCION PARA CREAR UNA ID IDENTIFICADORA
    tweet, // DIRECTAMENTE LA DECLARAS AHI, SE GUARDA EN EL ARREGLO DE OBJETOS tweet en un objeto si tenemos la constante tweet la toma automaticamente como tweet: tweet;
}
tweets = [...tweets, tweetObj];
sincronizarStorage();
crearHTML();

formulario.reset(); // RESETEO FORMULARIO ASI NO ME QUEDA ESCRITO


}
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');
    formulario.appendChild(mensajeError);
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);

}
function crearHTML(){
    limpiarHTML();
    if(tweets.length>0){   /// SI EL ARREGLO NO TIENE NADA NO SE EJECUTA
        tweets.forEach(tweet => {

             const btnEliminar = document.createElement('a');
             btnEliminar.classList.add('borrar-tweet');
             btnEliminar.textContent = 'X';
             // funcion eliminar
             btnEliminar.onclick = ()=>{

                eliminarTweet(tweet.id);

             }
             
            
            const li = document.createElement('li');

            li.textContent = tweet.tweet; // va al selector
            li.appendChild(btnEliminar);
            listaTweet.appendChild(li); // va a la lista-tweet del html
            return; //POR LAS DUDAS SI TUVIERA MAS CODIGO POR DEBAJO FRENA LA EJECUCION
        })

}
}
function limpiarHTML(){
    while(listaTweet.firstChild){
        listaTweet.removeChild(listaTweet.firstChild);
    }
}
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets)); // reemplaza totalmente lo que esta en el storage. no anexa como el spray operator [asd...asds2]
}

function recuperarStorage(){
    
    tweets = JSON.parse(localStorage.getItem('tweets')) || []; // AL FINAL SI NO HAY NADA ASIGNO COMO VALOR VACIO

    crearHTML(); // CREA EL HTML SI NO NO MUESTRA LOS TWEETS CARGADOS ANTERIORMENTE
}
function eliminarTweet(id){
   tweets = tweets.filter(tweet => tweet.id !== id);
   sincronizarStorage();
   crearHTML();

}

