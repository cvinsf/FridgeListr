import React, { useState, useEffect, FC } from 'react';
import FoodCard from './FoodCard';
import SelectedFood from './SelectedFood';

interface Food {
    _id: string,
    food_name: string,
    quantity: number,
    unit: string,
    date_entered: string,
    expiration_date: string
  }
  
  interface MainInventoryProps {
    foodArray: Food[],
    getFoodArray: () => void,
  }

const MainInventory: FC<MainInventoryProps> = ({ foodArray, getFoodArray }) => {
    const [foodRender, setFoodRender] = useState<JSX.Element[]>([]);
    const foodFormSubmit = (action: string, food_id: string) => {
        action === 'POST' ? postFoodItem() : patchFoodItem(food_id);
    }

    const [selectedFood, setSelectedFood] = useState<JSX.Element>(
        <SelectedFood food={foodArray[0]} foodFormSubmit={foodFormSubmit} key={100} />
        );


    const postFoodItem = () => {
        console.log('posted!')
        const postBody = {
            food_name: document.getElementById('input-food_name').value,
            quantity: document.getElementById('input-quantity').value,
            unit: document.getElementById('input-unit').value,
            date_entered: document.getElementById('input-date-entered').value,
            expiration_date: document.getElementById('input-date-expired').value
        }

        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postBody)
        }
        console.log(postOptions)
        fetch(`/inventory/olaf`, postOptions)
            .then((data) => {
                // props.setFoodArray(data)
                // console.log(data)
                getFoodArray()
            })
            .catch((error) => console.log(error));
    }

    const patchFoodItem = (food_id: string) => {
        console.log('patched!', food_id)
        const postBody = {
            food_name: document.getElementById('input-food_name').value,
            quantity: document.getElementById('input-quantity').value,
            unit: document.getElementById('input-unit').value,
            date_entered: document.getElementById('input-date-entered').value,
            expiration_date: document.getElementById('input-date-expired').value
        }

        const postOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postBody)
        }
        console.log(postOptions)
        fetch(`/inventory/${food_id}`, postOptions)
            .then((data) => {
                // props.setFoodArray(data)
                // console.log(data)
                getFoodArray()
            })
            .catch((error) => console.log(error));
    }

    const selectFood = (i: number) => {
        // console.log('buttonclicked', props.foodArray[i])
        setSelectedFood(<SelectedFood food={foodArray[i]} foodFormSubmit={foodFormSubmit} key={100} />)
    }


    const delFoodItem = (food_id: string) => {
        const delOptions = {
            method: 'DELETE'
        }

        fetch(`/inventory/${food_id}`, delOptions)
            .then((data) => {
                getFoodArray()
            })
            .catch((error) => console.log(error));
    }

    // this will update the render component when the food array changes
    import React, { useState, useEffect, FC } from 'react';
    import FoodCard from './FoodCard';
    import SelectedFood from './SelectedFood';

    interface Food {
        _id: string,
        food_name: string,
        quantity: number,
        unit: string,
        date_entered: string,
        expiration_date: string
    }

    interface MainInventoryProps {
        foodArray: Food[],
        getFoodArray: () => void,
    }

    const MainInventory: FC<MainInventoryProps> = ({ foodArray, getFoodArray }) => {
        const [foodRender, setFoodRender] = useState<JSX.Element[]>([]);
        const foodFormSubmit = (action: string, food_id: string) => { };

        const [selectedFood, setSelectedFood] = useState<JSX.Element>(
            <SelectedFood food={foodArray[0]} foodFormSubmit={foodFormSubmit} key={100} />
        );

        const postFoodItem = () => { };

        const patchFoodItem = (food_id: string) => {
            console.log('patched!', food_id)
            const postBody = {
                food_name: document.getElementById('input-food_name').value,
                quantity: document.getElementById('input-quantity').value,
                unit: document.getElementById('input-unit').value,
                date_entered: document.getElementById('input-date-entered').value,
                expiration_date: document.getElementById('input-date-expired').value
            }

            const postOptions = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postBody)
            }
            console.log(postOptions)
            fetch(`/inventory/${food_id}`, postOptions)
                .then((data) => {
                    // props.setFoodArray(data)
                    // console.log(data)
                    getFoodArray()
                })
                .catch((error) => console.log(error));
        }

        const selectFood = (i: number) => {
            // console.log('buttonclicked', props.foodArray[i])
            setSelectedFood(<SelectedFood food={foodArray[i]} foodFormSubmit={foodFormSubmit} key={100} />)
        }

        const delFoodItem = (food_id: string) => {
            const delOptions = {
                method: 'DELETE'
            }

            fetch(`/inventory/${food_id}`, delOptions)
                .then((data) => {
                    getFoodArray()
                })
                .catch((error) => console.log(error));
        }

        useEffect(() => {
            const tempArr: JSX.Element[] = foodArray.map((food: Food, i: number) => (
                <FoodCard key={i + 1000} food={food} delFoodItem={delFoodItem} i={i} selectFood={selectFood} />
            ));
            setFoodRender(tempArr);
        }, [foodArray]);

        return (
            <div id='main-inventory'>
                <div id='selected-item'>
                    {selectedFood}
                    <button id='clear-food' onClick={() => setSelectedFood(<SelectedFood food={undefined} foodFormSubmit={foodFormSubmit} key={100} />)}>Clear Food</button>
                </div>
                {foodRender}
            </div>
        )
    }

    export default MainInventory;

    return (
        <div id='main-inventory'>
            <div id='selected-item'>
                {selectedFood}
                <button id='clear-food' onClick={() => setSelectedFood(<SelectedFood food={undefined} foodFormSubmit={foodFormSubmit} key={100} />)}>Clear Food</button>
            </div>
            {foodRender}
        </div>
    )
}

export default MainInventory