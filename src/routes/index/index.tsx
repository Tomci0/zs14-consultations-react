import React from 'react';
import './main.scss';

import Header from '../../components/header';

const user = {
    name: 'John Doe',
    image: '/images/512.png',
    isTeacher: true,
    isAdmin: false,
};

export default function App() {
    return (
        <div className={'App container'}>
            {/* <div id="content">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12">
                            <div className="d-flex flex-column">
                                <div className="home-logo justify-content-center justify-content-lg-start">
                                    <img src="/images/zs14-logo.png" alt="logo" />
                                    <span>ZS14.pl</span>
                                </div>
                                <div className="home-text text-center text-lg-start mt-2">
                                    <span>
                                        Zgłaszanie się na spotkania konsultacyjne w naszym technikum nigdy nie było tak
                                        łatwe!
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div id="content">
                <div className="welcome-text">
                    <div className="logo">
                        <img src="/images/zs14-logo.png" alt="logo" />
                    </div>
                    <div className="text">
                        <span className="title">ZS14.pl</span>
                        <span className="info">
                            Zgłaszanie się na spotkania konsultacyjne w naszym technikum nigdy nie było tak proste!
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
