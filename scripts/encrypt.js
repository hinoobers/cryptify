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
    }

    document.getElementById("output").innerHTML = encrypted;
    console.log("Encrypting text: " + text + " with algorithm: " + algorithm);
}