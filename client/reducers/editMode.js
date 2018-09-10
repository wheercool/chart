import {ENTER_EDIT_MODE, CANCEL_EDIT_MODE} from '../actions/editMode'

export const editMode = function (state = false, action) {	
	switch (action.type) {
		case ENTER_EDIT_MODE:
			return true

		case CANCEL_EDIT_MODE:
			return false

		default: return state

	}
}