const container = document.querySelector('.container')
const grid = document.createElement('div')
grid.classList.add('grid')
container.appendChild(grid)
let rows = 4
let columns = 8

// 15 rows
// 33 columns
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

function moveBasketKeyboard(e){
    e.preventDefault()
    console.log(e.keyCode)
    switch (e.keyCode){
        //left
        case 37:
            if (basketCurrentPosition > (columns * rows) - columns ){
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
addEventListener('keydown',moveBasketKeyboard)
addEventListener('load', moveBasketWithGestures)

 

  
  function moveBasketWithGestures() {
    if (basketCurrentPosition > (columns * rows) - columns -1 &&
        basketCurrentPosition < (columns * rows) - 1) {      
        updateMove();
    
    } 
    
      
  
    requestInterval = setInterval(updateMove, 100);
  }
  let previous_quantity = null
  async function updateMove() {
    try {
      let response = await response_handler();
      response = response.split(',')
      let position = response[0]
      let quantity_fingers = parseInt(response[1])
      
      
      console.log(position,basketCurrentPosition, 'quantity_fingers', quantity_fingers)
      
      if(position == 'Left' 
      && (basketCurrentPosition - quantity_fingers) > (rows * columns) - columns -1
      &&  previous_quantity != quantity_fingers){
        squares[basketCurrentPosition].classList.remove('basket');
        basketCurrentPosition -= quantity_fingers ;
        squares[basketCurrentPosition].classList.add('basket');
        previous_quantity = quantity_fingers
      }
    
      if(position == 'Right'    
      &&(basketCurrentPosition + quantity_fingers) < rows * columns -1 
      && previous_quantity != quantity_fingers){       
        squares[basketCurrentPosition].classList.remove('basket');
        basketCurrentPosition += quantity_fingers ;
        squares[basketCurrentPosition].classList.add('basket');
        previous_quantity = quantity_fingers
        
      }
   
      // Agora você pode usar a resposta aqui
    } catch (erro) {
      console.error(erro);
      // Lide com o erro aqui
    }
  }
  
function toKeepApple() {
  
    if(appleCurrentPosition === basketCurrentPosition){
        squares[appleCurrentPosition].classList.remove('apple')
        squares[basketCurrentPosition].classList.add('basket')
        endGame('won')
    }
    
}
function fallApple() {
    if (appleCurrentPosition < columns * (rows - 1)) { 
        squares[appleCurrentPosition].classList.remove('apple');
        appleCurrentPosition += columns; 
        squares[appleCurrentPosition].classList.add('apple');
        toKeepApple() 
       
    } else {
     
        endGame('lost')
    }   
}

function endGame(status) {
   let cardEndGame;
    setTimeout(()=>{
      container.innerHTML  = ''
      cardEndGame = document.createElement('h2')
      container.appendChild(cardEndGame)
      if(status == 'won'){
        cardEndGame.innerText = 'Você Ganhou'
        clearInterval(appleInterval)
        clearInterval(requestInterval)
    }
    else{
        cardEndGame.innerText = 'Voce Perdeu'
        clearInterval(appleInterval)
        clearInterval(requestInterval)
    }
    setTimeout(() => {
        document.location.reload() 
     }, 4000);
    },1000) 
   
   

 }



const appleInterval = setInterval(fallApple, 5000)


async function response_handler() {
    try {
      const response = await fetch('http://192.168.0.113:5000/get_direction');
      
      if (!response.ok) {
        throw new Error('Erro na requisição: ' + response.status);
      }
      
      const data = await response.text();
      return data;
    } catch (error) {
      throw error;
    }
  }  



