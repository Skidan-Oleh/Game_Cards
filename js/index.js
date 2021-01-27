const cards = document.querySelectorAll(".game-card");
// console.log(cards, 'Cards');

let hasFlippedCard = false;
let boardLocked = false;
let firstCard, secondCard;

const flipCard = e => {
    if (boardLocked) return;

    const target = e.target.parentElement;

    if (target === firstCard) return;

    target.classList.add("flip");

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = target;
    } else {
        hasFlippedCard = false;
        secondCard = target;

        setTimeout(()=> {
            checkForMatch();
        }, 0)
        
    }
};

const checkForMatch = () => {
    const isEqual = firstCard.dataset.framework === secondCard.dataset.framework;

    // if (firstCard.dataset.framework === secondCard.dataset.framework) {
    //     disableCards();
    // } else {
    //     unflipCards();
    // }

    isEqual ? disableCards() : unflipCards();
};

const disableCards = () => {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
};

const unflipCards = () => {
    boardLocked = true;


    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard()
    }, 500);
};

const resetBoard = () => {
    // [hasFlippedCard, boardLocked] = [false, false];
    // [firstCard, secondCard] = [null, null];

    hasFlippedCard = boardLocked = false;
    firstCard = secondCard = null;
};

function createGame(allCards) {
    allCards.forEach(card => {
        card.addEventListener('click', flipCard);
    
        const randomIndex = Math.floor(Math.random() * allCards.length);
        card.style.order = randomIndex;
    });
    setTimeout(() => {
        btnReset.setAttribute('disable', false);
    }, 500);
    
 }

function gameReset() {
    btnReset.setAttribute('disable', true);
    // resetBoard();
    cards.forEach(card => card.classList.add('flip'));
    resetBoard();
    
    setTimeout(() => {
       
        // resetBoard();
        cards.forEach(card => card.classList.remove('flip'));
        createGame(cards);
    }, 500);
    
}

const btnReset = document.querySelector('.bnt-gameReset');

btnReset.addEventListener('click', gameReset);

createGame(cards);
