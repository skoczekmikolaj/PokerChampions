import Player from '../Player/Player';
import CommonCards from '../CommonCards/CommonCards';
import './Table.css';

function Refresh() {
    window.location.reload();
}

function Table({ cardsInGame, commonCards, NextStep, names, currentPlayer, messages, scores }) {
    return (
        <div>
            <div key={'p1'} className="Top-Player">
                <Player name={names[0]} cards={[cardsInGame[0], cardsInGame[1]]} money={scores[0]} myTurn={currentPlayer === names[0]}></Player>
            </div>
            <div key={'p3'} className="Right-Player">
                <Player name={names[1]} cards={[cardsInGame[4], cardsInGame[5]]} money={scores[1]} myTurn={currentPlayer === names[1]}></Player>
            </div>
            <div key={'p4'} className="Bottom-Player">
                <Player name={names[2]} cards={[cardsInGame[6], cardsInGame[7]]} money={scores[2]} myTurn={currentPlayer === names[2]}></Player>
            </div>
            <div key={'p2'} className="Left-Player">
                <Player name={names[3]} cards={[cardsInGame[2], cardsInGame[3]]} money={scores[3]} myTurn={currentPlayer === names[3]}></Player>
            </div>
            <div className="Common-Cards">
                <CommonCards cards={commonCards}></CommonCards>
                <button className='button' onClick={Refresh}>Nowa gra</button>
                <button className='button' onClick={NextStep}>Następny krok</button>
                <div className='Messages'>
                    <p>{messages[0]}</p>
                    <p>{messages[1]}</p>
                </div>
            </div>
        </div>
    );
}

export default Table;