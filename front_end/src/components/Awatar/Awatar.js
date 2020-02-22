import React, {Component} from 'react';
import styles from './Awatar.css';

class Awatar extends Component {
    render() {
        var nullHref = '#';
        return (
            <a className={`pullLeft ${styles.awatar}`} href={nullHref}>
                <img className="media-object dp img-circle" src="http://www.huffmancode.com/img/hardik.jpg"
                     alt="Awatar"/>
            </a>
        );
    }
}

export default Awatar;
