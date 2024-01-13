const convertStringToObject = (str) => {
  let value = 0;
  let color = '';

  if (/\d/.test(str)) {
    value = parseInt(str.match(/\d+/)[0]);
  } else if (str.includes('ace')) {
    value = 14;
  } else if (str.includes('king')) {
    value = 13;
  } else if (str.includes('queen')) {
    value = 12;
  } else if (str.includes('jack')) {
    value = 11;
  }

  const parts = str.split('_');
  color = parts[1].substring(0, parts[1].indexOf('.'));

  return { color, value };
}

function checkNSameElements(arr, n) {
  const count = arr.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});

  return Object.values(count).some((value) => value >= n);
}


function hasSequenceOfFive(arr) {
  const sortedArr = [...arr].sort((a, b) => a - b);
  for (let i = 0; i <= sortedArr.length - 5; i++) {
    const sequence = [sortedArr[i], sortedArr[i + 1], sortedArr[i + 2], sortedArr[i + 3], sortedArr[i + 4]];
    const isSequence = sequence.every((value, index) => value === sortedArr[i] + index);
    if (isSequence) {
      return true;
    }
  }
  return false;
}

function checkFull(arr) {
  const counts = {};

  for (const num of arr) {
    if (!counts[num]) {
      counts[num] = 1;
    } else {
      counts[num]++;
    }
  }

  let hasTwoSame = false;
  let hasThreeSame = false;

  for (const num of Object.values(counts)) {
    if (num === 2) {
      hasTwoSame = true;
    } else if (num === 3) {
      hasThreeSame = true;
    }
  }

  return hasTwoSame && hasThreeSame;
}

function hasTwoPairs(arr) {
  const counts = {};

  for (const num of arr) {
    if (!counts[num]) {
      counts[num] = 1;
    } else {
      counts[num]++;
    }
  }

  let pairsCount = 0;

  for (const key in counts) {
    if (counts[key] === 2) {
      pairsCount++;
    }
  }

  return pairsCount === 2;
}

const countBestHand = (cards) => {
  let value = 'wysoką kartę';
  let points = 0;

  if (hasSequenceOfFive(cards.map((card) => card.value)) && checkNSameElements(cards.map((card) => card.color), 5)) {
    value = 'poker';
    points = 8;
  }
  else if (checkNSameElements(cards.map((card) => card.value), 4)) {
    value = 'karetę';
    points = 7;
  }
  else if (checkFull(cards.map((card) => card.value))) {
    value = 'full';
    points = 6;
  }
  else if (checkNSameElements(cards.map((card) => card.color), 5)) {
    value = 'kolor';
    points = 5;
  }
  else if (hasSequenceOfFive(cards.map((card) => card.value))) {
    value = 'strit';
    points = 4;
  }
  else if (checkNSameElements(cards.map((card) => card.value), 3)) {
    value = 'trójkę';
    points = 3;
  }
  else if (hasTwoPairs(cards.map((card) => card.value))) {
    value = 'dwie pary';
    points = 2;
  }
  else if (checkNSameElements(cards.map((card) => card.value), 2)) {
    value = 'parę';
    points = 1;
  }

  return { value, points };
}

export const GetPlayerCardValues = (cardsInGame, names) => {
  const commonCards = [cardsInGame[8], cardsInGame[9], cardsInGame[10], cardsInGame[11], cardsInGame[12]];
  const cardsPlayerTop = [...[cardsInGame[0], cardsInGame[1]], ...commonCards].map((card) => convertStringToObject(card));
  const cardsPlayerLeft = [...[cardsInGame[2], cardsInGame[3]], ...commonCards].map((card) => convertStringToObject(card));
  const cardsPlayerRight = [...[cardsInGame[4], cardsInGame[5]], ...commonCards].map((card) => convertStringToObject(card));
  const cardsPlayerBottom = [...[cardsInGame[6], cardsInGame[7]], ...commonCards].map((card) => convertStringToObject(card));

  const playerScores = [{ cards: countBestHand(cardsPlayerTop), name: names[0] }, { cards: countBestHand(cardsPlayerLeft), name: names[3] },
  { cards: countBestHand(cardsPlayerRight), name: names[1] }, { cards: countBestHand(cardsPlayerBottom), name: names[2] }];

  return playerScores;
};

export const importAll = (r) =>
r.keys().map((path) => ({
  filepath: path.replace('./', ''),
}));

export const SelectWinner = (playerScores) => {
  let maxPoints = 0;
  let winners = [];

  for (const player of playerScores) {
    if (player.cards.points > maxPoints) {
      maxPoints = player.cards.points;
      winners = [player];
    } else if (player.cards.points === maxPoints) {
      winners.push(player);
    }
  }
  let message = '';
  if (winners.length === 0) {
    message = 'Brak zwycięzcy';
  } else if (winners.length === 1) {
    message = `Wygrał ${winners[0].name} i uzyskał ${winners[0].cards.value}. Otrzymuje 100pkt`;
  } else {
    const names = winners.map((winner) => winner.name).join(' i ');
    const value = winners[0].cards.value; 
    message  = `Wygrali ${names} i uzyskali ${value}. Otrzymują po ${Math.floor(100/winners.length)} pkt`;
  }
  return {message: message, winners: winners};
};