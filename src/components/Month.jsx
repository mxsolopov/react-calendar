import React from 'react';
import './Month.css';
import classNames from 'classnames';

const Month = ({ monthNum, daysNum, startMonthDay, year, startDate, setStartDate, endDate, setEndDate }) => {

    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    let now = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

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
            if (date.getTime() === startDate.getTime()) {
                setStartDate(null);
                setEndDate(null);
            }
        }

        if (startDate && !endDate) {

            if (date.getTime() > startDate.getTime()) {
                setEndDate(date);
            } else if (date.getTime() === startDate.getTime()) {
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
                    const date = new Date(year, monthNum, day);
                    const currentDay = now.getTime() === date.getTime() ? 'current-day' : null;
                    const startDay = startDate ?
                        startDate.getTime() === date.getTime() ? 'selected-day' : null :
                        null;
                    const endDay = endDate ?
                        endDate.getTime() === date.getTime() ? 'selected-day' : null :
                        null;
                    const dateRange = startDate && endDate ?
                        startDate.getTime() < date.getTime() && endDate.getTime() > date.getTime() ? 'selected-day' : null : null;

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
