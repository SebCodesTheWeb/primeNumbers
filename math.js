
document.querySelector("#number-selector").addEventListener("keyup", function(event) {
    if(document.querySelector("#number-selector").value > 10000) {
        document.querySelector("#number-selector").value = 100100;
    }
    let listOfPrimes = [];
    function removeMultiples(factor) {
        for(let i = 1; i < listOfPrimes.length; i++) {
            if(listOfPrimes[i] % factor === 0 && listOfPrimes[i] != factor) {
                listOfPrimes.splice(i, 1);
            }
        }
    }

    document.querySelector("#primeNumbers").innerHTML = "";

    for(let i = 2; i < document.querySelector("#number-selector").value; i++) {
        listOfPrimes.push(i);
    }

    for(let i = 0; i < document.querySelector("#number-selector").value; i++) {
    removeMultiples(listOfPrimes[i]);
    if(i === listOfPrimes.length - 1) {
        break;
    }
    }

    for(let i = 0; i < listOfPrimes.length; i++) {
        if(i != listOfPrimes.length - 1) {
            document.querySelector("#primeNumbers").innerHTML += `<p class="primeNumber">${listOfPrimes[i]}, </p>`;
        } else {
            document.querySelector("#primeNumbers").innerHTML += `<p class="primeNumber">${listOfPrimes[i]}. </p>`;
        }
    }

    let fontSize = (68 -((listOfPrimes.length)/50))
    if(fontSize < 14) {
        fontSize = 14;
    }
    document.querySelectorAll(".primeNumber").forEach(number => {
        number.style.fontSize = `${fontSize}px`;
        number.addEventListener("click", (event) => {
            getNumberInfo(parseInt(event.target.innerHTML));
        })
    })


    document.querySelector("#primeNumbers").style.fontSize = `${fontSize}px`;
})

async function getNumberInfo(number) {
    let response = await fetch(`http://numbersapi.com`);
    let data = await response.json();
    document.querySelector("#number").innerHTML = data.number;
}


