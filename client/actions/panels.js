let panelIdGenerator = 1;

export const ADD_LAYOUT_ITEM  = 'ADD_LAYOUT_ITEM'

export const addLayoutItem = function(item) {
	const {x = 0, y = 0, w = 2, h = 6} = item || {};
	return {
		type: ADD_LAYOUT_ITEM,
		id: 'panel-' + panelIdGenerator++,
		item: {x, y, w, h}
	}
}

export const REMOVE_LAYOUT_ITEM = 'REMOVE_LAYOUT_ITEM'
export const removeLayoutItem = function(id) {
	return {
		type: REMOVE_LAYOUT_ITEM,
		id
	}
}


export const REPLACE_BACKUP_PANELS = 'REPLACE_BACKUP_PANELS'
export const replaceBackupPanels = function(newBackup) {
	return {
		type: REPLACE_BACKUP_PANELS,
		newBackup
	}
}


export const REPLACE_LAYOUT = 'REPLACE_LAYOUT'
export const replaceLayout = function(newLayout) {
	return {
		type: REPLACE_LAYOUT,
		newLayout
	}
}

export const REPLACE_PANELS = 'REPLACE_PANELS'
export const replacePanels = function(newPanels) {
	return {
		type: REPLACE_PANELS,
		newPanels
	}
}
