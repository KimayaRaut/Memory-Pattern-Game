let level = 0;
let gameFlag = false;
const systemPattern = [];
let userPattern = [];
let msg = document.querySelector("#msg")
let buttonAll = document.querySelectorAll(".container button");
const timer = ms => new Promise(res => setTimeout(res, ms));

document.addEventListener("keypress",function(){
    if(gameFlag == false){
        startGame()
        gameFlag = true
    }
})

function incrementLevel(){
    level ++;
    msg.innerText = "Level "+level;
    if(level < 1){
        generatePattern()
    }
}

async function buttonFlash(){
    for(let index of systemPattern){
        buttonAll[index].classList.add("button-glow-on");
        await timer(1000)
        buttonAll[index].classList.remove("button-glow-on");
        await timer(500);
    }
}

function generatePattern(){
    let random = Number(Math.floor(Math.random() * 4));
    systemPattern.push(random)
    buttonFlash()
    
}
function stopGame(){
    document.body.style.backgroundColor = "#EF7C8E";
    setTimeout(function(){
        document.body.style.backgroundColor = "";
    },250)
    msg.innerText = "Game over!! Your score is: "+ String(level)+" press any key to start"
    level = 0;
    gameFlag = false;
    userPattern = [];
    systemPattern = [];
}

function print(){
    console.log("level:",level);
    console.log("System Pattern:",systemPattern);
    console.log("User Pattern:",userPattern);
}

function startGame(){
    incrementLevel()
    generatePattern()
    for(let button of buttonAll){
        button.addEventListener("click",function(){
            userPattern.push(Number(this.innerText))
            console.log(systemPattern.length == userPattern.length,JSON.stringify(systemPattern) == JSON.stringify(userPattern))
            console.log(systemPattern,userPattern)
            if(systemPattern.length == userPattern.length && JSON.stringify(systemPattern) == JSON.stringify(userPattern)){
                incrementLevel()
                generatePattern()
                console.log("system pattern:",systemPattern)
                userPattern = []
            }else if(systemPattern.length == userPattern.length && JSON.stringify(systemPattern) != JSON.stringify(userPattern)){
                stopGame();
            }
        })
    }
    
}



