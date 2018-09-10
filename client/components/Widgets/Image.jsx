import React, { Component } from 'react';
import {connect} from 'react-redux'
import R from 'ramda'
import {changeImageUrl} from '../../actions/image'
import {widgetAction} from '../../actions/common'

const ImageSettings = ({id, url, onUrlChange}) =>
  (<div className="contnainer">
      <div className="col-sm-6">
        <img src={url} />
      </div>
      <div className="col-sm-6">
        <div className="form-group">

          <label  htmlFor={id + 'url-editor'}>Url:</label>
          <input  type="text"
                  className="form-control"
                  id={id + 'url-editor'}
                  value={url}
                  onChange={onUrlChange}
                  placeholder="http://..."
                  />
          </div>
      </div>


</div>)

const Image = ({urlFn, width, height, isEditing, id, onUrlChange}) =>
{
  const url = urlFn(id)
  return isEditing? <ImageSettings url={url} id={id} onUrlChange={onUrlChange(id)}/>
          : <img src={url} width={width} height={height}/>
}

const mapStateToProps = (state) => {
  return {
    urlFn: (id) => state.panels[id].widget.state.url || ''
  }
}

const mapDispatchToProps = (dispatch) => ({
  onUrlChange: (id) => {
    return (e) => {
      dispatch(widgetAction(id, changeImageUrl(e.target.value)))
    }
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Image)
