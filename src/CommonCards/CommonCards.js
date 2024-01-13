import Card from '../Card/Card'
import './CommonCards.css';

function CommonCards({ cards }) {
    const cardItems = cards?.map(card =>
        <div className='Card' key={card}>
            <Card path={card}></Card>
        </div>
    );

    return (
        <div>{cardItems}</div>
    );
}

export default CommonCards;