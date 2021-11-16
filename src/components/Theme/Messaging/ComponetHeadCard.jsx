import React, { Component } from 'react'
import './static/style.css'

class ComponetHeadCard extends Component {
    render() {
        const { step, tab, desc, title } = this.props;
        const active = step === tab
        return (
            <div className={active? "card-mini-active": "card-mini"}>
                <div className={!active?"card-number":"card-number-active"}>
                    {step}
                </div>
                <div className="card-text">
                    <h5 className={active? "card-mini-title-active":"card-mini-title"}>{title}</h5>
                    <p className={active? "card-mini-desc-active":"card-mini-desc"}>{desc}</p>
                </div>
            </div>
        )
    }
}

export default ComponetHeadCard;
