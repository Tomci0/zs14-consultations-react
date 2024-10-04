import React from 'react';
import './main.scss';

export default function WelcomeCard() {
    return (
        <div id="content">
            <div id="welcome-card">
                <img className="logo" src="/images/zs14-logo.png" alt="logo" />
                <div className="text">
                    <span className="title">ZS14.pl</span>
                    <span className="info">
                        Zgłaszanie się na spotkania konsultacyjne w naszym technikum nigdy nie było tak proste!
                    </span>
                </div>
            </div>
        </div>
    );
}
