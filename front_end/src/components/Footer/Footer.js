import React, { Component } from 'react';

class Footer extends Component {
    render() {
        var style = {
            backgroundColor: "#F8F8F8",
            borderTop: "1px solid #E7E7E7",
            textAlign: "center",
            padding: "20px",
            position: "fixed",
            left: "0",
            bottom: "0",
            height: "60px",
            width: "100%",
        }

        var phantom = {
            display: 'block',
            height: '60px',
            width: '100%',
        }
        var children = "18HCB Copyright";
        return (
            <footer className="footer">
                <div className="container">
                    <nav style={phantom} />
                    <div style={style}>
                        {children}
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
