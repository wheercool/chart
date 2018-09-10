import {ADD_GRID_ITEM} from '../actions/simpleGrid' 
import R from 'ramda'

export default function(state = [], action) {
	switch(action.type) {
		case ADD_GRID_ITEM:
			return R.append(action.item, state)
	}
}