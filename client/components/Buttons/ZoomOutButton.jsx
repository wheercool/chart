import React, { Component } from 'react';

const Button = (props) => (
    <button {...props} type="button" className={`${props.className} btn btn-default`}>
        <span aria-hidden="true" className="glyphicon glyphicon-zoom-out"></span>
    </button>)

export default Button