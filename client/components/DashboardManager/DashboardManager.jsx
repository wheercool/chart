import React, { Component } from 'react';
import {connect} from 'react-redux'
import R from 'ramda'
import Dashboard from '../Dashboard/Dashboard'
import {trace, log, copy, copyList} from '../../utils'
import {addLayoutItem, replaceBackupPanels, replaceLayout,
        removeLayoutItem, replacePanels} from '../../actions/panels'
import {enterEditMode, cancelEditMode} from '../../actions/editMode'


/*
  Компонент для создавния дашбордов
  Ответсвенность - редактирование (создание) дашборда.
  Умеет:
    -добавлять новые панели,
    -переводить панели в режим редактирования,
    - обеспечивает позиционирование панелей.
*/
class DashboardManager extends Component {
  render() {

    const {isEditingMode,
          widgets,
          layout,
          onPannelAdd, onPanelRemove,
          onEditModeEnter, onEditModeCancel, onEditModeComplete,
          onLayoutChanged} = this.props

    const header = !isEditingMode? (<button onClick={onEditModeEnter}>Edit</button>)
    : (
        <div>
          <button onClick={onPannelAdd}>Add</button>
          <button onClick={onEditModeComplete}>OK</button>
          <button onClick={onEditModeCancel}>Cancel</button>
        </div>);

    return (
      <div className="main-panel">
        <div className="panel-header">
              {header}
        </div>
        <div className="panel-body">
          <Dashboard
              layout={layout}
              widgets={widgets}
              isEditing={isEditingMode}
              onLayoutChanged={onLayoutChanged}
              onPanelRemove={onPanelRemove} />
        </div>
      </div>
    );
  }
}


DashboardManager.propTypes = {
  layout: React.PropTypes.arrayOf(React.PropTypes.shape({ //объект описывающий layout
    i: React.PropTypes.string, //id панели
    x: React.PropTypes.number, //номер колонки (0 - 12)
    y: React.PropTypes.number, //номер строки
    w: React.PropTypes.number, //ширина в колонках
    h: React.PropTypes.number //высота в колонках
  })),
  isEditingMode: React.PropTypes.bool, //включен ли режим редактирования

  onPannelAdd: React.PropTypes.func, //добавление новой панели
  onPanelRemove: React.PropTypes.func, //добавление новой панели
  onEditModeEnter: React.PropTypes.func, //переход в режим редактирования layout
  onEditModeCancel: React.PropTypes.func, //отмена режима редактирования layout
  onEditModeComplete: React.PropTypes.func, //сохранения результатов редактирования layout
}

const mapStateToProps = (state) => {
  const getLayout = R.pipe(R.values, R.map(d => d.layout)),
        getWidgets = R.pipe(R.values, R.map(d => d.widget));
  return {
    layout: getLayout(state.panels),
    widgets: getWidgets(state.panels),
    isEditingMode: state.isEditingMode
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPannelAdd: function() {
      dispatch(addLayoutItem());
    },
    onPanelRemove: function(id) {
      dispatch(removeLayoutItem(id))
    },
    onEditModeEnter: function() {
      dispatch((dispatch, getState) => {
        const state = getState();
        dispatch(enterEditMode());
        dispatch(replaceBackupPanels(state.panels))
      })
    },
    onEditModeCancel: function() {
      dispatch((dispatch, getState) => {
        const state = getState();
        dispatch(replacePanels(state.backupPanels))
        dispatch(cancelEditMode());
      })
    },
    onEditModeComplete: function() {
      dispatch(cancelEditMode())
    },
    onLayoutChanged: function(newLayout) {
      dispatch(replaceLayout(newLayout))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DashboardManager);
