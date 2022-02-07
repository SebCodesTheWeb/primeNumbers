const inputNumber = document.getElementById('number-selector');
const primeNumbers = document.getElementById('primeNumbers');

inputNumber.addEventListener("keyup", function(event) {
    if(inputNumber.value >= 10000) {
        inputNumber.value = 10000;
    }
    let listOfPrimes = [];
    function removeMultiples(factor) {
        for(let i = 1; i < listOfPrimes.length; i++) {
            if(listOfPrimes[i] % factor === 0 && listOfPrimes[i] != factor) {
                listOfPrimes.splice(i, 1);
            }
        }
    }

    primeNumbers.innerHTML = "";

    for(let i = 2; i < inputNumber.value; i++) {
        listOfPrimes.push(i);
    }

    for(let i = 0; i < inputNumber.value; i++) {
    removeMultiples(listOfPrimes[i]);
    if(i === listOfPrimes.length - 1  || listOfPrimes[i] > Math.sqrt(inputNumber.value)) {
        break;
    }
}

    for(let i = 0; i < listOfPrimes.length; i++) {
        if(i != listOfPrimes.length - 1) {
            primeNumbers.innerHTML += `<p class="primeNumber">${listOfPrimes[i]}, </p>`;
        } else {
            primeNumbers.innerHTML += `<p class="primeNumber">${listOfPrimes[i]}. </p>`;
        }
    }

    document.querySelectorAll(".primeNumber").forEach(number => {
        number.style.fontSize = `${fontSize}px`;
        number.addEventListener("click", (event) => {
            getNumberInfo(parseInt(event.target.innerHTML));
        })
    })
    
    
    let fontSize = (68 -((listOfPrimes.length)/50))
    if(fontSize < 14) {
        fontSize = 14;
    }
    primeNumbers.style.fontSize = `${fontSize}px`;

    const numberText = document.querySelector(".primeNumber").innerHTML

    window.addEventListener("scroll", function(event) {
        const triggerBottom = window.innerHeight / 5 * 4;

        document.querySelectorAll(".primeNumber").forEach(number => {
            const numberTop = number.getBoundingClientRect().top;

            if(numberTop < triggerBottom) {
                number.classList.add("show")
            } else {
                number.classList.remove("show")
            }
        })
    })
})

async function getNumberInfo(number) {
    let response = await fetch(`http://numbersapi.com`);
    let data = await response.json();
    document.querySelector("#number").innerHTML = data.number;
}


