import React from "react";
import dayjs from "dayjs";
import {UseCalendar} from "../../useCalendar.ts";

import './index.less'
import {WeekNames} from "../../utils.ts";

const Calendar: React.FC<UseCalendar> = (props) => {
  const {
    selectedDate,
    viewSelectedDate,
    viewMode,
    years,
    months,
    days,
    selectYear,
    selectMonth,
    selectDate,
    setViewMode,
    nextYearPage,
    prevYearPage,
    prevMonth,
    nextMonth,
  } = props;
  const [selectedYear, selectedMonth] = viewSelectedDate;


  return (
    <div className="calendar-component">
      {/* 当前选择的日期 */}
      <div className="calendar-component-header">
        <div className="calendar-component-header-info">
          <span onClick={() => {setViewMode('month')}}>
            {dayjs(viewSelectedDate.join('/')).format('MMMM')}
          </span>
          <span onClick={() => {setViewMode('year')}}>
            {dayjs(viewSelectedDate.join('/')).format('YYYY')}
          </span>
        </div>
        {
          viewMode !== 'month'
          &&
            <div className="calendar-component-header-btns">
              <div onClick={viewMode === 'year' ? prevYearPage : prevMonth}>
                  Prev
              </div>
              <div onClick={viewMode === 'year' ? nextYearPage : nextMonth}>
                  Next
              </div>
            </div>
        }
      </div>
      <div className="calendar-component-content">
        {/* 根据视图模式显示不同的层级 */}
        {viewMode === 'year' && (
          <div className="years-grid">
            {years.map((year) => (
              <div
                key={year}
                className={`year-item ${selectedYear === year.toString() ? 'selected' : ''}`}
                onClick={() => selectYear(year.toString())}
              >
                {year}
              </div>
            ))}
          </div>
        )}
        {viewMode === 'month' && (
          <div className="months-grid">
            {months.map((month, index) => (
              <div
                key={month}
                className={`month-item ${Number(selectedMonth) === index ? 'selected' : ''}`}
                onClick={() => selectMonth(dayjs().month(index).format('MM'))}
              >
                {month}
              </div>
            ))}
          </div>
        )}
        {viewMode === 'day' && (
          <div className="days-grid">
            {
              Array(7).fill(0).map((_, index) => (
                <div
                  key={`week_name_${index}`}
                  className={`day-item week-item`}
                >
                  {WeekNames[index]}
                </div>
              ))
            }
            {days.map((day) => (
              <div
                key={day}
                className={`day-item ${selectedDate === day ? 'selected' : ''}`}
                onClick={() => selectDate(day)} // 只传递日期部分
              >
                {day.split('-')[2]} {/* 只显示日期部分 */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
