let arrayAnimali = [
    '🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', 
    '🦊', '🐨', '🐰', '🐯', '🐱', '🦉', '🐾', '🦁', 
    '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐯', '🐰'];


let arrayComparison = [];

document.body.onload = startGame();



var seconds = 0;
var minutes = 0;
var timer = document.getElementById('timer');

function shuffle(a) {
    var currentIndex = a.length;
    var temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = a[currentIndex];
        a[currentIndex] = a[randomIndex];
        a[randomIndex] = temporaryValue;
    }
    return a;
}

function startGame () {
    clearInterval(myTimer);
    shuffle(arrayAnimali);
    let container = document.getElementById("griglia");
    document.getElementById("modal").style.display = "none";
    container.innerHTML = "";
    for (let animale of arrayAnimali) {
        let div = document.createElement(`div`);
        container.appendChild(div)
        div.className = "tessera";
        div.innerHTML = `<span class="icon" onclick="displayIcon(event)">${animale}</span>`;
    }


    function timerMinSec() {
        if (seconds < 60) {
        seconds++;
        timer.innerHTML = "Tempo: " + minutes + " min " + seconds + " sec";
    } else {
        minutes++;
        seconds = 0;
        timer.innerHTML = "Tempo: " + minutes + " min " + seconds + " sec";
    }}

    var myTimer = setInterval(timerMinSec, 1000);

    if (seconds > 0 || minutes > 0) {
        clearInterval(myTimer);
        }
    seconds= 0;
    minutes= 0;
}


function displayIcon(eventClick) {
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];
   
    eventClick.target.classList.toggle("show");

    arrayComparison.push(eventClick.target);
    arrayComparison[0].classList.add("disabled");

    var len = arrayComparison.length;
    if (len === 2) {
        if (arrayComparison[0].innerHTML === arrayComparison[1].innerHTML) {
            arrayComparison[0].classList.add("find", "disabled");
            arrayComparison[1].classList.add("find", "disabled");
            arrayComparison = [];
            
        
            let check = icons.every(item => item.classList.contains('disabled'))
            if (check) {
            document.getElementById("modal").style.display = "block";
            document.getElementById("tempoTrascorso").innerHTML = "Tempo: " + minutes + " min " + seconds + " sec";
            }
        } else {
            icons.forEach(function(item) {
                item.classList.add('disabled');
            });
            setTimeout(function() {
                arrayComparison[0].classList.remove("show");
                arrayComparison[1].classList.remove("show");
                icons.forEach(function(item) {
                    item.classList.remove('disabled');
                    for (var i = 0; i < arrayComparison.length; i++) {
                        arrayComparison[i].classList.remove("disabled");
                    }
                    
                });
                arrayComparison = [];
            }, 700);
        }
    }       
}
