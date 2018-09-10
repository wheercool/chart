import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux'

import ReactGridLayout, {WidthProvider} from 'react-grid-layout';
import {trace, log, elementSize} from '../../utils'
import WidgetPanel from '../WidgetPanel/WidgetPanel'
import {changeWidget} from '../../actions/widget'
const Layout = WidthProvider(ReactGridLayout);

const widgetSize = (el) => {
    const headerSize = 41;
    const scrollHeight = 20;
    var size = elementSize(el);

    return  {
        width: size.width,
        height: size.height - headerSize - scrollHeight
    }
}

/*
    Дашборд - контейнер для панелей виджетов
    Ответсвенность: расположение панелей виджетов
*/
const Dashboard = React.createClass({
    render() {
        const { isEditing,
                layout,
                widgets,
                onPanelRemove, onWidgetChange, onLayoutChanged} = this.props;      
        return (
             <Layout className="layout"
                 layout={layout}
                 isDraggable={isEditing}
                 isResizable={isEditing}

                 cols={12} rowHeight={30}
                 onLayoutChange={onLayoutChanged}>
                 {
                    widgets.map(widget =>
                        <WidgetPanel
                            id={widget.id}
                            key={widget.id}
                            widgetName={widget.name}
                            title={widget.name}
                            className="panel"
                            isEditing={isEditing}
                            onPanelRemove={onPanelRemove}
                            onWidgetChange={onWidgetChange.bind(null, widget.id)}>
                        </WidgetPanel>)
                 }
            </Layout>
        )
    }
})
const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({
    onWidgetChange: (id, name) => {
        dispatch(changeWidget(id, name))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
