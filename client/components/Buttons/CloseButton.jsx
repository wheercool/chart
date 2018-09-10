import React, { Component } from 'react';

const test = () => alert('WTF');

const CloseButton = (props) => (
    <button {...props} type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>)

export default CloseButton