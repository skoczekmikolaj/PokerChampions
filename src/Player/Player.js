import Card from '../Card/Card'
import './Player.css';
import chip from '../Images/chip.png'

function Player({ name, cards, money, myTurn }) {
    const cardItems = cards.map(card =>
        <div key={card} className='Card'>
            <Card path={card}></Card>
        </div>
    );

    return (
        <div className={`Player ${myTurn ? 'myTurn' : ''}`} key={name}>
            <div className='Block'>
                <p className='Name'>{name}  {myTurn ? (<img className='Chip' src={chip} alt="Opis obrazu" />) : (<br />)}</p>
                <div>{cardItems}</div>
            </div>
            <div className='Block'>
                <p>{money}</p>
            </div>
        </div>
    );
}

export default Player;