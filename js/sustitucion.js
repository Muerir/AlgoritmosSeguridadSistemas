// --- Variables sacadas del html ---
const desplazamiento = document.getElementById("desplazamiento");
const texto = document.getElementById("texto");
const textoCifrado = document.getElementById("cifrado");
const valor = document.getElementById("demo");
// --- #Variables sacadas del html ---

function cifrado(){

	const textoIngresado = texto.value;  // valor del texto ingresado
	textoCifrado.value = textoIngresado.split('').map(c=>{
		let mayus = (c === c.toUpperCase()) ? true : false; // Se queda con los valores en mayúscula
        let valorEntero = c.toLowerCase().charCodeAt(0); // Busca el valor en ASCII
        
		if(valorEntero >= 97 && valorEntero <= 122)
			{
				const valorDesplazamiento = parseInt(desplazamiento.value);
				
				if(valorEntero + valorDesplazamiento > 122)
					valorEntero = 97 + (valorEntero - 122) + valorDesplazamiento - 1; // Aquí se desplaza el valor para Cifrar
				else
					valorEntero = valorEntero + valorDesplazamiento;
			}
	
			let cifrado = String.fromCharCode(valorEntero);
			return mayus ? cifrado.toUpperCase() : cifrado;
		}).join('');
}
texto.addEventListener("keyup",cifrado);// Aquí se acciona el cifrado
desplazamiento.addEventListener("change", cifrado);
valor.innerHTML = desplazamiento.value;
desplazamiento.oninput = function() {// Aquí se desplaza el valor para cifrar
	valor.innerHTML = this.value;
  }