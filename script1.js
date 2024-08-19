let searchFunction = null;

let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
	if(pagina < 1000){
		pagina += 1;
		buscarGif();
	}
});

btnAnterior.addEventListener('click', () => {
	if(pagina > 1){
		pagina -= 1;
		buscarGif();
	}
});

// Constante valor opción Gif, opción Joke
const gifi = document.getElementById("idGif");
const joke = document.getElementById("idJoke");
const form = document.getElementById('form');
const valorInput = document.getElementById('valorInput');

// Evento que se ejecuta cuando se selecciona una opción
form.addEventListener('change', function() {
    if (joke.checked) {
        searchFunction = buscarJoke;
        valorInput.placeholder = "Buscar Joke";
    } else if (gifi.checked) {
        searchFunction = buscarGif;
        valorInput.placeholder = "Buscar GIF";
    }
});

// Función para manejar la tecla Enter
function enter(event) {
    if (event.key === "Enter") {
        buscar();
    }
}

// Función para buscar Jokes
 

    const buscarJoke = async ()=> {
        const query = valorInput.value;
        console.log("Buscando Joke: " + query);
        // Aquí iría la lógica para buscar Jokes

        try {
            const respuesta =  await fetch(`https://api.humorapi.com/jokes/search?api-key=dac36f2fb3e14a548ca4ff7575ea33fc&keywords=${query}`);
    
            if (respuesta.status === 200) {
                
                console.log(respuesta);
                const chiste = await respuesta.json();
    
                console.log(chiste);
                
            }else if (respuesta.status === 401) {
                window.alert("Hubo un error 401, petición no autorizada");
                console.log("Hubo un error 401, petición no autorizada");
            }else if (respuesta.status === 404) {
                window.alert("Hubo un error 404");
                console.log("Hubo un error 404");
            }else if (respuesta.status === 429) {
                window.alert("Hubo muchas más de 60 peticiones en 1 minuto");
                console.log("Hubo muchas más de 60 peticiones en 1 minuto");            
            }else if (respuesta.status === 402) {
                        
                const parrafo =`
                        <div class="parrafo">
                            <p id="texto">Lo sentimos, se han excedido las peticiones de chistes por el día de hoy, por favor vuelva a itentarlo mañana.</p>
                        </div>
                        `;
                document.getElementById('contenedor').innerHTML = parrafo;
    
                // window.alert("Se ha pasado el limite diario de peticiones");
                // console.log("Se ha pasado el limite diario de peticiones");
            }else {
                window.alert("Hubo un error y no sabemos que paso");
                console.log('Hubo un error y no sabemos que paso');
            }
            
            
        } catch (error) {
            console.log(error)
        }
    
    
    }


// Función para buscar GIFs
const buscarGif = async () => {
    const query = valorInput.value;
    console.log("Buscando GIF: " + query);

    try {
        const respuesta = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=Fz10UNG1myBjAwMpSrCZtuuy6TgtZGWe&offset=0&q=${query}`);

        if (respuesta.status === 200) {
            const datosGif = await respuesta.json();
            let gif = '';
            datosGif.data.forEach(giphy => {
                gif += `
                    <div class="gif">
                        <img class="imagen" onclick="agrandar()" src=${giphy.images.fixed_width.url}>
                        <h3 class="titulo">${giphy.title}</h3>
                    </div>
                `;
            });

            document.getElementById('contenedor').innerHTML = gif;
        } else if (respuesta.status === 401) {
            window.alert("Hubo un error 401, petición no autorizada");
        } else if (respuesta.status === 404) {
            window.alert("Hubo un error 404");
        } else if (respuesta.status === 429) {
            window.alert("Hubo muchas más de 60 peticiones en 1 minuto");
        } else if (respuesta.status === 402) {
            const parrafo = `
                <div class="parrafo">
                    <p id="texto">Lo sentimos, se han excedido las peticiones de gifs por el día de hoy, por favor vuelva a intentarlo mañana.</p>
                </div>
            `;
            document.getElementById('contenedor').innerHTML = parrafo;
        } else {
            window.alert("Hubo un error y no sabemos qué pasó");
        }
    } catch (error) {
        console.log(error);
    }
};


// Función para manejar la búsqueda según la opción seleccionada
function buscar() {
    if (searchFunction) {
        searchFunction();
    } else {
        alert("Por favor, selecciona una opción (Jokes o GIFs).");
    }
}