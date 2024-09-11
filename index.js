let currentTheme = 1
let ballPosition = 5

function moveBall(value) {
    const switchBall = document.getElementById("theme-switch-ball");
    switchBall.animate([
        { transform: `translate(${value}px, 0)` },
    ], {
        duration: 100 / 22.5 * Math.abs(value), iterations: 1
    }).finished.then(() => {
        ballPosition += value
        switchBall.style.left = ballPosition
    })
}

function switchTheme() {
    switch (currentTheme) {
        case 1:
            document.getElementsByTagName("body")[0].style.backgroundColor = "#E6E6E6";
            document.getElementById('logo').style.color = '#36362C';
            document.getElementById('theme-text').style.color = '#36362C';
            document.getElementsByClassName('theme-switch-number')[0].style.color = '#36362C';
            document.getElementsByClassName('theme-switch-number')[1].style.color = '#36362C';
            document.getElementsByClassName('theme-switch-number')[2].style.color = '#36362C';
            document.getElementById('theme-switch').style.backgroundColor = '#D2CDCD';
            document.getElementById('theme-switch-ball').style.backgroundColor = '#C85402';
            document.getElementById("display").style.backgroundColor = '#EEEEEE';
            document.getElementById('display').style.color = '#36362C';
            document.getElementById('keys-c-container').style.backgroundColor = '#D2CDCD';

            moveBall(22.5)
            currentTheme = 2
            break
        case 2:
            document.getElementsByTagName("body")[0].style.backgroundColor = "#331C4D";
            document.getElementById('logo').style.color = '#FFE53D';
            document.getElementById('theme-text').style.color = '#FFE53D';
            document.getElementsByClassName('theme-switch-number')[0].style.color = '#FFE53D';
            document.getElementsByClassName('theme-switch-number')[1].style.color = '#FFE53D';
            document.getElementsByClassName('theme-switch-number')[2].style.color = '#FFE53D';
            document.getElementById('theme-switch').style.backgroundColor = '#1E0936';
            document.getElementById('theme-switch-ball').style.backgroundColor = '#00DED0';
            document.getElementById("display").style.backgroundColor = '#1E0936';
            document.getElementById('display').style.color = '#FFE53D';
            document.getElementById('keys-c-container').style.backgroundColor = '#1E0936';

            moveBall(22.5)
            currentTheme = 3
            break
        case 3:
            document.getElementsByTagName("body")[0].style.backgroundColor = "#3A4663";
            document.getElementById('logo').style.color = '#FFFFFF';
            document.getElementById('theme-text').style.color = '#FFFFFF';
            document.getElementsByClassName('theme-switch-number')[0].style.color = '#FFFFFF';
            document.getElementsByClassName('theme-switch-number')[1].style.color = '#FFFFFF';
            document.getElementsByClassName('theme-switch-number')[2].style.color = '#FFFFFF';
            document.getElementById('theme-switch').style.backgroundColor = '#242D44';
            document.getElementById('theme-switch-ball').style.backgroundColor = '#D03F2F';
            document.getElementById("display").style.backgroundColor = '#181F33';
            document.getElementById('display').style.color = '#FFFFFF';
            document.getElementById('keys-c-container').style.backgroundColor = '#242D44';

            moveBall(-45)
            currentTheme = 1
            break
    }
    document.getElementById('keys-container').className = "theme-" + currentTheme
}

const themeSwitch = document.getElementById('theme-switch');

themeSwitch.addEventListener('click', () => switchTheme());



function keyClickHandler(e) {
    calculator.keyPress(e.target.innerText)
}

Array.prototype.forEach.call(document.getElementsByClassName('key'), key => key.addEventListener('click', keyClickHandler));

class Calculator {
    constructor() {
        this.currentOperator = "*"
        this.operationValue = "1"
        this.currentValue = "0"
        this.state = "start"
        this.display = document.getElementById("display")
    }

    keyPress(key) {
        if (key === "x") key = "*"
        if (key === ",") key = "."
        if ("0123456789.".includes(key)) {
            if (this.state === "pressedEqual") {
                this.currentOperator = "*"
                this.operationValue = "1"
                this.currentValue = "0"
                this.state = "start"
            }
            if (this.state === "start") {
                if (this.currentValue.length === 15) return
                if (this.currentValue === "0" && key === ".") this.currentValue = "0."
                else if (this.currentValue === "0" && key !== ".") this.currentValue = key
                else if (this.currentValue.includes(".") && key === ".") return
                else this.currentValue += key
                this.display.innerText = this.currentValue.replace(".", ",")
            } else {
                if (this.operationValue.length === 15) return
                if (this.operationValue === "0" && key === ".") this.operationValue = "0."
                else if (this.operationValue === "0" && key !== ".") this.operationValue = key
                else if (this.operationValue.includes(".") && key === ".") return
                else this.operationValue += key
                this.display.innerText = this.operationValue.replace(".", ",")
                this.state = "writing2number"
            }
            if (this.state === "writing2number") this.state = "writing2number2"
        }

        if (key === "DEL") {
            if (this.state === "start") {
                this.currentValue = this.currentValue.slice(0, -1)
                if (this.currentValue === "") this.currentValue = "0"
                this.display.innerText = this.currentValue.replace(".", ",")
            } else {
                this.operationValue = this.operationValue.slice(0, -1)
                if (this.operationValue === "") this.operationValue = "0"
                this.display.innerText = this.operationValue.replace(".", ",")
                this.state = "writing2number"
            }
        }

        if (key === "RESET") {
            this.currentValue = "0"
            this.currentOperator = "*"
            this.operationValue = "1"
            this.display.innerText = this.currentValue
        }

        if ("+-*/".includes(key)) {
            console.log(key)
            if (this.state === "pressedOperator") {
                this.currentOperator = key
            } else if (this.state === "pressedEqual") {
                this.currentOperator = key
                this.state = "writing2number"
                this.operationValue = "0"
            } else if (this.state === "start") {
                this.currentOperator = key
                this.state = "pressedOperator"
                this.operationValue = "0"
            } else if (this.state === "writing2number2") {
                switch (this.currentOperator) {
                    case "+":
                        this.currentValue = String(Number(this.currentValue) + Number(this.operationValue))
                        break
                    case "-":
                        this.currentValue = String(Number(this.currentValue) - Number(this.operationValue))
                        break
                    case "*":
                        this.currentValue = String(Number(this.currentValue) * Number(this.operationValue))
                        break
                    case "/":
                        this.currentValue = String(Number(this.currentValue) / Number(this.operationValue))
                        break
                }
                this.currentOperator = key
                this.operationValue = "0"
                this.display.innerText = this.currentValue.replace(".", ",")
            }
        }

        if (key === "=") {
            if (this.state === "start") {
                this.currentValue = String(Number(this.currentValue))
                this.display.innerText = this.currentValue.replace(".", ",")
            }
            if (this.state === "writing2number2" || this.state === "pressedEqual") {
                switch (this.currentOperator) {
                    case "+":
                        this.currentValue = String(Number(this.currentValue) + Number(this.operationValue))
                        break
                    case "-":
                        this.currentValue = String(Number(this.currentValue) - Number(this.operationValue))
                        break
                    case "*":
                        this.currentValue = String(Number(this.currentValue) * Number(this.operationValue))
                        break
                    case "/":
                        this.currentValue = String(Number(this.currentValue) / Number(this.operationValue))
                        break
                }
                this.display.innerText = this.currentValue.replace(".", ",")
            }
            this.state = "pressedEqual"
        }
    }
}

const calculator = new Calculator();

document.addEventListener("keydown", e => {
    e.preventDefault()
    if ("0123456789+-*/.,".includes(e.key)) {
        calculator.keyPress(e.key)
        document.getElementById(e.key).style.backgroundColor = [0, "#FFFFFE", "#FFFFFF", "#6C34AC"][currentTheme]
    }
    else if (e.key === "Backspace") {
        calculator.keyPress("DEL")
        document.getElementById('del').style.backgroundColor = [0, "#A2B2E1", "#62B5BC", "#8631AF"][currentTheme]
    } else if (e.key === "r") {
        calculator.keyPress("RESET")
        document.getElementById('reset').style.backgroundColor = [0, "#A2B2E1", "#62B5BC", "#8631AF"][currentTheme]
    } else if (e.key === "Enter") {
        calculator.keyPress("=")
        document.getElementById('=').style.backgroundColor = [0, "#F96B5B", "#FF8A38", "#93FFF8"][currentTheme]
    }
})

document.addEventListener("keyup", e => {
    if ("0123456789+-*/.,".includes(e.key)) {
        document.getElementById(e.key).style.backgroundColor = [0, "#EAE3DC", "#E5E4E1", "#331C4D"][currentTheme]
    } else if (e.key === "Backspace") {
        document.getElementById('del').style.backgroundColor = [0, "#647198", "#378187", "#56077C"][currentTheme]
    } else if (e.key === "r") {
        document.getElementById('reset').style.backgroundColor = [0, "#647198", "#378187", "#56077C"][currentTheme]
    } else if (e.key === "Enter") {
        calculator.keyPress("=")
        document.getElementById('=').style.backgroundColor = [0, "#D03F2F", "#C85402", "#00DED0"][currentTheme]
    }
})