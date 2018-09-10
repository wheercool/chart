export const CHANGE_WIDGET = 'CHANGE_WIDGET'
export const changeWidget = function(id, name) {
	return {
		type: CHANGE_WIDGET,
		id,
		name
	}
}