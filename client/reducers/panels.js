import R from 'ramda'
import {copyObject, makeScopedReducer} from './common'
import {ADD_LAYOUT_ITEM, REMOVE_LAYOUT_ITEM, REPLACE_LAYOUT, REPLACE_PANELS, REPLACE_BACKUP_PANELS} from '../actions/panels'
import {CHANGE_WIDGET} from '../actions/widget'
import {widgetReducerDispatcher} from './widgets'

const panels = {
	'panel-0': {
		id: 'panel-0',
		layout: {i: "panel-0", x: 7, y: 0, w: 6, h: 12},
		widget: {name: 'Image', id: 'panel-0', state: {url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAMAAAC8EZcfAAAAnFBMVEX////rGzH//v/rGC/rECrqACDrFi3sOUbrACT6wMb83N7sABTrEyz+7/HwVmLrGzL81dj84uTvPk7zbXj0lJvwSVzxWWf1qKvtMkXvTlzrAB3yYGzxTWD7yc3tJj3uM0DuRlP6z9H99vfyaHPzho/ydID5ucDqABf3r7brAAD97O36xMvsJDj0mJ/84OLpAAr0g4v2s7b0oKj0jJaVoOhqAAAFgklEQVR4nO2Yi5KiOBRAgQQmKgiirYKNCgo4ik43/v+/bZ4gL/tR07W1tfdUTY8k5HK4eRDQNAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/p8YPQWdsqcNmjVP2/bG6RrMPO/8hUi9UYeqPxu1kQaj2S4us6z0vinieONhkk/aPb2Cpl2j0/slc+rzxqu3eU268J5c6L34NYg/en7hlmCyERc8HJvXO6/iY3qLZlIvGe3zkDwS5kXpDN1kOUEKS/yliP9xkbHO+jTOb3E9c+80K65xdopHZ433/fkNY53iImyaJrHYbx2Hy/GA4fW3KeHNGEgWhGj0pYHtTER7O2gJZmUUlxd5/TmxXOZn4ddFVs5dcVnXnN76o0b3heB6QOJUa31VRQNtviZI+55m0JNLwiVHLhNEbnmmUymJtzIx+N4/EA2FVnJBV8evVaH2tS4eyiAdd9XFD8RlF3HDkyy4uRYr0HFw63Rx83DFBRETbJ80YNkqbgq2l195MJUJC2eq1VKU2GtPc1aSLHGik/wZz5JHQb0STGbR+6omi2aPrrM4kxXv0djh5UoQB05PeCFpdAU3SjDWPBLy0Z9Ps9SVM4Fsl28ej98SvLxNdWLWkGJ6j1UuxovNWlUSFKQntjJXGZxG6bYOf4wf8/hUcOwi2QdLjDHBFj1EFsa/Tq0MUoV7gW0kZhs9kZ6HEMbrlQg62mPMKmkZobX0IGUpl4KWPyes3OZDBuPi9GD4CUH6z7Xt/SE9/LLFKmSHC9oPK73OYDKfIHaiblniRMRnnjVhIlqZYz4Vkb3bpPNpgXU0eau7mAZE/jzd+PzGaIzwbrQEkZ63Ba2HDLqWv2DLpndcC0NE6DPj5NaCpbxPuyhZoPFiK9M7iehRLlsVbHBoSbanhtuoyqBu+7zV7ViIVpY76mQwP8uCpEcQuTLpyZ31MhUjSyaIlKAzl2GIPNEoTVkw17Q3U9wKSeX4z9iAWVSCaPsuwy9UGPrwa81icoounOzV7gjiYCz3KdGOjzM6ABqCMxnGrh5aZyloBYmxwUJwcpHbFicNguBqJNUyo7LjyR7Cm2plFJFdHeV/BBNp3BCczuR64e1EBGvbELwpwRdHroNKkCpTQZ0b/onlnFaj6WEdFPfv+VJw2RJkZ2EJGhAUt7gTXdwQfKkyiKtngtMU1GtBrVdQhh8WRMFyylhO5fB+Ishqd72Ctp9FgpGaNX9L0Bw7glnPJOkR7M+grhc7gZrF1t8S7KyDzwXR1ugVRGqgYBvbDPIvCVpMsOgIoiJoc/jrgofngvUszrqC9j6+tV5TbkYyJJj8tOC2O4tfOju7eumvBY0fzOC6FhzVgrfOMsM1Esc5O90M0n0MrUi+lEH0HcFdnUG1ifTP2gPXffCSatUYnKgnrDPfv+wX3+zi5DuCzpyIpxle1PnTkjXBk7umHUNe6ZK5vOyJPYuvPy54qQW1ksjlBy9UDo1bSui2ir4dzibi8e6iOXsVStjssor45wXXstZnvUnkHoPuiX3GujCJaxGe0VHBHqB0w4jNwl9bIXLtsPzcJOnuqJuCVkewfpJEckZzQTreiHyM22yVxnT7bZvrq5iwow2Wb9wWpu/5tOKoNd5JKkG7IUi3EIH8qPBbfGigE2yT85eHcEsFsckr86ASpHlhZaFLBQv2yyQ5FzTG1xebHxP5F6+PsXoBOr8vi+rLBfaPEatI5JeFcF9vt0LeNH+tMhiNJCqUEcuCi6MlqpLH4zu5i6p9+B3JlmevisZKG+9nmjOOLqriLCqMZnimrALEQ6/XH35d+17dxye3C9T3OGOg/huX+PAcvpM1qt/1i7ox1AIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/nv8AxmIjFcY5O43AAAAAElFTkSuQmCC"}, settings: {}}
	}
}

export const panelReducer = function(state = panels, action) {
	const getWidgetReducer = widgetReducerDispatcher;
	const getPanelWidgetName = (id) => state[id].widget.name;
	const getPanelWidgetReducer = R.pipe(getPanelWidgetName, getWidgetReducer);
	const getWidgetInstanceReducer = (name, id) => makeScopedReducer(getWidgetReducer(name), id);
	const getPanelWidgetInstanceReducer = (id) =>  makeScopedReducer(getPanelWidgetReducer(id), id);
	const getPanelWidgetState = (id) => state[id].widget.state;
	const getPanelWidgetNewState = (id) => getPanelWidgetInstanceReducer(id)(getPanelWidgetState(id), action);
	const updatePanelWidgetState = (id) => R.assocPath([id, 'widget', 'state'],
																				getPanelWidgetNewState(id));
  const getWidgetDefaultState = (name, id) => getWidgetInstanceReducer(name, id)(undefined, {scope: id})
	const updateWidgetState = (name, id) => R.assocPath([id, 'widget', 'state'], getWidgetDefaultState(name, id));

	switch (action.type) {
		case ADD_LAYOUT_ITEM:
			return R.assoc(action.id,
					{
						id: action.id,
						layout: R.assoc('i', action.id, action.item),
						widget: {
							name: '',
							id: action.id,
							state: {},
							settings: {}
						}
					}, state);


		case REMOVE_LAYOUT_ITEM:
			return R.dissoc(action.id, state);

		case REPLACE_LAYOUT:

			const updateLayout = R.mapObjIndexed((value, key) => {
				return R.assoc('layout', R.find(item => item.i == key,
										action.newLayout), value)
			})
			return updateLayout(state);

		case REPLACE_PANELS:
			return action.newPanels

		case CHANGE_WIDGET:
			const updateWidgetName = R.assocPath([action.id, 'widget', 'name'], action.name);
			const updateWidget = R.pipe(updateWidgetName, updateWidgetState(action.name, action.id))
			return updateWidget(state);
		default:
			const updatePanelWidgetStates = R.mapObjIndexed((value, key) => {
				return updatePanelWidgetState(key)(state)[key]
			});
			return updatePanelWidgetStates(state)
	}
}

export const backupPanelReducer = (state = {}, action) => {
	switch (action.type) {
		case REPLACE_BACKUP_PANELS:
			return action.newBackup;

		default: return state;
	}
}
