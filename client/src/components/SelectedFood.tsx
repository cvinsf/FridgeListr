import React, { useState, FC } from 'react';

interface Food {
    _id: string,
    food_name: string,
    quantity: number,
    unit: string,
    date_entered: string,
    expiration_date: string
}

interface SelectedFoodProps {
    food?: Food;
    foodFormSubmit: (food: Food) => void;
  }
  

const SelectedFood: FC<SelectedFoodProps> = ({ food, foodFormSubmit }) => {
    if (!food) {
        return null;
      }

    const [foodAction, setFoodAction] = useState<'POST' | 'PATCH'>('POST');

    const toDateInputValue = () => {
        const local = new Date();
        local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
    }
    const toDateInputExpirationValue = () => {
        const local = new Date();
        local.setDate(local.getDate() + 7)
        local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
    }
    const todayDate = toDateInputValue();
    const todayexpiration_date = toDateInputExpirationValue();

    let { _id, food_name, quantity, unit, date_entered, expiration_date } = food ?? {};
    
    date_entered = date_entered?.slice(0, 10) ?? todayDate;
    expiration_date = expiration_date?.slice(0, 10) ?? todayexpiration_date;

    return (
        <>
            <h1>Add something to your fridge!</h1>
            <form onSubmit={(event) => {
                event.preventDefault()
                foodFormSubmit(foodAction, _id ?? "");
            }}>
                Food: <input id='input-food_name' type='text' placeholder='Food Name' defaultValue={food_name}></input><br></br>
                Quantity: <input id='input-quantity' type='text' placeholder='#' defaultValue={quantity}></input>
                Units: <input id='input-unit' type='text' placeholder='Units' defaultValue={unit}></input><br></br>
                Date Entered: <input id='input-date-entered' type='date' placeholder='Date' defaultValue={date_entered}></input><br></br>
                Expiration Date: <input id='input-date-expired' type='date' placeholder='Date' defaultValue={expiration_date}></input><br></br>
                <input id='input-add' type='submit' value='Add new item' onClick={() => setFoodAction('POST')}></input>
                <input id='input-add' type='submit' value='Update selected item' onClick={() => setFoodAction('PATCH')}></input>
            </form>
        </>
    )
}

export default SelectedFood