const inputNumber = document.getElementById('number-selector');
const inputSecondNumber = document.querySelector(".secondNumberInput");
const primeNumbers = document.getElementById('primeNumbers');
const numberData = document.querySelector("#numberData");
let savedNumber = undefined;

document.querySelector(".calculateButton").addEventListener("click", function(event) {
    let listOfPrimes = [];
    primeNumbers.innerHTML = "";

    // Handling Input
    if(inputSecondNumber.value != "") {
        if(inputSecondNumber.value <= inputNumber.value ) {
            document.querySelector("#isGenerated").innerHTML = "Invalid Input";
            return; 
        } if(inputSecondNumber.value - inputNumber.value > 10000 ) {
            document.querySelector("#isGenerated").innerHTML = `Max Interval is 10 000, you entered ${inputSecondNumber.value} - ${inputNumber.value} = ${inputSecondNumber.value- inputNumber.value}`;
            return;
        }
        else {
            for(let i = inputNumber.value; i < inputSecondNumber.value; i++) {
                if(isPrime(i)) {
                    listOfPrimes.push(i);
                }
            }

        }
    } else {

        // Custom made Prime number function
        if(inputNumber.value >= 10000) {
            inputNumber.value = 10000;
        }
        function removeMultiples(factor) {
            for(let i = 1; i < listOfPrimes.length; i++) {
                if(listOfPrimes[i] % factor === 0 && listOfPrimes[i] != factor) {
                    listOfPrimes.splice(i, 1);
                }
            }
        }    
        for(let i = 2; i < inputNumber.value; i++) {
            listOfPrimes.push(i);
        }
    
        for(let i = 0; i < inputNumber.value; i++) {
        removeMultiples(listOfPrimes[i]);
        if(i === listOfPrimes.length - 1  || listOfPrimes[i] > Math.sqrt(inputNumber.value)) {
            break;
        }
    }
    }

    // Displaying Numbers
    for(let i = 0; i < listOfPrimes.length; i++) {
        if(i != listOfPrimes.length - 1) {
            primeNumbers.innerHTML += `<p class="primeNumber">${listOfPrimes[i]}, </p>`;
        } else {
            primeNumbers.innerHTML += `<p class="primeNumber">${listOfPrimes[i]}. </p>`;
        }
    }
    document.querySelector("#isGenerated").innerHTML = "Prime numbers are generated";


  
    // Handling Font Size based on number of Primes
    let fontSize = (68 -((listOfPrimes.length)/50))
    if(fontSize < 14) {
        fontSize = 14;
    }

    // Handling Animation
    primeNumbers.style.fontSize = `${fontSize}px`;
    document.querySelectorAll(".primeNumber").forEach(number => {
        number.addEventListener("click", (event) => {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera    
            document.querySelector("body").style.transform = "scale(60%) skew(-5deg)";
            document.querySelector("body").style.maxHeight = "100vh";
            document.querySelector("body").style.border = "5px solid #fff"
            document.querySelector("#inputBox").style.opacity = "0";
            document.querySelector("#primeNumbers").style.opacity = "0";
            document.querySelector("#isGenerated").style.opacity = "0";
            numberData.style.opacity = "1";    
            numberData.scrollIntoView({behavior: "smooth"});
            savedNumber = number;
            let finished = getNumberInfo(parseInt(event.target.innerHTML));
        })
    })

    // FadeIn Numbers
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    window.addEventListener("scroll", function(event) {
        document.querySelectorAll(".primeNumber").forEach(number => {
            if(isInViewport(number)) {
                number.classList.add("show")
            } else {
                number.classList.remove("show")
            }
        })
    })
})

// Making Fetch Call to numbers API
async function getNumberInfo(number) {
    let factOne = "";
    let factTwo = ""
    let response = await fetch(`http://numbersapi.com/${number}/math`);
    let data = await response.text();
    if(!data.includes("we're missing")) {
        factOne = `<span style="font-size: 2.25rem; margin-top: -5rem; margin-bottom: 0;">${data}</span>`;
    }

    let secondResponse = await fetch(`http://numbersapi.com/${number}`);
    let secondData = await secondResponse.text();
    if(!secondData.includes("we're missing" || secondData != data)) {
        factTwo = `<br><span style="font-size: 2.25rem; margin-top: -10rem"; >${secondData}</span>`;
    }

    // Displaying Intersting Facts about Numbers
    numberData.innerHTML += `<a id="numberSpanInfo" href="https://number.academy/${number}" target="_blank" style="margin-top: -5rem;">${number}</a>`;
    numberData.innerHTML += `<br>Prime Number<br>${factOne}<br>${factTwo}`;
    numberData.innerHTML += `<button id="goBackButton" ">Go Back</button>`;


    // Back to main page
    document.querySelector("#goBackButton").addEventListener("click", (event) => {
        document.querySelector("#inputBox").style.opacity = "1";
        numberData.innerHTML = "";
        numberData.style.opacity = "0";
        document.querySelector("#primeNumbers").style.opacity = "1";
        document.querySelector("#isGenerated").style.opacity = "1";
        document.querySelector("body").style.border = "none"
        document.querySelector("body").style.maxHeight = "1000vh";
        document.querySelector("body").style.transform = "scale(100%) skew(0deg)";
        savedNumber.scrollIntoView({behavior: "smooth", block: "start"});
    })

    return "FINIHED";
}

// Checking if divisble by every number up to square root of number
function isPrime(num) {
    for (let i = 2; i * i <= num; i++)
        if (num % i === 0)
          return false; 
    return num > 1;
}
