let boxes=document.querySelectorAll('.box');
let reset=document.querySelector('#reset');
let newGame=document.querySelector('#new');
let msgContainer=document.querySelector('.msg-container');
let msg=document.querySelector('#msg');
let turnInfo = document.querySelector('#turn-info');
let resetScoreBtn = document.querySelector('#reset-score');


let oScore = 0;
let xScore = 0;
let drawScore = 0;

let oScoreEl = document.querySelector('#o-score');
let xScoreEl = document.querySelector('#x-score');
let drawScoreEl = document.querySelector('#draw-score');


let turn0=true;
const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame=()=>{
    turn0=true;
    enableBtns();
    msgContainer.classList.add('hide');
    turnInfo.innerText = "Turn: O";

}

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        
        if(turn0){
            box.innerText="O";
            box.classList.add("o-mark");
            turn0=false;
            turnInfo.innerText = "Turn: X";
        }
        else{
            box.innerText="X";
            box.classList.add("x-mark");
            turn0=true;
            turnInfo.innerText = "Turn: O";
        }
        box.disabled=true;
        checkWinner();
    });
});

const disableBtns=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const enableBtns=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
         box.classList.remove("o-mark", "x-mark", "winner-box");
        
    }
};

const showWinner=(winner,pattern)=>{
    msg.innerText=`Congratulations,Winner is ${winner}`;
    msgContainer.classList.remove('hide');
    if (winner === "O") {
        oScore++;
        oScoreEl.innerText = oScore;
    } else if (winner === "X") {
        xScore++;
        xScoreEl.innerText = xScore;
    }
    // highlight winning boxes
    pattern.forEach((index) => {
        boxes[index].classList.add("winner-box");
    });
    disableBtns();
};

const checkWinner=()=>{
    let winnerFound=false;
    for( let pattern of winPatterns){
        console.log(pattern[0],pattern[1],pattern[2]);
        console.log(boxes[pattern[0]].innerText,boxes[pattern[1]].innerText,boxes[pattern[2]].innerText);
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;

        if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
            if(pos1Val==pos2Val && pos2Val==pos3Val){
                console.log("winner",pos1Val);
                showWinner(pos1Val,pattern);
                winnerFound=true;
                return;
            }
        }
    }

    // if no winner and all boxes filled => draw
    if(!winnerFound){
        let allFilled=true;
        boxes.forEach((box) => {
            if(box.innerText==="") allFilled=false;
        });

        if(allFilled){
            drawScore++;
            drawScoreEl.innerText = drawScore;
            msg.innerText=`It's a Draw!`;
            msgContainer.classList.remove('hide');
            disableBtns();
        }
    }
};

newGame.addEventListener('click',resetGame);
reset.addEventListener('click',resetGame);
resetScoreBtn.addEventListener('click', () => {
    oScore = 0;
    xScore = 0;
    drawScore = 0;
    oScoreEl.innerText = oScore;
    xScoreEl.innerText = xScore;
    drawScoreEl.innerText = drawScore;
});
