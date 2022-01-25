var timer;
var spelStatus = 1;
var gekozen = [];

// Hulpfunctie emojigrootte instellen
function stelGrootteIn(keuze) {
    // alle items selecteren
    let spans = document.querySelectorAll("span.keuze");
    console.log(keuze);

    // gekozen groot, rest klein
    spans.forEach(element => {
        if (keuze == 'reset') {
            element.style.fontSize = "";
        } else if (element.id == keuze) {
            element.style.fontSize = "8em";
        } else {
            element.style.fontSize = "0em";
        }
    });
}

// Actie uitvoeren n.a.v. spelerkeuze
function kies(keuze) {
    console.log("Keuze: " + keuze);

    // Keuze opslaan
    gekozen.push(keuze);

    // Het gekozen item groot maken
    stelGrootteIn(keuze);

    // timer volgende ronde zetten
    spelStatus++;
    setTimeout(setSpelStatus, 1500, spelStatus);
}

function setSpelStatus(speler) {
    // Speler 1 en speler 2 kiezen een item
    // console.log(speler);
    // console.log(spelStatus);

    if (spelStatus < 3) {
        stelGrootteIn('reset');

        document.getElementById("speler").innerHTML = spelStatus;
    } else {
        // Spel is afgelopen, laat uitslag weten
        let container = document.getElementById("container");

        // Eerst controle op gelijkspel
        let gelijkspel = new Set(gekozen);

        if (gelijkspel.size == 1) {
            // Als de set maar 1 item bevat is het gelijk spel
            console.log("Gelijkspel");
            container.innerHTML = "Gelijk spel";
        } else {
            // Anders bepalen wie gewonnen heeft
            let controle = gekozen.toString();

            let spelerGewonnen = 2;
            if ((controle == "scissors,paper") ||
                (controle == "paper,rock") ||
                (controle == "rock,lizard") ||
                (controle == "lizard,spock") ||
                (controle == "spock,scissors") ||
                (controle == "scissors,lizard") ||
                (controle == "lizard,paper") ||
                (controle == "paper,spock") ||
                (controle == "spock,rock") ||
                (controle == "rock,scissors")) {
                spelerGewonnen = 1;
            }

            container.innerHTML = '<span id="gewonnen" class="gewonnen" >Speler '
                + spelerGewonnen + ' heeft gewonnen!</span>';

            setTimeout(function () {
                document.getElementById("gewonnen").style.fontSize = "3em";
            }, 100);
        }
        // Opnieuw beginnen?
        let spelerinfo = document.getElementById("spelerinfo");
        spelerinfo.innerHTML = '<button onclick="location.reload()">Nog een keer</button>';
    }
}