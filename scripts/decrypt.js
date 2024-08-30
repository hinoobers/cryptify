function decrypt() {
    var text = document.getElementById("input").value;
    var algorithm = document.getElementById("algorithm").value;

    var decrypted = "";
    switch(algorithm) {
        case "base64":
            decrypted = atob(text);
            break;
    }

    document.getElementById("output").innerHTML = decrypted;
}