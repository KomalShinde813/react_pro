import React from 'react'
import ReactDOM from 'react-dom';

import './ModalPopup.scss'

let ModalPopup = function (props) { //isVisible, onClose, closePopup

    function closePopup(){
        props.closePopup();
        props.onClose && props.onClose()
    }

    return ReactDOM.createPortal(<div className={`popup-container ${props.isVisible ? "show" : ""}`}>
        <div className="overlay" onClick={closePopup}></div>
        <div className={`popup ${props.className || ''}`} style={props.style}>
            <div className="popup-heading">
                <span>{props.title}</span>
                <span className="btn-close" onClick={closePopup}>&times;</span>
            </div>
            {props.children}
        </div>
    </div>, document.body)
};

export default ModalPopup;