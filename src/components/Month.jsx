import React from 'react';
import './Month.css';
import classNames from 'classnames';

const Month = ({ monthNum, daysNum, startMonthDay, year, startDate, setStartDate, endDate, setEndDate }) => {

    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    let now = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime();

    function generateDaysArr(num) {
        let arr = [];
        for (let i = 1; i <= num; i++) {
            arr.push(i);
        }
        return arr;
    }

    function clickHandler(date) {

        // Начальный выбор даты отсчёта
        if (!startDate) {
            setStartDate(date);


        } else {
            if (date === startDate) {
                setStartDate(null);
                setEndDate(null);
            }
        }

        if (startDate && !endDate) {

            if (date > startDate) {
                setEndDate(date);
            } else if (date === startDate) {
                setStartDate(null);
            } else {
                setStartDate(date);
            }
        }

        if (startDate && endDate) {
            setEndDate(null);
            setStartDate(date);
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
                    const date = new Date(year, monthNum, day).getTime();
                    const currentDay = now === date ? 'current-day' : null;
                    const startDay = startDate ?
                        startDate === date ? 'selected-day' : null :
                        null;
                    const endDay = endDate ?
                        endDate === date ? 'selected-day' : null :
                        null;
                    const dateRange = startDate && endDate ?
                        startDate < date && endDate > date ? 'selected-day' : null : null;

                    if (index === 0) {
                        return <div
                            key={index}
                            style={{ gridColumn: startMonthDay }}
                            className={classNames(currentDay, startDay, endDay, dateRange)}
                            onClick={() => clickHandler(date)}>
                            {day}
                        </div>
                    } else {
                        return <div
                            key={index}
                            className={classNames(currentDay, startDay, endDay, dateRange)}
                            onClick={() => clickHandler(date)}>
                            {day}
                        </div>
                    }
                })}
            </div>
        </div>
    )
}

export default Month;
