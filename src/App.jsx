import React, { useState } from "react";
import './App.css';
import Month from './components/Month';

const App = () => {

  const monthLengthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const [date, setDate] = useState({ month: currentMonth, year: currentYear });
  const [startDate, setStartDate] = useState(null);

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
            startDate={startDate}
            setStartDate={setStartDate} />

          <Month
            monthNum={date.month}
            daysNum={monthLengthArr[date.month]}
            startMonthDay={calcStartDay(date.year, date.month)}
            year={date.year}
            startDate={startDate}
            setStartDate={setStartDate} />

          <Month
            monthNum={nextMonth}
            daysNum={monthLengthArr[nextMonth]}
            startMonthDay={date.month === 11 ?
              calcStartDay(date.year + 1, nextMonth) :
              calcStartDay(date.year, nextMonth)}
            year={date.month === 11 ? date.year + 1 : date.year}
            startDate={startDate}
            setStartDate={setStartDate} />
        </div>

      </div>

    </div>
  );
}

export default App;
