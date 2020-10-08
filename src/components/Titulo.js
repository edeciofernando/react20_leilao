import React from 'react';
import {Link} from 'react-router-dom';

const Titulo = () => {
    return (
        <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
            <Link className="navbar-brand" to="/">
                <img src="leilao.png" alt="Logo do Leilão" width="40"/>
                Leilão de Obras de Arte
            </Link>
        </nav>
    );
}

export default Titulo;