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
            lines[i][j] = String.fromCharCode(97+Math.floor(Math.random() * 26))
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
function makeArraysDecipher(text,keyLength){
    var words = text.toLowerCase().split(' ');
    var copy = words;
    var arrayi = new Array();

    for(var word of words){
        arrayi.push(word.split(''));
    }
    return arrayi;
}

function orderList(lines, key, textSpaceless){
    var order = [];

    var cipher = "";

    
    for(var letter of key){
        let val = letterValue(letter);
        order.push(val);
    }

    var min = order.indexOf(Math.min(...order));
    for(var i = 0; i < key.length;i++){
        for(var j=0; j<Math.ceil(textSpaceless.length/key.length); j++){
            if(lines[j][min] != undefined){
                cipher += lines [j][min];
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
    var cipher = separateCipher(lines,key, textSpaceless);
    return cipher;
    
}

function transpositionDecipher(text,key){
    var textSpaceless = text.replace(/\s/g, '').toLowerCase().replace(/[^A-Za-z]+/g, '');
    var keyLength = key.length;
    var lines = makeArraysDecipher(text,keyLength);
    var lined = makeArrays(textSpaceless,keyLength);
    
    

    var order = [];

    var cipher = "";

    
    for(var letter of key){
        let val = letterValue(letter);
        order.push(val);
    }
    
    
    var min = order.indexOf(Math.min(...order));
    console.log(lined)
    console.log(min)
    for(var i = 0; i < keyLength;i++){
        console.log(min)
        for(var j=0; j<Math.ceil(textSpaceless.length/key.length); j++){
                console.log(min, j);
                lined[j][min] = lines[i][j].toString();;         
        }
        console.log(lined);
        order[min] = 1000;
        min = order.indexOf(Math.min(...order));
    }
    
    for(var line of lined){
        for(var lett of line){
            cipher += lett;
        }
    }
   return cipher;
}

console.log(transpositionCipher("WE ARE DISCOVERED. FLEE AT ONCE.","zebras"))
console.log(transpositionDecipher(transpositionCipher("WE ARE DISCOVERED. FLEE AT ONCE.","zebras"), "zebras"))
console.log(transpositionDecipher("gosq aomt icen msoa", "hola"));
