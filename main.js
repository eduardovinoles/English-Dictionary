const API_ENDPOINT = 'https://api.dictionaryapi.dev/api/v2/entries/en_US/'
let show
let search
let definition
let example
let errorWarning
let respuesta
let box
let box2
let def
let ex
let mp3
window.onload = function () {
    show = document.getElementById("show")
    search = document.getElementById("search")
    search.addEventListener("click", getDefinition)
    search.addEventListener("click", cleaner)
    definition = document.getElementById("definition")
    example = document.getElementById("example")
    errorWarning = document.getElementById("error-get-list")
    box = document.getElementById("box")
    box2 = document.getElementById("box2")
    mp3 = document.getElementById("mp3")

}


let getDefinition = function (event) {

    let word = document.getElementById("word").value
    // se crea el objeto XMLHttpRequest
    var xhr = new XMLHttpRequest();
    // se le indica qué hacer a medida que cambie su estado
    xhr.addEventListener('readystatechange', function (aEvt) {
        // console.log("state" + xhr.readyState )
        // console.log("status" + xhr.status)
        if (xhr.readyState === 4 && xhr.status == 200) {
            // se carga los items
            respuesta = JSON.parse(xhr.response)
            definitionP(respuesta)
            definitionP2(respuesta)
            srcMp3(respuesta)

        } else if (xhr.readyState === 4 && xhr.status != 200) {
            let errorWarning = document.getElementById("error-get-list")
            errorWarning.style.display = "block"

        }

    })
    // se abre la conexión
    xhr.open('GET', `${API_ENDPOINT}${word}`, true);
    // se envía la consulta
    xhr.send();
}

const definitionP = function (respuesta) {
    // se crea un elemento <p>
    def = respuesta[0].meanings[0].definitions[0].definition
    let firstLeter = def.charAt(0)
    def = def.slice(1)
    upCase = firstLeter.toUpperCase()
    box.style.display = "block"
    box.classList.add("show")

    setTimeout(function () {
        document.getElementById("headDef").innerHTML = "Definition: "
        document.getElementById("def").innerHTML = `${upCase}${def} `
        document.getElementById("image").src = "./img/open-book2.png"

    }, 3000);

    // console.log(respuesta[0].meanings[0].definitions[0])

}
const definitionP2 = function (respuesta) {
    ex = respuesta[0].meanings[0].definitions[0].example
    let firstLeterEx = ex.charAt(0)
    ex = ex.slice(1)
    upCaseEx = firstLeterEx.toUpperCase()
    box2.style.display = "block"
    box2.classList.add("show")
    setTimeout(function () {
        document.getElementById("headEx").innerHTML = "Example: "
        document.getElementById("ex").innerHTML = `${upCaseEx}${ex} `
        document.getElementById("image").src = "./img/open-book2.png"
        mp3.style.display = "block"
    }, 3000);


}


const srcMp3 = function (respuesta) {
    mp3.src = "http:" + respuesta[0].phonetics[0].audio
    // console.log(respuesta[0].phonetics[0].audio)
    // console.log(mp3)
}
const cleaner = function () {
    document.getElementById("headDef").innerHTML = ""
    document.getElementById("def").innerHTML = ""
    document.getElementById("headEx").innerHTML = ""
    document.getElementById("ex").innerHTML = ""
    errorWarning.style.display = "none"
    // console.log(errorWarning)
}


var Emblem = {
    init: function(el, str) {
      var element = document.querySelector(el);
      var text = str ? str : element.innerHTML;
      element.innerHTML = '';
      for (var i = 0; i < text.length; i++) {
        var letter = text[i];
        var span = document.createElement('span');
        var node = document.createTextNode(letter);
        var r = (360/text.length)*(i);
        var x = (Math.PI/text.length).toFixed(0) * (i);
        var y = (Math.PI/text.length).toFixed(0) * (i);
        span.appendChild(node);
        span.style.webkitTransform = 'rotateZ('+r+'deg) translate3d('+x+'px,'+y+'px,0)';
        span.style.transform = 'rotateZ('+r+'deg) translate3d('+x+'px,'+y+'px,0)';
        element.appendChild(span);
      }
    }
  };
  
  Emblem.init('.emblem');


