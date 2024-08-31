const algorithms = ["base64", "rot13", "hex", "atbash"];

function decryptString(str, algo) {
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
    }
    return decrypted;
}

function decrypt() {
    var text = document.getElementById("input").value;
    var algorithm = document.getElementById("algorithm").value;

    var decrypted;
    if(algorithm == "multidecrypt") {
        decrypted = [];
        decrypted.push("Potential decryptions:");
        for(var i = 0; i < algorithms.length; i++) {
            try {
                decrypted.push(decryptString(text, algorithms[i]) + " (" + algorithms[i] + ")");
            } catch(e) {
                console.log("Failed to decrypt with algorithm: " + algorithms[i]);
            }
        }
    } else {
        console.log("Decrypting text: " + text + " with algorithm: " + algorithm);
        decrypted = decryptString(text, algorithm);
    }

    console.log(typeof decrypted);
    document.getElementById("output").innerHTML = typeof decrypted == "string" ? decrypted : decrypted.join("<br>");
}