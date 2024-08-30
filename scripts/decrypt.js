const algorithms = ["base64", "rot13", "hex"];

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
            decrypted.push(decryptString(text, algorithms[i]) + " (" + algorithms[i] + ")");
        }
    } else {
        decrypted = decryptString(text, algorithm);
    }

    document.getElementById("output").innerHTML = decrypted.join("<br>");
}