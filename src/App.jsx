import React, { useState } from "react";
import './App.css';
import Month from './components/Month';

const App = () => {

  const monthLengthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const msCoeff = 1000 * 60 * 60 * 24

  const [date, setDate] = useState({ month: currentMonth, year: currentYear });
  const [store, setStore] = useState({ startDate: null, endDate: null });
  const diff = store.startDate && store.endDate ? Math.floor((store.endDate - store.startDate) / msCoeff) : 0;

  let input = !store.startDate ? 'Выберите дату на календаре для отсчёта' :
    <div className="input-wrapper">
      <label htmlFor="num-of-days">Интервал: </label>
      <input
        type="number"
        id="num-of-days"
        value={store.startDate || store.startDate && store.endDate ? diff : 0}
        onChange={e => setStore({ ...store, endDate: store.startDate + +e.target.value * msCoeff })}
        className="num-of-days" />
    </div>;

  const prevMonth = date.month === 0 ? 11 : date.month - 1;
  const nextMonth = date.month === 11 ? 0 : date.month + 1;

  function calcStartDay(year, month) {
    return new Date(year, month, 1).getDay();
  }

  return (
    <div className="App">

      <div className="container">
        <div className="year-title">{date.year} год</div>

        <div className="buttons-wrapper">
          <button onClick={() => {
            date.month === 0 ?
              setDate({ month: 11, year: date.year - 1 }) :
              setDate({ month: date.month - 1, year: date.year })
          }}>←</button>

          <button onClick={() => {
            date.month === 11 ?
              setDate({ month: 0, year: date.year + 1 }) :
              setDate({ month: date.month + 1, year: date.year })
          }}>→</button>
        </div>

        <div className="months-wrapper">
          <Month
            monthNum={prevMonth}
            daysNum={monthLengthArr[prevMonth]}
            startMonthDay={date.month === 0 ?
              calcStartDay(date.year - 1, prevMonth) :
              calcStartDay(date.year, prevMonth)}
            year={date.month === 0 ? date.year - 1 : date.year}
            store={store}
            setStore={setStore} />

          <Month
            monthNum={date.month}
            daysNum={monthLengthArr[date.month]}
            startMonthDay={calcStartDay(date.year, date.month)}
            year={date.year}
            store={store}
            setStore={setStore} />

          <Month
            monthNum={nextMonth}
            daysNum={monthLengthArr[nextMonth]}
            startMonthDay={date.month === 11 ?
              calcStartDay(date.year + 1, nextMonth) :
              calcStartDay(date.year, nextMonth)}
            year={date.month === 11 ? date.year + 1 : date.year}
            store={store}
            setStore={setStore} />
        </div>

        <div className="num-of-days-wrapper">
          {input}
        </div>

      </div>

    </div>
  );
}

export default App;
