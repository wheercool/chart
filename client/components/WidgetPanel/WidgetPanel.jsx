import React, { Component } from 'react';
import R from 'ramda'
import {trace} from '../../utils'
import {connect} from 'react-redux'

import '../../styles/widget-panel.css'

import CloseButton from '../Buttons/CloseButton'
import SettingButton from '../Buttons/SettingButton'
import AvailableWidgets from '../Widgets/AvailableWidgets'

import WidgetDispatcher, {registeredWidgets} from '../Widgets/WidgetDispatcher'
/*
 Контейнер для виджетов
 Управляет их настройками и позволяет менять свое содержимое на
 другой виджет
*/
class WidgetPanel extends Component {
    render() {
        const {id, onPanelRemove, title, isEditing, className, style, widgetName, onWidgetChange} = this.props;
        const onRemove = onPanelRemove.bind(null, id);
        const onSelectedWidgetChanged = () => {};

        const dynamicTitle = isEditing? <AvailableWidgets   className="pull-left"
                                                            widgets={registeredWidgets}
                                                            selectedWidget={widgetName}
                                                            onWidgetSelect={onWidgetChange}/>: title;
        const button = isEditing? <CloseButton onClick={onRemove} />: <SettingButton className="pull-right"/>,
              panelBorder = 2,
              innerWidth = parseInt(style.width, 10) - panelBorder,
              innerHeight = parseInt(style.height, 10) - panelBorder;
        return (
            <div {...this.props} className={`${this.props.className} panel-default widget-panel`}>

                    <div className="panel-heading clearfix-container">{dynamicTitle}{button}<div className="clearfix"/></div>
                    <div className="panel-body">
                        <WidgetDispatcher widgetName={widgetName}
                                          widgetId={id}
                                          width={innerWidth}
                                          height={innerHeight}
                                          isEditing={isEditing}/>
                        {this.props.children}
                    </div>

            </div>
        )
    }
}

WidgetPanel.propTypes = {
    title: React.PropTypes.string,
    widgetName: React.PropTypes.string.isRequired, //название виджета
    isEditing: React.PropTypes.bool, //находится ли в режиме настройки виджет
    id: React.PropTypes.string, //уникальный идентификатор виджета

}

const mapStateToProps = {

}
export default WidgetPanel
