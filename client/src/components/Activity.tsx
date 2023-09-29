import React, { useState, useEffect } from 'react';

interface Food {
  quantity: number;
  food_name: string;
  date_entered: string;
  expiration_date: string;
}

interface ActivityProps {
  foodArray: Food[];
}


// create a container to hold queried data
const Activity: React.FC<ActivityProps> = (props) => {
  const [table, setTable] = useState<JSX.Element[]>([]);
  const [expirationTable, setExpirationTable] = useState<JSX.Element[]>([]);
  
  // trim string from food date_entered
  const getAll = () => {
    const tempTable: JSX.Element[] = [];
    props.foodArray.forEach(food => {
      tempTable.push(
      <li>
        You added {food.quantity} {food.food_name} on {food.date_entered.substring(0,10)}
      </li>
      );
    });
    setTable(tempTable);
  }
  useEffect(() => {
    getAll();
    getExpirationAlerts();
  },[props.foodArray]);
  
  const getExpirationAlerts = () => {
    const tempTable: JSX.Element[] = [];
    const today = Date.now();
    const EXP_DAYS = 7;

    // EXPIRATION TIME as seconds
    const EXP_TIME = EXP_DAYS * 24 * 60 * 60 * 1000;

    props.foodArray.forEach((food) => {
      // console.log('Expiration date in second: ', food.expiration_date.getTime());
      const seconds = Date.parse(food.expiration_date);
      const days = Math.floor((seconds - today) / (24 * 60 * 60 * 1000));
      if (seconds - today < EXP_TIME){
        const expiration_text = `${food.food_name} is expiring in ${days} days!`;
        tempTable.push(<li className='expiryText'>{expiration_text}</li>)
      }
    });
    setExpirationTable(tempTable);
  };

    return (
        <div id="activityContainer">
            <h1>Activity Log</h1>
            <ul>
              <h2>Expiring Soon</h2>
              {expirationTable}
              <h2>Recent Activity</h2>
              {table}
            </ul>
        </div>
    );
}

export default Activity;