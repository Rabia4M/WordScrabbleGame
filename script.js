import words from "./word.js"

const wordText = document.querySelector(".word");
const hintText  = document.querySelector(".hint span");// span since Hint: is static but the hint part in span is dynamic
const refreshBtn = document.querySelector(".refresh-word");
const checkBtn = document.querySelector(".check-word");
const inputField = document.querySelector("input");
const timeText = document.querySelector(".time span b");

let selectedWord,timer;

const initTime=(maxtime)=>{
    clearInterval(timer);
    timer=setInterval(()=>{
        if(maxtime>0){
            maxtime--;
            timeText.innerHTML=maxtime;
            return;
        }
        alert(`Time's Up! The correct answer was ${selectedWord}.`);
        clearInterval(timer);
        initGame();

    },1000);//set for 1 sec interval = 1000ms
}

const initGame=()=>{

    initTime(30);//arg 30 is for max time
    const randomobj = words[Math.floor(Math.random()* words.length)];
    selectedWord=randomobj.word;
    const hint=randomobj.hint;

    const wordArray=selectedWord.split("");
    for(let i=wordArray.length-1;i>0;i--){
        let j=Math.floor(Math.random()*(i+1));
        let temp=wordArray[i];
        wordArray[i]=wordArray[j];
        wordArray[j]=temp;
    }
    wordText.innerHTML=wordArray.join("");
    hintText.innerHTML=hint;
    inputField.value="";

    console.log(randomobj);
    console.log(selectedWord);
    console.log(hint);
    console.log(wordArray);
}

const checkWord=()=>{
    let userWord = inputField.value.toLowerCase();
    console.log(userWord);

    if(!userWord){ return alert("Please enter your guess");}

    if(userWord !== selectedWord){ return alert("Oops Wrong Answer!")}

    alert("Correct Answer!")
    initGame();
    
}
checkBtn.addEventListener("click",checkWord);


refreshBtn.addEventListener("click",initGame);


initGame();