const algorithms = {"base64": {"needsKey": false}, "rot13": {"needsKey": false}, "hex": {"needsKey": false}, "atbash": {"needsKey": false}, "caesar": {"needsKey": true}, "vigenere": {"needsKey": true}};

document.addEventListener("DOMContentLoaded", function() {
    var select = document.getElementById("algorithm");
    for (var algorithm in algorithms) {
        if (algorithms.hasOwnProperty(algorithm)) {
            console.log("Adding algorithm: " + algorithm);
            var option = document.createElement("option");
            option.text = algorithm;
            option.value = algorithm; 
            select.add(option);
        }
    }

    document.getElementById("key").style.display = "none";
    document.getElementById("algorithm").addEventListener("change", function() {
        var algorithm = document.getElementById("algorithm").value;
        console.log("Selected algorithm: " + algorithm);
        if(algorithms[algorithm].needsKey) {
            document.getElementById("key").style.display = "block";
        } else {
            document.getElementById("key").style.display = "none";
        }
    });
});


function atbashCipher(str) {
    const result = [];
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const reversedAlphabet = alphabet.split('').reverse().join('');

    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        const isUpperCase = char >= 'A' && char <= 'Z';
        const isLowerCase = char >= 'a' && char <= 'z';

        if (isUpperCase || isLowerCase) {
            const index = isUpperCase
                ? alphabet.indexOf(char.toLowerCase())
                : alphabet.indexOf(char);
            const newChar = isUpperCase
                ? reversedAlphabet[index].toUpperCase()
                : reversedAlphabet[index];
            result.push(newChar);
        } else {
            result.push(char);
        }
    }

    return result.join('');
}

function encrypt() {
    var text = document.getElementById("input").value;
    var algorithm = document.getElementById("algorithm").value;
    var key = document.getElementById("key").value;

    var encrypted = "";
    switch(algorithm) {
        case "base64":
            console.log("Encrypting with base64");
            encrypted = btoa(text);
            break;
        case "rot13":
            encrypted = text.replace(/[a-zA-Z]/g, function(c) {
                return String.fromCharCode(c.charCodeAt(0) + (c.toLowerCase() <= "m" ? 13 : -13));
            });
            break;
        case "hex":
            encrypted = text.split("").map(function(c) {
                return c.charCodeAt(0).toString(16);
            }).join("");
            break;
        case "atbash":
            encrypted = atbashCipher(text);
            break;
        case "caesar":
            encrypted = text.split("").map(function(c, i) {
                var shift = parseInt(key[i % key.length]); 
                var base = c.charCodeAt(0) >= 97 ? 97 : 65;
                return String.fromCharCode(((c.charCodeAt(0) - base + shift) % 26) + base);
            }).join("");
            break;
        case "vigenere":
            key = key.toLowerCase();
            encrypted = text.split("").map(function(c, i) {
                var base = c.charCodeAt(0) >= 97 ? 97 : 65;
                var shift = key.charCodeAt(i % key.length) - 97;
                return String.fromCharCode(((c.charCodeAt(0) - base + shift) % 26) + base);
            }).join("");
            break;
    }

    document.getElementById("output").innerHTML = encrypted;
    console.log("Encrypting text: " + text + " with algorithm: " + algorithm);
}