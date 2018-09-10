import R from 'ramda'
import imageWidget from './image'
import simpleGrid from './simpleGrid'
import lineChart from './lineChart'

const widgetReducers = {
	'Simple Grid': simpleGrid,
	'Image': imageWidget,
	'Line Chart': lineChart
};

/*
Возвращает редьюсер виджета по имени виджета
*/
export function widgetReducerDispatcher(name) {
	var reducer = widgetReducers[name] || ((state, action) => undefined);
	return reducer;
}
