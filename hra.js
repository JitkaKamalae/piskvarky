'use strict';

let player = 'circle';
let icon = document.querySelector('.kolo');

const Play = (event) => {
  let square = event.target;
  if (square.className === 'butKlik') {
    if (player === 'circle') {
      square.classList.add('sachovnice--circle');
      player = 'cross';
      icon.src = 'cross.svg';
      square.disabled = true;
    } else if (player === 'cross') {
      square.classList.add('sachovnice--cross');
      player = 'circle';
      icon.src = 'circle.svg';
      square.disabled = true;
    }
  }
};

let box = document.querySelectorAll('.butKlik');
box = addEventListener('click', Play);
