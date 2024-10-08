const algorithms = ["base64", "rot13", "hex", "atbash", "caesar", "vigenere", "reverse", "scytale"];

function scytaleDecrypt(text, column) {
    let token = text.split('')
    let rows = token.length / column
    let result = ''
  
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < column; i++) {
        if ((j * column) + i < (token.length)) {
          result = result + token[(i * rows) + j]
        } else {
          result = result + '*'
        }
      }
    }
  
    return result
}

function decryptString(str, key, algo) {
    console.log("Decrypting string: " + str + " with algorithm: " + algo, " and key: " + key);
    var decrypted = "";
    switch(algo) {
        case "base64":
            decrypted = atob(str);
            break;
        case "rot13":
            decrypted = str.replace(/[a-zA-Z]/g, function(c) {
                return String.fromCharCode(c.charCodeAt(0) + (c.toLowerCase() <= "m" ? 13 : -13));
            });
            break;
        case "hex":
            decrypted = str.match(/.{1,2}/g).map(function(c) {
                return String.fromCharCode(parseInt(c, 16));
            }).join("");
            break;
        case "atbash":
            console.log("Decrypting with atbash");
            decrypted = str.split("").map(function(c) {
                const isUpperCase = c >= 'A' && c <= 'Z';
                const isLowerCase = c >= 'a' && c <= 'z';
                if (isUpperCase || isLowerCase) {
                    const index = isUpperCase
                        ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(c.toLowerCase())
                        : 'abcdefghijklmnopqrstuvwxyz'.indexOf(c);
                    const newChar = isUpperCase
                        ? 'ZYXWVUTSRQPONMLKJIHGFEDCBA'[index]
                        : 'zyxwvutsrqponmlkjihgfedcba'[index];
                    return newChar;
                } else {
                    return c;
                }
            }).join("");
            break;
        case "caesar":
            decrypted = str.split("").map(function(c, i) {
                var shift = parseInt(key[i % key.length]); 
                var base = c.charCodeAt(0) >= 97 ? 97 : 65;
                return String.fromCharCode(((c.charCodeAt(0) - base - shift + 26) % 26) + base);
            }).join("");
            break;
        case "vigenere":
            key = key.toLowerCase();
            decrypted = str.split("").map(function(c, i) {
                var base = c.charCodeAt(0) >= 97 ? 97 : 65;
                var shift = key.charCodeAt(i % key.length) - 97;
                return String.fromCharCode(((c.charCodeAt(0) - base - shift + 26) % 26) + base);
            }).join("");
            break;
        case "reverse":
            decrypted = str.split("").reverse().join("");
            break;
        case "scytale":
            console.log("sky");
            var width = parseInt(key);
            decrypted = scytaleDecrypt(str, width);
            break;
    }
    return decrypted;
}

function decrypt() {
    var text = document.getElementById("input").value;
    if(text == "") {
        alert("Please enter some text to decrypt");
        return;
    }
    var algorithm = document.getElementById("algorithm").value;
    var key = document.getElementById("key").value;

    var decrypted;
    if(algorithm == "multidecrypt") {
        decrypted = [];
        decrypted.push("Potential decryptions:");
        for(var i = 0; i < algorithms.length; i++) {
            try {
                decrypted.push(decryptString(text, key, algorithms[i]) + " (" + algorithms[i] + ")");
            } catch(e) {
                console.log("Failed to decrypt with algorithm: " + algorithms[i]);
            }
        }
    } else {
        console.log("Decrypting text: " + text + " with algorithm: " + algorithm);
        decrypted = decryptString(text, key, algorithm);
    }

    console.log(typeof decrypted);
    document.getElementById("output").innerHTML = typeof decrypted == "string" ? decrypted : decrypted.join("<br>");
}