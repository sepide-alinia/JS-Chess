

const gameBoard = document.querySelector('#gameBoard')
const playerDisplay = document.querySelector('#player')
const infoDisplay = document.querySelector('#info-display')
const turnDisplay = document.querySelector('#turn')

const width = 8

let playerGo = 'black'


playerDisplay.textContent = 'black'

const startPieces =[
    rook,knight,bishop,king,queen,bishop,knight,rook,
    pawn,pawn,pawn,pawn,pawn,pawn,pawn,pawn,
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    pawn,pawn,pawn,pawn,pawn,pawn,pawn,pawn,
    rook,knight,bishop,king,queen,bishop,knight,rook]


function creatBoard(){
startPieces.forEach((startPiece, i)=>{


    const svg = document.ge
    const square = document.createElement('div')
    square.setAttribute('class','square')
    square.innerHTML = startPiece
    square.firstChild?.setAttribute('draggable',true)
    square.setAttribute('square-id',i)
    const row = Math.floor((63 - i) /8) + 1
    if(row % 2 === 0){
        square.classList.add(i % 2 === 0 ? "silver" : "grey" )
    }else{
        square.classList.add(i % 2 === 0 ? "grey" : "silver" )
    }

    if( i <= 15){
        square.firstChild.firstChild.setAttribute('class','black')
    }else if (i >=48){
        square.firstChild.firstChild.setAttribute('class','white')
    }




    gameBoard.appendChild(square)
})
}
// button.addEventListener('click',creatBoard)

creatBoard()


const allSquares = document.querySelectorAll(".square")
allSquares.forEach(square => {
    square.addEventListener('dragstart', dragStart)
    square.addEventListener('dragover', dragOver)
    square.addEventListener('drop', dragDrop)
})


let startPositionId;
let draggedElement;

function dragStart(e){

    startPositionId= e.target.parentNode.getAttribute('square-id')
    draggedElement = e.target
}

function dragOver(e){
    e.preventDefault()
}

function dragDrop(e){
    e.stopPropagation()

    const correctGo=draggedElement.firstChild.classList.contains(playerGo)
    const taken = e.target.classList.contains('piece')
    const valid = checkIfValid(e.target)
    const opponentGo= playerGo=== 'white'? 'black': 'white'
    const takenByOpponent = e.target.firstChild?.classList.contains(opponentGo)

    if(correctGo){
        if(takenByOpponent && valid){
                e.target.parentNode.append(draggedElement)
                e.target.remove()
                checkForWin()
                changePlayer()
                return
        }

        if (taken && !takenByOpponent){

            return
        }
        if (valid) {
            e.target.append(draggedElement)
            checkForWin()
            changePlayer()
            return
        }
    }


    // e.target.append(draggedElement)

}


function checkIfValid(target){
    const targetId = Number( target.getAttribute('square-id') )|| Number(target.parentNode.getAttribute('square-id'))
    const startId = Number(startPositionId)
    const piece = draggedElement.id
    console.log(targetId)


switch(piece){
        case 'pawn':

            const starterRow = [8,9,10,11,12,13,14,15]
            if(
               starterRow.includes(startId) && startId + width * 2 === targetId ||
               startId + width == targetId ||
               startId+ width - 1 ===targetId && document.querySelector(`[square-id="${startId+ width - 1 }"]`).firstChild ||
               startId+ width + 1 === targetId && document.querySelector(`[square-id="${startId+ width + 1 }"]`).firstChild
            ){
            return true
             }
         break;


        case 'knight':
            if (
                startId+ width*2 - 1 ===targetId ||
                startId+ width*2 + 1 ===targetId ||
                startId+width -2 ===targetId ||
                startId+width +2 ===targetId ||
                startId-width -2 ===targetId ||
                startId-width +2 ===targetId
            ){
            return true
            }break;
        case 'bishop':
            if(
                startId + width +1 === targetId ||
                startId + width*2 +2 === targetId && !document.querySelector(`[square-id='${startId + width +1}']`).firstChild||
                startId + width*3 +3 === targetId && !document.querySelector(`[square-id='${startId + width +1}']`).firstChild && !document.querySelector(`[square-id='${startId + width*2 +2}']`).firstChild ||
                startId + width*4 +4 === targetId && !document.querySelector(`[square-id='${startId + width +1}']`).firstChild && !document.querySelector(`[square-id='${startId + width*2 +2}']`).firstChild && !document.querySelector(`[square-id='${startId + width*3 +3}']`).firstChild ||
                startId + width*5 +5 === targetId && !document.querySelector(`[square-id='${startId + width +1}']`).firstChild && !document.querySelector(`[square-id='${startId + width*2 +2}']`).firstChild && !document.querySelector(`[square-id='${startId + width*3 +3}']`).firstChild && !document.querySelector(`[square-id='${startId + width*4 +4}']`).firstChild||
                startId + width*6 +6 === targetId && !document.querySelector(`[square-id='${startId + width +1}']`).firstChild && !document.querySelector(`[square-id='${startId + width*2 +2}']`).firstChild && !document.querySelector(`[square-id='${startId + width*3 +3}']`).firstChild && !document.querySelector(`[square-id='${startId + width*4 +4}']`).firstChild && !document.querySelector(`[square-id='${startId + width*5 +5}']`).firstChild||
                startId + width*7 +7 === targetId && !document.querySelector(`[square-id='${startId + width +1}']`).firstChild && !document.querySelector(`[square-id='${startId + width*2 +2}']`).firstChild && !document.querySelector(`[square-id='${startId + width*3 +3}']`).firstChild && !document.querySelector(`[square-id='${startId + width*4 +4}']`).firstChild && !document.querySelector(`[square-id='${startId + width*5 +5}']`).firstChild && !document.querySelector(`[square-id='${startId + width*6 +6}']`).firstChild||

                startId - width -1 === targetId ||
                startId - width*2 - 2 === targetId && !document.querySelector(`[square-id='${startId - width - 1}']`).firstChild||
                startId - width*3 - 3 === targetId && !document.querySelector(`[square-id='${startId - width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width*2 -2}']`).firstChild ||
                startId - width*4 - 4 === targetId && !document.querySelector(`[square-id='${startId - width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width*2 -2}']`).firstChild && !document.querySelector(`[square-id='${startId - width*3 -3}']`).firstChild ||
                startId - width*5 - 5 === targetId && !document.querySelector(`[square-id='${startId - width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width*2 -2}']`).firstChild && !document.querySelector(`[square-id='${startId - width*3 -3}']`).firstChild && !document.querySelector(`[square-id='${startId - width*4 -4}']`).firstChild||
                startId - width*6 - 6 === targetId && !document.querySelector(`[square-id='${startId - width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width*2 -2}']`).firstChild && !document.querySelector(`[square-id='${startId - width*3 -3}']`).firstChild && !document.querySelector(`[square-id='${startId - width*4 -4}']`).firstChild && !document.querySelector(`[square-id='${startId - width*5 -5}']`).firstChild||
                startId - width*7 - 7 === targetId && !document.querySelector(`[square-id='${startId - width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width*2 -2}']`).firstChild && !document.querySelector(`[square-id='${startId - width*3 -3}']`).firstChild && !document.querySelector(`[square-id='${startId - width*4 -4}']`).firstChild && !document.querySelector(`[square-id='${startId - width*5 -5}']`).firstChild && !document.querySelector(`[square-id='${startId - width*6 -6}']`).firstChild||

                startId - width +1 === targetId ||
                startId - width*2 + 2 === targetId && !document.querySelector(`[square-id='${startId - width + 1}']`).firstChild||
                startId - width*3 + 3 === targetId && !document.querySelector(`[square-id='${startId - width + 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width*2 + 2}']`).firstChild ||
                startId - width*4 + 4 === targetId && !document.querySelector(`[square-id='${startId - width + 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width*2 + 2}']`).firstChild && !document.querySelector(`[square-id='${startId - width*3 +3}']`).firstChild ||
                startId - width*5 + 5 === targetId && !document.querySelector(`[square-id='${startId - width + 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width*2 + 2}']`).firstChild && !document.querySelector(`[square-id='${startId - width*3 +3}']`).firstChild && !document.querySelector(`[square-id='${startId - width*4 +4}']`).firstChild||
                startId - width*6 + 6 === targetId && !document.querySelector(`[square-id='${startId - width + 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width*2 + 2}']`).firstChild && !document.querySelector(`[square-id='${startId - width*3 +3}']`).firstChild && !document.querySelector(`[square-id='${startId - width*4 +4}']`).firstChild && !document.querySelector(`[square-id='${startId - width*5 +5}']`).firstChild||
                startId - width*7 + 7 === targetId && !document.querySelector(`[square-id='${startId - width + 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width*2 + 2}']`).firstChild && !document.querySelector(`[square-id='${startId - width*3 +3}']`).firstChild && !document.querySelector(`[square-id='${startId - width*4 +4}']`).firstChild && !document.querySelector(`[square-id='${startId - width*5 +5}']`).firstChild && !document.querySelector(`[square-id='${startId - width*6 + 6}']`).firstChild||

                startId + width -1 === targetId ||
                startId + width*2 - 2 === targetId && !document.querySelector(`[square-id='${startId + width - 1}']`).firstChild||
                startId + width*3 - 3 === targetId && !document.querySelector(`[square-id='${startId + width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId + width*2 -2}']`).firstChild ||
                startId + width*4 - 4 === targetId && !document.querySelector(`[square-id='${startId + width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId + width*2 -2}']`).firstChild && !document.querySelector(`[square-id='${startId + width*3 -3}']`).firstChild ||
                startId + width*5 - 5 === targetId && !document.querySelector(`[square-id='${startId + width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId + width*2 -2}']`).firstChild && !document.querySelector(`[square-id='${startId + width*3 -3}']`).firstChild && !document.querySelector(`[square-id='${startId + width*4 -4}']`).firstChild||
                startId + width*6 - 6 === targetId && !document.querySelector(`[square-id='${startId + width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId + width*2 -2}']`).firstChild && !document.querySelector(`[square-id='${startId + width*3 -3}']`).firstChild && !document.querySelector(`[square-id='${startId + width*4 -4}']`).firstChild && !document.querySelector(`[square-id='${startId + width*5 -5}']`).firstChild||
                startId + width*7 - 7 === targetId && !document.querySelector(`[square-id='${startId + width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId + width*2 -2}']`).firstChild && !document.querySelector(`[square-id='${startId + width*3 -3}']`).firstChild && !document.querySelector(`[square-id='${startId + width*4 -4}']`).firstChild && !document.querySelector(`[square-id='${startId + width*5 -5}']`).firstChild && !document.querySelector(`[square-id='${startId + width*6 -6}']`).firstChild
            ){
            return true
            }break;

        case 'rook':
            if(
                startId + width === targetId ||
                startId + width * 2 === targetId && !document.querySelector(`[square-id='${startId + width}']`).firstChild ||
                startId + width * 3 === targetId && !document.querySelector(`[square-id='${startId + width}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2}']`).firstChild ||
                startId + width * 4 === targetId && !document.querySelector(`[square-id='${startId + width}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2}']`).firstChild &&  !document.querySelector(`[square-id='${startId + width * 3}']`).firstChild||
                startId + width * 5 === targetId && !document.querySelector(`[square-id='${startId + width}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2}']`).firstChild &&  !document.querySelector(`[square-id='${startId + width * 3}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 4}']`).firstChild ||
                startId + width * 6 === targetId && !document.querySelector(`[square-id='${startId + width}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2}']`).firstChild &&  !document.querySelector(`[square-id='${startId + width * 3}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 4}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 5}']`).firstChild  ||
                startId + width * 7 === targetId && !document.querySelector(`[square-id='${startId + width}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2}']`).firstChild &&  !document.querySelector(`[square-id='${startId + width * 3}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 4}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 5}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 6}']`).firstChild ||

                startId - width === targetId ||
                startId - width * 2 === targetId && !document.querySelector(`[square-id='${startId - width}']`).firstChild ||
                startId - width * 3 === targetId && !document.querySelector(`[square-id='${startId - width}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2}']`).firstChild ||
                startId - width * 4 === targetId && !document.querySelector(`[square-id='${startId - width}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2}']`).firstChild &&  !document.querySelector(`[square-id='${startId - width * 3}']`).firstChild||
                startId - width * 5 === targetId && !document.querySelector(`[square-id='${startId - width}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2}']`).firstChild &&  !document.querySelector(`[square-id='${startId - width * 3}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 4}']`).firstChild ||
                startId - width * 6 === targetId && !document.querySelector(`[square-id='${startId - width}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2}']`).firstChild &&  !document.querySelector(`[square-id='${startId - width * 3}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 4}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 5}']`).firstChild  ||
                startId - width * 7 === targetId && !document.querySelector(`[square-id='${startId - width}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2}']`).firstChild &&  !document.querySelector(`[square-id='${startId - width * 3}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 4}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 5}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 6}']`).firstChild ||

                startId + 1 === targetId ||
                startId + 2 === targetId && !document.querySelector(`[square-id='${startId +1 }']`).firstChild ||
                startId + 3 === targetId && !document.querySelector(`[square-id='${startId +1 }']`).firstChild && !document.querySelector(`[square-id='${startId + 2}']`).firstChild ||
                startId + 4 === targetId && !document.querySelector(`[square-id='${startId +1 }']`).firstChild && !document.querySelector(`[square-id='${startId + 2}']`).firstChild &&  !document.querySelector(`[square-id='${startId + 3}']`).firstChild||
                startId + 5 === targetId && !document.querySelector(`[square-id='${startId +1 }']`).firstChild && !document.querySelector(`[square-id='${startId + 2}']`).firstChild &&  !document.querySelector(`[square-id='${startId + 3}']`).firstChild && !document.querySelector(`[square-id='${startId + 4}']`).firstChild ||
                startId + 6 === targetId && !document.querySelector(`[square-id='${startId +1 }']`).firstChild && !document.querySelector(`[square-id='${startId + 2}']`).firstChild &&  !document.querySelector(`[square-id='${startId + 3}']`).firstChild && !document.querySelector(`[square-id='${startId + 4}']`).firstChild && !document.querySelector(`[square-id='${startId + 5}']`).firstChild  ||
                startId + 7 === targetId && !document.querySelector(`[square-id='${startId +1 }']`).firstChild && !document.querySelector(`[square-id='${startId + 2}']`).firstChild &&  !document.querySelector(`[square-id='${startId + 3}']`).firstChild && !document.querySelector(`[square-id='${startId + 4}']`).firstChild && !document.querySelector(`[square-id='${startId + 5}']`).firstChild && !document.querySelector(`[square-id='${startId + 6}']`).firstChild ||

                startId - 1 === targetId ||
                startId - 2 === targetId && !document.querySelector(`[square-id='${startId - 1 }']`).firstChild ||
                startId - 3 === targetId && !document.querySelector(`[square-id='${startId - 1 }']`).firstChild && !document.querySelector(`[square-id='${startId - 2}']`).firstChild ||
                startId - 4 === targetId && !document.querySelector(`[square-id='${startId - 1 }']`).firstChild && !document.querySelector(`[square-id='${startId - 2}']`).firstChild &&  !document.querySelector(`[square-id='${startId - 3}']`).firstChild||
                startId - 5 === targetId && !document.querySelector(`[square-id='${startId - 1 }']`).firstChild && !document.querySelector(`[square-id='${startId - 2}']`).firstChild &&  !document.querySelector(`[square-id='${startId - 3}']`).firstChild && !document.querySelector(`[square-id='${startId - 4}']`).firstChild ||
                startId - 6 === targetId && !document.querySelector(`[square-id='${startId - 1 }']`).firstChild && !document.querySelector(`[square-id='${startId - 2}']`).firstChild &&  !document.querySelector(`[square-id='${startId - 3}']`).firstChild && !document.querySelector(`[square-id='${startId - 4}']`).firstChild && !document.querySelector(`[square-id='${startId - 5}']`).firstChild  ||
                startId - 7 === targetId && !document.querySelector(`[square-id='${startId - 1 }']`).firstChild && !document.querySelector(`[square-id='${startId - 2}']`).firstChild &&  !document.querySelector(`[square-id='${startId - 3}']`).firstChild && !document.querySelector(`[square-id='${startId - 4}']`).firstChild && !document.querySelector(`[square-id='${startId - 5}']`).firstChild && !document.querySelector(`[square-id='${startId - 6}']`).firstChild
            ){
            return true
            }
            break;

        case 'queen':
            if(
                startId + width +1 === targetId ||
                startId + width*2 +2 === targetId && !document.querySelector(`[square-id='${startId + width +1}']`).firstChild||
                startId + width*3 +3 === targetId && !document.querySelector(`[square-id='${startId + width +1}']`).firstChild && !document.querySelector(`[square-id='${startId + width*2 +2}']`).firstChild ||
                startId + width*4 +4 === targetId && !document.querySelector(`[square-id='${startId + width +1}']`).firstChild && !document.querySelector(`[square-id='${startId + width*2 +2}']`).firstChild && !document.querySelector(`[square-id='${startId + width*3 +3}']`).firstChild ||
                startId + width*5 +5 === targetId && !document.querySelector(`[square-id='${startId + width +1}']`).firstChild && !document.querySelector(`[square-id='${startId + width*2 +2}']`).firstChild && !document.querySelector(`[square-id='${startId + width*3 +3}']`).firstChild && !document.querySelector(`[square-id='${startId + width*4 +4}']`).firstChild||
                startId + width*6 +6 === targetId && !document.querySelector(`[square-id='${startId + width +1}']`).firstChild && !document.querySelector(`[square-id='${startId + width*2 +2}']`).firstChild && !document.querySelector(`[square-id='${startId + width*3 +3}']`).firstChild && !document.querySelector(`[square-id='${startId + width*4 +4}']`).firstChild && !document.querySelector(`[square-id='${startId + width*5 +5}']`).firstChild||
                startId + width*7 +7 === targetId && !document.querySelector(`[square-id='${startId + width +1}']`).firstChild && !document.querySelector(`[square-id='${startId + width*2 +2}']`).firstChild && !document.querySelector(`[square-id='${startId + width*3 +3}']`).firstChild && !document.querySelector(`[square-id='${startId + width*4 +4}']`).firstChild && !document.querySelector(`[square-id='${startId + width*5 +5}']`).firstChild && !document.querySelector(`[square-id='${startId + width*6 +6}']`).firstChild||

                startId - width -1 === targetId ||
                startId - width*2 - 2 === targetId && !document.querySelector(`[square-id='${startId - width - 1}']`).firstChild||
                startId - width*3 - 3 === targetId && !document.querySelector(`[square-id='${startId - width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width*2 -2}']`).firstChild ||
                startId - width*4 - 4 === targetId && !document.querySelector(`[square-id='${startId - width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width*2 -2}']`).firstChild && !document.querySelector(`[square-id='${startId - width*3 -3}']`).firstChild ||
                startId - width*5 - 5 === targetId && !document.querySelector(`[square-id='${startId - width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width*2 -2}']`).firstChild && !document.querySelector(`[square-id='${startId - width*3 -3}']`).firstChild && !document.querySelector(`[square-id='${startId - width*4 -4}']`).firstChild||
                startId - width*6 - 6 === targetId && !document.querySelector(`[square-id='${startId - width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width*2 -2}']`).firstChild && !document.querySelector(`[square-id='${startId - width*3 -3}']`).firstChild && !document.querySelector(`[square-id='${startId - width*4 -4}']`).firstChild && !document.querySelector(`[square-id='${startId - width*5 -5}']`).firstChild||
                startId - width*7 - 7 === targetId && !document.querySelector(`[square-id='${startId - width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width*2 -2}']`).firstChild && !document.querySelector(`[square-id='${startId - width*3 -3}']`).firstChild && !document.querySelector(`[square-id='${startId - width*4 -4}']`).firstChild && !document.querySelector(`[square-id='${startId - width*5 -5}']`).firstChild && !document.querySelector(`[square-id='${startId - width*6 -6}']`).firstChild||

                startId - width +1 === targetId ||
                startId - width*2 + 2 === targetId && !document.querySelector(`[square-id='${startId - width + 1}']`).firstChild||
                startId - width*3 + 3 === targetId && !document.querySelector(`[square-id='${startId - width + 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width*2 + 2}']`).firstChild ||
                startId - width*4 + 4 === targetId && !document.querySelector(`[square-id='${startId - width + 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width*2 + 2}']`).firstChild && !document.querySelector(`[square-id='${startId - width*3 +3}']`).firstChild ||
                startId - width*5 + 5 === targetId && !document.querySelector(`[square-id='${startId - width + 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width*2 + 2}']`).firstChild && !document.querySelector(`[square-id='${startId - width*3 +3}']`).firstChild && !document.querySelector(`[square-id='${startId - width*4 +4}']`).firstChild||
                startId - width*6 + 6 === targetId && !document.querySelector(`[square-id='${startId - width + 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width*2 + 2}']`).firstChild && !document.querySelector(`[square-id='${startId - width*3 +3}']`).firstChild && !document.querySelector(`[square-id='${startId - width*4 +4}']`).firstChild && !document.querySelector(`[square-id='${startId - width*5 +5}']`).firstChild||
                startId - width*7 + 7 === targetId && !document.querySelector(`[square-id='${startId - width + 1}']`).firstChild && !document.querySelector(`[square-id='${startId - width*2 + 2}']`).firstChild && !document.querySelector(`[square-id='${startId - width*3 +3}']`).firstChild && !document.querySelector(`[square-id='${startId - width*4 +4}']`).firstChild && !document.querySelector(`[square-id='${startId - width*5 +5}']`).firstChild && !document.querySelector(`[square-id='${startId - width*6 + 6}']`).firstChild||

                startId + width -1 === targetId ||
                startId + width*2 - 2 === targetId && !document.querySelector(`[square-id='${startId + width - 1}']`).firstChild||
                startId + width*3 - 3 === targetId && !document.querySelector(`[square-id='${startId + width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId + width*2 -2}']`).firstChild ||
                startId + width*4 - 4 === targetId && !document.querySelector(`[square-id='${startId + width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId + width*2 -2}']`).firstChild && !document.querySelector(`[square-id='${startId + width*3 -3}']`).firstChild ||
                startId + width*5 - 5 === targetId && !document.querySelector(`[square-id='${startId + width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId + width*2 -2}']`).firstChild && !document.querySelector(`[square-id='${startId + width*3 -3}']`).firstChild && !document.querySelector(`[square-id='${startId + width*4 -4}']`).firstChild||
                startId + width*6 - 6 === targetId && !document.querySelector(`[square-id='${startId + width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId + width*2 -2}']`).firstChild && !document.querySelector(`[square-id='${startId + width*3 -3}']`).firstChild && !document.querySelector(`[square-id='${startId + width*4 -4}']`).firstChild && !document.querySelector(`[square-id='${startId + width*5 -5}']`).firstChild||
                startId + width*7 - 7 === targetId && !document.querySelector(`[square-id='${startId + width - 1}']`).firstChild && !document.querySelector(`[square-id='${startId + width*2 -2}']`).firstChild && !document.querySelector(`[square-id='${startId + width*3 -3}']`).firstChild && !document.querySelector(`[square-id='${startId + width*4 -4}']`).firstChild && !document.querySelector(`[square-id='${startId + width*5 -5}']`).firstChild && !document.querySelector(`[square-id='${startId + width*6 -6}']`).firstChild||

                startId + width === targetId ||
                startId + width * 2 === targetId && !document.querySelector(`[square-id='${startId + width}']`).firstChild ||
                startId + width * 3 === targetId && !document.querySelector(`[square-id='${startId + width}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2}']`).firstChild ||
                startId + width * 4 === targetId && !document.querySelector(`[square-id='${startId + width}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2}']`).firstChild &&  !document.querySelector(`[square-id='${startId + width * 3}']`).firstChild||
                startId + width * 5 === targetId && !document.querySelector(`[square-id='${startId + width}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2}']`).firstChild &&  !document.querySelector(`[square-id='${startId + width * 3}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 4}']`).firstChild ||
                startId + width * 6 === targetId && !document.querySelector(`[square-id='${startId + width}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2}']`).firstChild &&  !document.querySelector(`[square-id='${startId + width * 3}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 4}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 5}']`).firstChild  ||
                startId + width * 7 === targetId && !document.querySelector(`[square-id='${startId + width}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 2}']`).firstChild &&  !document.querySelector(`[square-id='${startId + width * 3}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 4}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 5}']`).firstChild && !document.querySelector(`[square-id='${startId + width * 6}']`).firstChild ||

                startId - width === targetId ||
                startId - width * 2 === targetId && !document.querySelector(`[square-id='${startId - width}']`).firstChild ||
                startId - width * 3 === targetId && !document.querySelector(`[square-id='${startId - width}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2}']`).firstChild ||
                startId - width * 4 === targetId && !document.querySelector(`[square-id='${startId - width}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2}']`).firstChild &&  !document.querySelector(`[square-id='${startId - width * 3}']`).firstChild||
                startId - width * 5 === targetId && !document.querySelector(`[square-id='${startId - width}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2}']`).firstChild &&  !document.querySelector(`[square-id='${startId - width * 3}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 4}']`).firstChild ||
                startId - width * 6 === targetId && !document.querySelector(`[square-id='${startId - width}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2}']`).firstChild &&  !document.querySelector(`[square-id='${startId - width * 3}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 4}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 5}']`).firstChild  ||
                startId - width * 7 === targetId && !document.querySelector(`[square-id='${startId - width}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 2}']`).firstChild &&  !document.querySelector(`[square-id='${startId - width * 3}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 4}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 5}']`).firstChild && !document.querySelector(`[square-id='${startId - width * 6}']`).firstChild ||

                startId + 1 === targetId ||
                startId + 2 === targetId && !document.querySelector(`[square-id='${startId +1 }']`).firstChild ||
                startId + 3 === targetId && !document.querySelector(`[square-id='${startId +1 }']`).firstChild && !document.querySelector(`[square-id='${startId + 2}']`).firstChild ||
                startId + 4 === targetId && !document.querySelector(`[square-id='${startId +1 }']`).firstChild && !document.querySelector(`[square-id='${startId + 2}']`).firstChild &&  !document.querySelector(`[square-id='${startId + 3}']`).firstChild||
                startId + 5 === targetId && !document.querySelector(`[square-id='${startId +1 }']`).firstChild && !document.querySelector(`[square-id='${startId + 2}']`).firstChild &&  !document.querySelector(`[square-id='${startId + 3}']`).firstChild && !document.querySelector(`[square-id='${startId + 4}']`).firstChild ||
                startId + 6 === targetId && !document.querySelector(`[square-id='${startId +1 }']`).firstChild && !document.querySelector(`[square-id='${startId + 2}']`).firstChild &&  !document.querySelector(`[square-id='${startId + 3}']`).firstChild && !document.querySelector(`[square-id='${startId + 4}']`).firstChild && !document.querySelector(`[square-id='${startId + 5}']`).firstChild  ||
                startId + 7 === targetId && !document.querySelector(`[square-id='${startId +1 }']`).firstChild && !document.querySelector(`[square-id='${startId + 2}']`).firstChild &&  !document.querySelector(`[square-id='${startId + 3}']`).firstChild && !document.querySelector(`[square-id='${startId + 4}']`).firstChild && !document.querySelector(`[square-id='${startId + 5}']`).firstChild && !document.querySelector(`[square-id='${startId + 6}']`).firstChild ||

                startId - 1 === targetId ||
                startId - 2 === targetId && !document.querySelector(`[square-id='${startId - 1 }']`).firstChild ||
                startId - 3 === targetId && !document.querySelector(`[square-id='${startId - 1 }']`).firstChild && !document.querySelector(`[square-id='${startId - 2}']`).firstChild ||
                startId - 4 === targetId && !document.querySelector(`[square-id='${startId - 1 }']`).firstChild && !document.querySelector(`[square-id='${startId - 2}']`).firstChild &&  !document.querySelector(`[square-id='${startId - 3}']`).firstChild||
                startId - 5 === targetId && !document.querySelector(`[square-id='${startId - 1 }']`).firstChild && !document.querySelector(`[square-id='${startId - 2}']`).firstChild &&  !document.querySelector(`[square-id='${startId - 3}']`).firstChild && !document.querySelector(`[square-id='${startId - 4}']`).firstChild ||
                startId - 6 === targetId && !document.querySelector(`[square-id='${startId - 1 }']`).firstChild && !document.querySelector(`[square-id='${startId - 2}']`).firstChild &&  !document.querySelector(`[square-id='${startId - 3}']`).firstChild && !document.querySelector(`[square-id='${startId - 4}']`).firstChild && !document.querySelector(`[square-id='${startId - 5}']`).firstChild  ||
                startId - 7 === targetId && !document.querySelector(`[square-id='${startId - 1 }']`).firstChild && !document.querySelector(`[square-id='${startId - 2}']`).firstChild &&  !document.querySelector(`[square-id='${startId - 3}']`).firstChild && !document.querySelector(`[square-id='${startId - 4}']`).firstChild && !document.querySelector(`[square-id='${startId - 5}']`).firstChild && !document.querySelector(`[square-id='${startId - 6}']`).firstChild
            ){
            return true
            }
            break;

        case 'king':
            if(
                startId + 1 === targetId ||
                startId - 1 === targetId ||
                startId + width === targetId ||
                startId - width === targetId ||
                startId + width - 1 === targetId ||
                startId + width + 1 === targetId ||
                startId - width - 1 === targetId ||
                startId - width + 1 === targetId
            ){
                return true
            }

    }


}

function changePlayer() {
if (playerGo==='black') {
    reverseId()
    playerGo='white'
    playerDisplay.textContent = 'white'
}else{
    revertId()
    playerGo='black'
    playerDisplay.textContent = 'black'
}
}

function reverseId() {
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square,i)=>
    square.setAttribute('square-id',(width*width-1)-i)
    )

}

function revertId(){
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square,i)=>square.setAttribute('square-id',i)
    )
}


function checkForWin (){
    const kings = Array.from(document.querySelectorAll('#king'))
    if(!kings.some(king =>king.firstChild.classList.contains('white'))){
        infoDisplay.innerHTML = 'black player wins!'
        turnDisplay.innerHTML = ''
        const allSquares = document.querySelectorAll('.square')
        allSquares.forEach(square => square.firstChild?.setAttribute('draggable',false))
    }
    if(!kings.some(king =>king.firstChild.classList.contains('black'))){
        infoDisplay.innerHTML = 'white player wins!'
        turnDisplay.innerHTML = ''
        const allSquares = document.querySelectorAll('.square')
        allSquares.forEach(square => square.firstChild?.setAttribute('draggable',false))
    }
}
