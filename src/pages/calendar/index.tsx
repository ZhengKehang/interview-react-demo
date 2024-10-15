import useCalendar from './useCalendar'; // 引入自定义的useCalendar Hook
import Calendar from "./components/Calendar";

import './index.less'
import dayjs from "dayjs";

const Index = () => {
  const calenderProps = useCalendar();
  const {selectedDate} = calenderProps;
  return (
    <div className="calendar-demo">
      <div className="calendar-info">
        Selected Date : {dayjs(selectedDate).format('MM/DD/YYYY dddd')}
      </div>
      <Calendar {...calenderProps} />
    </div>
  );
};

export default Index;
