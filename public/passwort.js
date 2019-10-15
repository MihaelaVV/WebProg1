function anmelden() {
    var ben = "wwi2018d";
    var pass = "dhbw";
    if (ben == document.getElementById("bn").value && pass == document.getElementById("pw").value) {
        window.location.href = 'ds-erklärung.html';
        return true;
    } else {
        alert("Benutzername oder Passwort falsch.")
    }
}

function passwortAnzeigen() {
    var x = document.getElementById("pw");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}
