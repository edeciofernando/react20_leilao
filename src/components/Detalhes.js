import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { db } from "../conectafb";

const Detalhes = () => {
  const { id } = useParams();

  const [obra, setObra] = useState({});
  const [aviso, setAviso] = useState("");

  const { register, handleSubmit, errors } = useForm();

  const getObra = async (id) => {
    const doc = await db.collection("obras").doc(id).get();

    if (doc.exists) {
      setObra({ id: doc.id, ...doc.data() });
    } else {
      // doc.data() will be undefined in this case
      console.log("Erro...");
    }

//    console.log(doc);
  };

  // indica o que será executado logo após a renderização deste componente
  // dependente do id que foi passado por parâmetro
  useEffect(() => {
    getObra(id);
  }, [id]);

  const gravaLance = (data, e) => {
    try {
      db.collection("obras").doc(id).collection("lances").add(data);
      setAviso("Ok! Lance cadastrado com sucesso");
    } catch (erro) {
      setAviso("Erro: " + erro);
    }
    tempoAviso();

    e.target.reset();
  };

  const tempoAviso = () => {
    setTimeout(() => {
      setAviso("");
    }, 5000);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 mt-2">
          <div className="card">
            <img
              src={obra.foto}
              className="card-img-top img-fluid"
              alt="Quadro"
            />
            <div className="card-body">
              <h4 className="card-title">{obra.titulo}</h4>
              <h6 className="card-title">
                Autor:
                {obra.autor}
              </h6>
              <p className="card-text">{obra.descricao}</p>
              <p className="card-text">
                Lance Mínimo:
                {obra.minimo
                  ? obra.minimo.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })
                  : ""}
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm-6 mt-2">
          <button className="btn btn-danger btn-lg btn-block">
            GOSTOU? DÊ UM LANCE!
          </button>
          <div className="card">
            <div className="card-body">
              <p className="card-text">
                * Os leilões ocorrem no último dia útil do mês
              </p>
              <form onSubmit={handleSubmit(gravaLance)}>
                <div className="input-group mt-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="far fa-user"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nome Completo"
                    name="nome"
                    ref={register({ required: true })}
                  />
                </div>
                <div className="input-group mt-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i class="fas fa-at"></i>
                    </span>
                  </div>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="E-mail para contato"
                    name="email"
                    ref={register({ required: true })}
                  />
                </div>
                <div className="input-group mt-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i class="fas fa-phone"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Telefone (com DDD)"
                    name="fone"
                    ref={register({ required: true })}
                  />
                </div>
                <div className="input-group mt-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i class="fas fa-dollar-sign"></i>
                    </span>
                  </div>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="R$ do seu lance"
                    name="valor"
                    ref={register({ required: true, min: obra.minimo })}
                  />
                </div>

                <div
                  className={
                    (errors.nome ||
                      errors.email ||
                      errors.fone ||
                      errors.valor) &&
                    "alert alert-danger mt-3"
                  }
                >
                  {errors.valor && <span>Informe um lance superior ao lance mínimo... </span>}

                  {(errors.nome ||
                    errors.email ||
                    errors.fone) && (
                    <span>Por favor, preencha todos os campos</span>
                  )}
                </div>

                <input
                  type="submit"
                  className="btn btn-danger float-right mt-3"
                  value="Enviar Lance"
                />
                <Link to={"/"} className="btn btn-success float-left mt-3">
                  Retornar
                </Link>
              </form>
            </div>
          </div>

          <div className={aviso && "alert alert-danger mt-3"}>
            {aviso && <span>{aviso}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detalhes;
