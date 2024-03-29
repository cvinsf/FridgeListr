import React from 'react';
import { FoodCardProps } from '../interfaces/interfaces';


const FoodCard: React.FC<FoodCardProps> = (props) => {
    const { _id, food_name, quantity, unit, date_entered, expiration_date } = props.food

    return (
        <>
            <div className='food-card' onClick={() => props.selectFood(props.i)}>
                <button onClick={() => props.delFoodItem(_id)}>X</button>
                <h1>{food_name}</h1>
                <p><strong>Quantity: </strong> {quantity} {unit}</p>
                <p><strong>Date Entered: </strong>{date_entered.slice(0,10)}</p>
                <p><strong>Expiration Date: </strong>{expiration_date.slice(0,10)}</p>
            </div>
        </>
    );
}

export default FoodCard