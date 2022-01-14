import React, { Component } from "react";
import styles from './tableTime.module.css';

export default class OneTableTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: '',
            taken: ''
        };
    }
    
    render() {
        return (
            <div>
                <button 
                    className={styles.tableButton}
                    capacity={this.props.capacity}
                    disabled={this.props.capacity == '1' ? true : ''}
                >{this.props.time}:00</button>
            </div>
        )
    }
}