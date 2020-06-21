import React from 'react';
import { Container } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

//Functional Component 
const Erorr404 = () => {
    return (
        <Container>
            <div className="text-center">
                <h3>404 Page not found</h3>
            </div>
        </Container>
    );
};

export default Erorr404;