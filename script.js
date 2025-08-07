const btn_start = document.querySelector(".btn-start")
const board = document.querySelector(".board")

btn_start.addEventListener("click",function(){
    btn_start.style.display = "none"
    board.style.display = "grid"
    createBoard()
})

let firstCard = null
let secondCard = null
let lockBoard = false

let arrImages = []
for (let i = 1; i <= 15; i++){
    arrImages.push(`src/${i}.jpg`)
}

let cardImages = [...arrImages, ...arrImages]

function random (array){
    return array.sort(()=>Math.random()-0.5)
}

function createBoard(){
    board.innerHTML = ""
    let randomCard = random(cardImages)

    randomCard.forEach((img, index) => {
    let card = document.createElement("div")
    card.classList.add("card")
    card.dataset.image = img

    let image = document.createElement("img")
    image.src = img
    card.appendChild(image)

    card.addEventListener("click", cardClick)
    board.appendChild(card)
});
}             





function cardClick(){
    if(lockBoard || this === firstCard || this.classList.contains("open")) return
    this.classList.add("open")

    if(!firstCard){
        firstCard = this
    }else {
        secondCard = this
        lockBoard = true
        checkCards()
    }
}

function checkCards(){
    let check = firstCard.dataset.image === secondCard.dataset.image
    if (check){
        setTimeout(()=>{
            firstCard.classList.add("close")
            secondCard.classList.add("close")
            reset_turn()

        //проверка завершения игры
        if (document.querySelectorAll(".close").length === cardImages.length){
            setTimeout(()=>{
             alert("Игра окончена!")
             location.reload()   
            },1000)
        }
        },500)
    }else {
        setTimeout(()=>{
            firstCard.classList.remove("open")
            secondCard.classList.remove("open")
            reset_turn()
        },1000)
    }
}

function reset_turn (){
    firstCard = null
    secondCard = null
    lockBoard = false 
}