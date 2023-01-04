'use strict';
//object declarations start
const greeting = {
  heading: '',
  body: ''
}

const player0 = {
  obj: document.querySelector('.player--0'), // object.classList.contains
  scoreDisplay: document.querySelector('#score--0'),
  score: 0,
  currentScoreDisplay: document.querySelector('#current--0'),
  currentScore: 0,
  greeting,
  fullname: {
    firstName: 'Omar',
    lastName: 'Tan'
  }
}
const player1 = {
  obj: document.querySelector('.player--1'),
  scoreDisplay: document.querySelector('#score--1'),
  score: 0,
  currentScoreDisplay: document.querySelector('#current--1'),
  currentScore: 0
}
const btn = {
  roll: document.querySelector('.btn--roll'),
  new: document.querySelector('.btn--new'),
  hold: document.querySelector('.btn--hold')
}
const dice = {
  obj: document.querySelector('.dice'),
  value: 0,
  url: ['./dice-1.png', './dice-2.png', './dice-3.png', './dice-4.png', './dice-5.png', './dice-6.png']
}
//object declarations end
let activePlayer = player0 //player0
greeting.heading = prompt('Heading:')
greeting.body= prompt('Body:')
console.log(player0.greeting)
//function for resets
const reset = () => {
  //resets for player0
  player0.scoreDisplay.textContent = 0
  player0.score = 0
  player0.currentScoreDisplay.textContent = 0
  player0.currentScore = 0
  //resets for player1
  player1.scoreDisplay.textContent = 0
  player1.score = 0
  player1.currentScoreDisplay.textContent = 0
  player1.currentScore = 0
  //dice reset
  dice.obj.style.display = 'none'
  dice.value = 0
  //activePlayer reset
  activePlayer.obj.classList.remove('player--winner')
  if (player1.obj.classList.contains('player--active')) switchPlayer()
  activePlayer = player0

  //buttons reset
  btn.hold.disabled = false
  btn.roll.disabled = false
}
//function for generating random number 
const random = arr => Math.trunc(Math.random() * (arr.length))

//function for switching player
const switchPlayer = () => {
  if (player0.obj.classList.contains('player--active')) {
    activePlayer = player0
    activePlayer.obj.classList.remove('player--active')
    activePlayer.currentScoreDisplay.textContent = 0
    activePlayer.currentScore = 0
    activePlayer = player1   //reassign ng active player or ililipat yung active status
    activePlayer.obj.classList.add('player--active')
  }
  else {
    activePlayer.obj.classList.remove('player--active')
    activePlayer.currentScoreDisplay.textContent = 0
    activePlayer.currentScore = 0
    activePlayer = player0
    activePlayer.obj.classList.add('player--active')
  }
}

//reset on HTMLdocument load
reset()

//Dice roll event
btn.roll.addEventListener('click', () => {
  dice.obj.style.display = 'inline-block'
  dice.value = random(dice.url) + 1 // 6
  dice.obj.src = dice.url[dice.value - 1]

  if (dice.value !== 1) {
    activePlayer.currentScore += dice.value
    activePlayer.currentScoreDisplay.textContent = activePlayer.currentScore
  }
  else if (dice.value === 1) {
    switchPlayer()
  }
})

//Hold event
btn.hold.addEventListener('click', () => {
  activePlayer.score += activePlayer.currentScore
  activePlayer.scoreDisplay.textContent = activePlayer.score
  if (activePlayer.score >= 100) { //atleast 100 score
    activePlayer.obj.classList.add('player--winner')
    btn.roll.disabled = true
    btn.hold.disabled = true
  }
  else {
    switchPlayer()
  }
})
//New game event
btn.new.addEventListener('click', () => reset())