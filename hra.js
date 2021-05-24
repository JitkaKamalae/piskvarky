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
  if (isWinningMove(event.target)) {
    setTimeout(() => {
      if (player === 'cross') {
        const conf = confirm(`Vítězí kolečko.`);
        if (conf) {
          location.reload();
        }
      } else {
        const conf = confirm(`Vížězí křížek.`);
        if (conf) {
          location.reload();
        }
      }
    }, 250);
  }
};

let box = document.querySelectorAll('.butKlik');
box = addEventListener('click', Play);
const getSymbol = (field) => {
  if (field.classList.contains('sachovnice--circle')) {
    return 'circle';
  } else if (field.classList.contains('sachovnice--cross')) {
    return 'cross';
  }
};

const boardSize = 10;
const fields = document.querySelectorAll('.butKlik');

const getField = (row, column) => {
  return fields[row * boardSize + column];
};
const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length && field !== fields[fieldIndex]) {
    fieldIndex++;
  }
  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};

const symbolsToWin = 5;
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);
  let i;
  let inRow = 1;
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }
  if (inRow >= symbolsToWin) {
    return true;
  }
  let inColumn = 1;
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }
  if (inColumn >= symbolsToWin) {
    return true;
  }
  return false;
};
