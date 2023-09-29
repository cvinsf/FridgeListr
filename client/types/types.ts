interface Food {
    _id: string,
    food_name: string,
    quantity: number,
    unit: string,
    date_entered: string,
    expiration_date: string
}

interface FoodCardProps {
    food: Food,
    i: number,
    selectFood: (index: number) => void,
    delFoodItem: (id: string) => void
}

