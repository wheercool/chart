import React, { Component } from 'react';

const SettingButton = (props) => (
    <button {...props} type="button" className={`${props.className} btn btn-default`}>
        <span aria-hidden="true" className="glyphicon glyphicon-cog"></span>
    </button>)

export default SettingButton