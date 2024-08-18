
let valorInput= [];
//funcion para que funcione el ENTER luego de colocar el input, usando onkeyup
function enter(e){
    if(e.keyCode == 13){
         buscar();
    }
}
//funcion para insertar el valor de input en la variable "valorInput" y luego utilizar su palabra.
function buscar(){
  
    valorInput = document.getElementById("valorInput").value;  
   cargarGif();
};

//Escuchando los botones

let offsetNumero = 0;

const btnSiguiente = document.getElementById('btnSiguiente');
const btnAnterior = document.getElementById('btnAnterior');

btnSiguiente.addEventListener('click', ()=>{
    offsetNumero = offsetNumero + 50;
    cargarGif();
})



//funcion para cargar la API de gifs --- Lo más importante es el FETCH 
const cargarGif = async ()=> {

    try {
        const respuesta =  await fetch(`https://api.giphy.com/v1/gifs/search?api_key=Fz10UNG1myBjAwMpSrCZtuuy6TgtZGWe&offset=0&q=${valorInput}`);

        if (respuesta.status === 200) {
            
            console.log(respuesta);

            const datosGif = await respuesta.json();

            console.log(datosGif);

            let gif = '';
			datosGif.data.forEach(giphy => { //data es el nombre que tiene el array que da todos los resultados, cada pagina da arrays diferentes
				gif += `
					<div class="gif">
						<img class="imagen" onclick="agrandar()" src=${giphy.images.fixed_width.url
                        }>
						<h3 class="titulo">${giphy.title}</h3>
					</div>
				`;
			});

            document.getElementById('contenedor').innerHTML = gif;

            
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
						<p id="texto">Lo sentimos, se han excedido las peticiones de gifs por el día de hoy, por favor vuelva a itentarlo mañana.</p>
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

function agrandar() {
    img = document.getElementsByClassName('imagen[2]');
    img.style.transform = 'scale(10)';
    img.style.textAlign = 'center';
}