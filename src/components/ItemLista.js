import React from "react";
import {Link} from 'react-router-dom';

const ItemLista = (props) => {
  return (
    <div className="card" key={props.id}>
      <img className="card-img-top" src={props.foto} alt="Obra de Arte" />
      <div className="card-body">
        <h4>{props.titulo}</h4>
        <p>Autor: {props.autor}<br/>
          Lance Mínimo:{" "}
          {props.minimo.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
        <Link to={`/detalhes/${props.id}`} className="btn btn-block btn-info">
            Ver Detalhes    
        </Link>          
      </div>
    </div>
  );
};

export default ItemLista;
