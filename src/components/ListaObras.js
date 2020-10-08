import React, { useState, useEffect } from "react";

import { db } from "../conectafb";
import ItemLista from "./ItemLista";

const ListaObras = () => {
  // cria um array vazio para conter a lista de filmes
  const [obras, setObras] = useState([]);

  // function para listar os filmes a cada modificação na collection
  const getObras = async () => {
    // obtém os dados A CADA MODIFICAÇÃO da collection (tabela) filmes
    db.collection("obras")
      .orderBy("titulo")
      .onSnapshot((dados) => {
        const docs = [];
        dados.forEach((obra) => {
          //console.log(filme.data());
          //console.log(filme.id);
          docs.push({ ...obra.data(), id: obra.id });
        });
        //console.log(docs);
        setObras(docs);
      });
  };

  // define o que será executado logo após o componente ser renderizado
  useEffect(() => {
    getObras();
  }, []);

  return (
    <div className="container mt-2">
      <div className="card-columns">
        {obras.map((obra) => (
            <ItemLista 
                id={obra.id}
                titulo={obra.titulo}
                foto={obra.foto}
                autor={obra.autor}
                minimo={obra.minimo} />
        ))}
      </div>
    </div>
  );
};

export default ListaObras;
