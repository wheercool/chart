
/*
Преобразует смещение в %
*/
export function offsetToPercent(offset, totalDuration) {
  return totalDuration != 0
            ? offset / totalDuration
            :0;
}
/*
Коэффициент соотношения для Scoller
*/
export function getFactor(count, total) {
  return count != 0
      ? total / count
      : 0;
}

export function getScrollerOffset(value, minValue, maxValue, width) {
  return width * (value - minValue) / (maxValue - minValue);
}


/*
Interval.

Data Interval - интервал существующих данных
Visible Interval - интвервал отображаемый пользователю
Minimal Interval Length - минимальный размер видимого интвервала
Requested Interval - интервал запрошенный из БД
Total Interval - интервал охватывающий Visible Interval и Data Interval
Zoom - на какой порядок размер интервала больше минимального размера интервала
*/
