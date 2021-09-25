class Field{
    constructor(query){
        this.queryChain = query;
        this.isChecked = false;
        this.typeOfCheck = "none";
        console.log(this.isChecked, this.queryChain);
    }

    clickAction(){
        if(this.isChecked === false){
            switch (turnOrder){
                case "square":
                    document.querySelector(this.queryChain + " > .square").style.display="block";
                    this.typeOfCheck = "square";
                    ifEnd(turnOrder);
                    turnOrder = "circle";
                    console.log("square");
                break;

                case "circle":
                    document.querySelector(this.queryChain + " > .circle").style.display="block";
                    this.typeOfCheck = "circle";
                    ifEnd(turnOrder);
                    turnOrder = "square";
                    console.log("circle");
                break;
            }
        this.isChecked = true;
        } else {
            alert("This field is taken!");
        }
    }

    restart(){
        document.querySelector(this.queryChain + " > .circle").style.display="none";
        document.querySelector(this.queryChain + " > .square").style.display="none";
        this.isChecked = false;
        this.typeOfCheck = "none";
    }
}

function fullRestart(){
    topLeft.restart();
    topMid.restart(); 
    topRight.restart();

    midLeft.restart();
    midMid.restart(); 
    midRight.restart();

    botLeft.restart();
    botMid.restart();
    botRight.restart();

    document.querySelector(".mainDiv").style.display = "flex";
    document.querySelector(".endScreen").style.display = "none";

    turnOrder = "square";
}

function generateFields(){
    topLeft = new Field("#topLeft");
    topMid = new Field("#topMid");
    topRight = new Field("#topRight");

    midLeft = new Field("#midLeft");
    midMid = new Field("#midMid");
    midRight = new Field("#midRight");

    botLeft = new Field("#botLeft");
    botMid = new Field("#botMid");
    botRight = new Field("#botRight");

    document.querySelector("#topLeft").addEventListener('click', () => topLeft.clickAction());
    document.querySelector("#topMid").addEventListener('click', () => topMid.clickAction());
    document.querySelector("#topRight").addEventListener('click', () => topRight.clickAction());

    document.querySelector("#midLeft").addEventListener('click', () => midLeft.clickAction());
    document.querySelector("#midMid").addEventListener('click', () => midMid.clickAction());
    document.querySelector("#midRight").addEventListener('click', () => midRight.clickAction());

    document.querySelector("#botLeft").addEventListener('click', () => botLeft.clickAction());
    document.querySelector("#botMid").addEventListener('click', () => botMid.clickAction());
    document.querySelector("#botRight").addEventListener('click', () => botRight.clickAction());
}

function ending(winningPlayer){
    document.querySelector(".mainDiv").style.display = "none";
    document.querySelector(".endScreen").style.display = "flex";
    if(winningPlayer === "Draw"){
        document.querySelector(".endScreen > h1").innerHTML = winningPlayer;
    } else {
        document.querySelector(".endScreen > h1").innerHTML = winningPlayer + " win!!!";
    }
}

function ifEnd(winningPlayer){

    /* === HORIZONTAL === */
    if(topLeft.typeOfCheck === winningPlayer && topMid.typeOfCheck === winningPlayer && topRight.typeOfCheck === winningPlayer){
        ending(winningPlayer);
    } else if(midLeft.typeOfCheck === winningPlayer && midMid.typeOfCheck === winningPlayer && midRight.typeOfCheck === winningPlayer){
        ending(winningPlayer);
    } else if(botLeft.typeOfCheck === winningPlayer && botMid.typeOfCheck === winningPlayer && botRight.typeOfCheck === winningPlayer){
        ending(winningPlayer);
    } 
    /* === VERTICAL === */
    else if(topLeft.typeOfCheck === winningPlayer && midLeft.typeOfCheck === winningPlayer && botLeft.typeOfCheck === winningPlayer){
        ending(winningPlayer);
    } else if(topMid.typeOfCheck === winningPlayer && midMid.typeOfCheck === winningPlayer && botMid.typeOfCheck === winningPlayer){
        ending(winningPlayer);
    } else if(topRight.typeOfCheck === winningPlayer && midRight.typeOfCheck === winningPlayer && botRight.typeOfCheck === winningPlayer){
        ending(winningPlayer);
    }
    /* === SLANT === */
    else if(topRight.typeOfCheck === winningPlayer && midMid.typeOfCheck === winningPlayer && botLeft.typeOfCheck === winningPlayer){
        ending(winningPlayer);
    } else if(topLeft.typeOfCheck === winningPlayer && midMid.typeOfCheck === winningPlayer && botRight.typeOfCheck === winningPlayer){
        ending(winningPlayer);
    } 
    /* === DRAW ===*/
    else if(
        topLeft.typeOfCheck != "none" && topMid.typeOfCheck != "none" && topRight.typeOfCheck != "none" &&
        midLeft.typeOfCheck != "none" && midMid.typeOfCheck != "none" && midRight.typeOfCheck != "none" &&
        botLeft.typeOfCheck != "none" && botMid.typeOfCheck != "none" && botRight.typeOfCheck != "none" 
    ){
        ending("Draw");
    }

}

document.querySelector(".playAgain").addEventListener("click", fullRestart);

let turnOrder = "square";

generateFields();