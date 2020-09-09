//Obtención del valor del alfabeto
function letterValue(letter){
    return letter.toLowerCase().charCodeAt(0) - 96;
}

//formacion de las columnas de cifrado
function makeArrays(textSpaceless,keyLength){
    var lines = [];
    for(var i=0; i<Math.ceil(textSpaceless.length/keyLength); i++) {
        lines[i] = [];
        for(var j=0; j<keyLength; j++) {
            lines[i][j] = undefined;
        }
    }
    var long = 0;
    var cont = 0;
    for(var i = 0; i < textSpaceless.length;i++){
        lines[long][cont] = textSpaceless[i];
        cont++;
        if(cont >= keyLength){
            cont = 0;
            long++;
        }         
    }
    return lines;
}

function orderList(lines, key, textSpaceless){
    var order = [];

    var cipher = "";

    
    for(var letter of key){
        let val = letterValue(letter);
        order.push(val);
    }

    var min = order.indexOf(Math.min(...order));
    console.log(order);
    console.log(lines);
    for(var i = 0; i < key.length;i++){
        for(var j=0; j<Math.ceil(textSpaceless.length/key.length); j++){
            console.log(min);
            if(lines[j][min] != undefined){
                cipher += lines [j][min];
                console.log(cipher);
            }
        }
        order[min] = 1000;
        min = order.indexOf(Math.min(...order));
    }
    return cipher;
}

//unir a nuevo string cifrado

function separateCipher(lines, key, textSpaceless){
    var text = orderList(lines,key, textSpaceless);;
    
    let res = [...text].map((d, i) => (i) % Math.ceil(textSpaceless.length/key.length) == 0 ? ' ' + d : d).join('').trim()
    return res;
}

//funcion principal
function transpositionCipher(text,key){
    var textSpaceless = text.replace(/\s/g, '').toLowerCase().replace(/[^A-Za-z]+/g, '');
    var keyLength = key.length;
    var lines = makeArrays(textSpaceless,keyLength);
    var text = separateCipher(lines,key, textSpaceless);
    return text;
    
}

console.log(transpositionCipher("amigos como estan", "hola"))