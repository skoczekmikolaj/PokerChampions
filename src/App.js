import startGif from './Images/startGif.gif';
import './App.css';
import { useState, useEffect } from 'react';
import Table from './Table/Table';
import { GetPlayerCardValues, SelectWinner, importAll } from './GameLogic';

function App() {

  const [cardsInGame, setCardsInGame] = useState([]);
  const [commonCards, setCommonCards] = useState([]);
  const [playerCardValues, setplayerCardValues] = useState({});
  const names = ['Andrzej', 'Zbyszek', 'Paweł', 'Piotrek'];
  const [currentPlayer, setcurrentPlayer] = useState(0);
  const [endGame, setEndGame] = useState(false);
  const [messageWinner, setMessageWinner] = useState('');
  const [messageEnd, setMessageEnd] = useState('');
  const [scores, setScores] = useState(!localStorage.getItem('scores') ? [0, 0, 0, 0] : JSON.parse(localStorage.getItem(('scores'))));
  localStorage.setItem('scores', JSON.stringify(scores));

  function newCurrentPlayer() {
    setcurrentPlayer(currentPlayer + 1);
  }

  function ClearPoints(){
  localStorage.setItem('scores', JSON.stringify([0,0,0,0]));
    setScores(JSON.parse(localStorage.getItem(('scores'))));
  }

  const updateScores = (winners) => {
    const updatedScores = names.map((name, index) => {
      if (winners.includes(name)) {
        return scores[index] + Math.floor(100 / winners.length);
      }
      return scores[index];
    });
    setScores(updatedScores);
  };

  function NextStep() {
    if (currentPlayer % 4 === 3) {
      if (commonCards.length === 0) {
        const startingCards = cardsInGame.slice(8, 11);
        setCommonCards(startingCards);
      } else if (commonCards.length + 8 < cardsInGame.length) {
        const nextCard = cardsInGame[commonCards.length + 8];
        setCommonCards(prevCards => [...prevCards, nextCard]);
      } else {
        console.log(SelectWinner(playerCardValues))
        setMessageWinner(SelectWinner(playerCardValues).message);
        setEndGame(true);
        updateScores(SelectWinner(playerCardValues).winners.map((winner) => winner.name));
        localStorage.setItem('scores', JSON.stringify(scores));
      }
      setplayerCardValues(GetPlayerCardValues(cardsInGame, names));
    }
    !endGame ? newCurrentPlayer() : setMessageEnd('Gra została już zakończona. Rozpocznij nową grę');
  }

  useEffect(() => {
    setScores(JSON.parse(localStorage.getItem(('scores'))));
    document.title = 'PokerChampions'
    const cardImages = importAll(require.context('./Images/Cards', false, /\.(png|jpe?g|svg)$/));
    let shuffledCards = [];
    for (let i = 0; i < 13; i++) {
      const rndNum = Math.floor(Math.random() * cardImages.length);
      const randomCard = cardImages[rndNum].filepath;
      shuffledCards.push(randomCard);
      cardImages.splice(rndNum, 1);
    }
    setCardsInGame(shuffledCards);
  }, []);

  return (
    <div className="App">
      <img src={startGif} className="App-logo" alt="logo" />
      <p className='Logo'> PokerChampions</p>
      <Table cardsInGame={cardsInGame} NextStep={NextStep} commonCards={commonCards} names={names} currentPlayer={names[currentPlayer % 4]} messages={[messageWinner, messageEnd]} scores={scores}></Table>
      <div className='Right'>
        <button className='buttonRight' onClick={ClearPoints}>Wyzeruj punkty</button>
      </div>
    </div>
  );
}

export default App;
