const container = document.querySelector('.container')
const grid = document.createElement('div')
grid.classList.add('grid')
container.appendChild(grid)
let rows = 4
let columns = 8
let squares = []

function createBoard(){
    for(let i = 0 ; i< rows * columns; i++ ){
        const square = document.createElement('div')
        square.classList.add('square')
        grid.appendChild(square)
        squares.push(square)                
    }

}
createBoard()

let appleCurrentPosition =  Math.floor(Math.random() * 8);
squares[appleCurrentPosition].classList.add('apple')
let basketCurrentPosition = 27
squares[basketCurrentPosition].classList.add('basket') 

function moveBasket(e){
    e.preventDefault()
    console.log(e.keyCode)
    switch (e.keyCode){
        //left
        case 37:
            if (basketCurrentPosition > columns * rows - columns ){
                squares[basketCurrentPosition].classList.remove('basket')
                basketCurrentPosition -= 1
                squares[basketCurrentPosition].classList.add('basket')
            
            }
        break
        //right
        case 39:
            if(basketCurrentPosition < (columns * rows)-1) {
                squares[basketCurrentPosition].classList.remove('basket')
                basketCurrentPosition += 1
                squares[basketCurrentPosition].classList.add('basket')
                
            }
    }

} 
addEventListener('keydown',moveBasket)
function keepApple() {
  
    if(appleCurrentPosition === basketCurrentPosition){
        squares[appleCurrentPosition].classList.remove('apple')
        squares[basketCurrentPosition].classList.add('basket')
        endGame('won')
    }    
}

const appleInterval = setInterval(fallApple, 1000)

function fallApple() {
    if (appleCurrentPosition < columns * (rows - 1)) { 
        squares[appleCurrentPosition].classList.remove('apple');
        appleCurrentPosition += columns; 
        squares[appleCurrentPosition].classList.add('apple');
        keepApple() 
       
    } else {
     
        endGame('lost')
    }   
}
function endGame(status) {
    container.innerHTML  = ''
    const cardEndGame = document.createElement('h2')
    container.appendChild(cardEndGame)
    if(status == 'won'){
        cardEndGame.innerText = 'Você Ganhou'
        clearInterval(appleInterval)
    }
    else{
        cardEndGame.innerText = 'Voce Perdeu'
        clearInterval(appleInterval)
    }

}


 




