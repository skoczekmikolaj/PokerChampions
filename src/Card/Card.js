import React, { useState, useEffect } from 'react';
import './Card.css';

function Card({ path }) {
  const [cardImage, setCardImage] = useState(null);

  useEffect(() => {
    if (path) {
      import(`../Images/Cards/${path}`)
        .then((image) => {
          setCardImage(image.default);
        })
        .catch((error) => {
          console.error('Błąd importu:', error);
        });
    }
  });

  return (
    <div>
      {cardImage && <img src={cardImage} className='Card' alt={path} />}
    </div>
  );
}

export default Card;