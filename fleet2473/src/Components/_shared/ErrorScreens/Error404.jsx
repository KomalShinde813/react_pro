import React from 'react';
import { Container, Typography } from '@material-ui/core';

import './Error404.scss'

let Error404 = () => {
    return <Container maxWidth="xs">
        <div className="top">
            <Typography variant="h2" align="center" color="error">404</Typography>
            <Typography variant="h4" noWrap align="center" color="error">Page not found.</Typography>
        </div>
        <div className="ghost-container">
            <div className="ghost-copy">
                <div className="one"></div>
                <div className="two"></div>
                <div className="three"></div>
                <div className="four"></div>
            </div>
            <div className="ghost">
                <div className="face">
                    <div className="eye"></div>
                    <div className="eye-right"></div>
                    <div className="mouth"></div>
                </div>
            </div>
            <div className="shadow"></div>
        </div>
    </Container>
}

export default Error404;