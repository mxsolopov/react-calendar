import React from 'react'
import './Month.css'

const Month = ({monthNum, daysNum, startMonthDay, year, startDate, setStartDate}) => {

    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    function generateDaysArr(num) {
        let arr = [];
        for (let i = 1; i <= num; i++) {
            arr.push(i);
        }
        return arr;
    }

    function selectStartDate(day) {
        const date = new Date(year, monthNum, day.textContent);
        if (!startDate) {
            setStartDate(date);
            day.classList.add('current-day');
        }

        if (startDate === date) {
            console.log(true);
        }
    }

    return (
        <div>
            <div className="title">{monthNames[monthNum]}</div>
            <div className="days-of-week-container">
                <div>Пн</div>
                <div>Вт</div>
                <div>Ср</div>
                <div>Чт</div>
                <div>Пт</div>
                <div>Сб</div>
                <div>Вс</div>
            </div>
            <div className="calendar-container">
                {generateDaysArr(daysNum).map((day, index) => {
                    if (index == 0) {
                        return <div key={index} style={{gridColumn: startMonthDay}}>{day}</div>
                    } else {
                        return <div key={index} onClick={(e) => selectStartDate(e.target)}>{day}</div>
                    }
                })}
            </div>
        </div>
    )
}

export default Month;
