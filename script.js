
let valor= [];
//funcion para que funcione el ENTER luego de colocar el input, usando onkeyup
function enter(e){
    if(e.keyCode == 13){
         buscar();
    }
}
//funcion para insertar el valor de input en la variable "valor" y luego utilizar su palabra.
function buscar(){
  
    valor = document.getElementById("valor").value;  
   cargarChiste();
};



//funcion para cargar la API de chistes --- Lo más importante es el FETCH 
const cargarChiste = async ()=> {

    try {
        const respuesta =  await fetch(`https://api.humorapi.com/jokes/search?api-key=dac36f2fb3e14a548ca4ff7575ea33fc&keywords=${valor}`);

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


function placehold()
    {
    /* Para obtener el valor */
    let  opcion = document.getElementById("form");
    let  texto = document.getElementById('valor');
    
    if (opcion.value == "valorJoke"){
    texto.placeholder = "Elija un estilo de chiste";
    }else if (opcion.value == "valorGif"){
        texto.placeholder = "Elija un tipo de Gif"
    }else{
        texto.placeholder = "Seleccione una opcion";
        
    }
    }
