import {useMemo, useState} from 'react';
import dayjs from 'dayjs';
import {getMonthDatesArray, getMonthList} from "./utils.ts";

type ViewMode = 'year' | 'month' | 'day'; // 层级模式：年、月、日

export interface UseCalendar {
  selectedDate: string; // 当前选择的日期
  viewSelectedDate: string[]; // 视图选中，格式为 [yyyy, mm, dd]
  viewMode: ViewMode; // 当前的层级视图
  years: number[]; // 年层级的年份列表
  months: string[]; // 月份列表
  days: string[];
  currentYearPage: number; // 年份翻页的当前页
  currentMonth: string; // 当前选择的月份
  selectYear: (year: string) => void; // 选择年份
  selectMonth: (month: string) => void; // 选择月份
  selectDate: (date: string) => void; // 选择日期
  setViewMode: (mode: ViewMode) => void; // 切换层级
  nextYearPage: () => void; // 翻到下一组年份
  prevYearPage: () => void; // 翻到上一组年份
  nextMonth: () => void;
  prevMonth: () => void;
}

const YEARS_PER_PAGE = 12; // 每页显示28个年份

function useCalendar(): UseCalendar {
  // 视图
  const [viewSelectedDate, setViewSelectedDate] = useState<string[]>([
    dayjs().format('YYYY'),
    dayjs().format('MM'),
    dayjs().format('DD'),
  ]); // 默认选择今天
  const [selectedDate, setSelectedDate] = useState<string>(dayjs().format('YYYY-MM-DD'));
  const [viewMode, setViewMode] = useState<ViewMode>('day'); // 默认显示年层级
  const [currentYearPage, setCurrentYearPage] = useState(0); // 当前年份翻页页码

  // 获取当前选择的年份和月份
  const [selectedYear, selectedMonth] = viewSelectedDate;

  // 计算当前年份页的年份列表
  const years = Array.from({ length: YEARS_PER_PAGE }, (_, i) => {
    return dayjs().year() - (currentYearPage * YEARS_PER_PAGE) + i - (YEARS_PER_PAGE - 1);
  });

  // 月份列表 (英文或中文可以根据需要修改)
  const months = useMemo(getMonthList, []);

  // 选择年份并切换到月份层级
  const selectYear = (year: string) => {
    setViewSelectedDate([year, viewSelectedDate[1], viewSelectedDate[2]]); // 更新年份
    setViewMode('month'); // 切换到月份层级
  };

  // 选择月份并切换到日期层级
  const selectMonth = (month: string) => {
    setViewSelectedDate([viewSelectedDate[0], month, viewSelectedDate[2]]); // 更新月份
    setViewMode('day'); // 切换到日期层级
  };

  // 选择具体日期
  const selectDate = (date: string) => {
    setViewSelectedDate(date?.split('-')); // 更新日期
    setSelectedDate(date)
  };

  // 翻到下一页年份
  const nextYearPage = () => {
    setCurrentYearPage((prev) => prev - 1);
  };

  // 翻到上一页年份
  const prevYearPage = () => {
    setCurrentYearPage((prev) => prev + 1);
  };

  const days = useMemo(() => {
    if (viewMode === 'day') {
      return getMonthDatesArray(`${selectedYear}-${selectedMonth}-01`)
    } else {
      return [];
    }
  }, [viewMode, selectedMonth, selectedYear])

  // 翻到下一个月
  const nextMonth = () => {
    setViewSelectedDate(pre => {
      return dayjs(pre.join('/')).add(1, 'month')?.format('YYYY-MM-DD')?.split('-')
    })
  };

  // 翻到上一个月
  const prevMonth = () => {
    setViewSelectedDate(pre => {
      return dayjs(pre.join('/')).subtract(1, 'month')?.format('YYYY-MM-DD')?.split('-')
    })
  };

  return {
    selectedDate,
    viewSelectedDate,
    viewMode,
    years,
    months,
    currentYearPage,
    currentMonth: viewSelectedDate[1],
    selectYear,
    selectMonth,
    selectDate,
    setViewMode,
    nextYearPage,
    prevYearPage,
    nextMonth,
    prevMonth,
    days,
  };
}

export default useCalendar;
