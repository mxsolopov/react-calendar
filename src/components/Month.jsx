import React from 'react';
import './Month.css';
import classNames from 'classnames';

const Month = ({ monthNum, startMonthDay, year, store, setStore }) => {

    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const monthLengthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const daysNum = monthLengthArr[monthNum];
    const now = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime();

    function generateDaysArr(num) {
        let arr = [];
        for (let i = 1; i <= num; i++) {
            arr.push(i);
        }
        return arr;
    }

    function clickHandler(date) {

        // Начальный выбор даты отсчёта
        if (!store.startDate) {
            setStore({...store, startDate: date});
        }

        // Выбор конечной даты
        if (store.startDate && !store.endDate) {

            // Выбор в положительную сторону
            if (date > store.startDate) {
                setStore({...store, endDate: date});

            // Отключение выбора начальной даты
            } else if (date === store.startDate) {
                setStore({...store, startDate: null});

            // Выбор в отрицательную сторону
            } else {
                setStore({...store, endDate: date, startDate: store.startDate});
            }
        }

        // Выбор начальной даты заново
        if (store.startDate && store.endDate) {
            setStore({...store, endDate: null, startDate: date});
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

                    // Классы для выделения дат цветом
                    const currentDay = now === date ? 'current-day' : null;
                    const startDay = store.startDate ?
                        store.startDate === date ? 'selected-day' : null :
                        null;
                    const endDay = store.endDate ?
                        store.endDate === date ? 'selected-day' : null :
                        null;
                    const dateRange = store.startDate && store.endDate ?
                        (store.startDate < date && store.endDate > date) ||
                        (store.startDate > date && store.endDate < date) ? 'selected-day' : null : null;

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
