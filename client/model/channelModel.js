import {belongsInterval, insideInterval} from './interval'
import R from 'ramda'
/*
Point - точка, либо разрыв
*/

export function makePoint(x, y) {
  return {
    x, y
  }
}

//Является ли точка разрывом
export function isGap(point) {
  return isNaN(point.y)
}

//Создать разрыв в точке x
export function makeGap(x) {
  return makePoint(x, NaN);
}

//Создает разрыв между двумя координатами x
export function makeGapBetween(x1, x2) {
  return makeGap((x1 + x2) / 2)
}


//Interval->[Point]->[Point]
/*
  representingInterval - возвращает минимальное множество точек из points, так чтобы
  их было достаточно отобразить interval в виде графике
*/
export function representingInterval(interval, points) {
  const left = closestLeft(interval.min, points),
        right = closestRight(interval.max, points),
        inside = pointsInside(interval, points);

  if (right == null) {
    return (left != null)
        ? R.prepend(left, inside)
        : inside;
  }

  if (left == null) {
    return (right != null)
      ? R.append(right, inside)
      : inside;
  }

  return R.pipe(R.prepend(left), R.append(right))(inside)
}

/*
Возвращает список точек находящихся внутри интервала
*/
export function pointsInside(interval, points) {
  return R.filter(point => insideInterval(interval, point.x), points)
}


/*
Возвращает список точек принадлежащих интервалу
*/
export function pointsBelongs(interval, points) {
  return R.filter(point => belongsInterval(interval, point.x), points)
}


/*
Возвращает точку ближайшую слева от точки x
*/
export function closestLeft(x, points) {
  let lastClosestPoint = null;
  for (let i = 0; i < points.length; i++) {
    let point = points[i];
    if (point.x <= x)
      lastClosestPoint = point;
    else return lastClosestPoint;
  }
  return lastClosestPoint;
}
/*
  Возвращает точку ближайшую справа от точки x
*/
export function closestRight(x, points) {
  let lastClosestPoint = null;
  for (let i = points.length - 1; i >= 0; i--) {
    let point = points[i];
    if (point.x >= x)
      lastClosestPoint = point;
    else return lastClosestPoint;
  }
  return lastClosestPoint;
}

/*
Объединяет множество точек таким образом, что
множество X является объединением их множеств, для
отсутвующих значений вставляется emptyValue
*/
export function mergePoints(emptyValue, a, b) {
  const getX = point => point.x,
        xs = R.union(a.map(getX), b.map(getX)),
        findY = x => R.compose(
                          (point => point.y),
                          R.defaultTo({y: emptyValue}),
                          R.find(R.propEq('x', x)));
  return xs.map(x => [x, findY(x)(a), findY(x)(b)])
}
