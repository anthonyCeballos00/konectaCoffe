import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({})

  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:/api/product/save', inputs).then(function(response){
      console.log(response.data);
      navigate('/');

    });
  }

  return (
    <div className="container">
      <h1>Crear producto</h1>
      <form onSubmit={handleSubmit} >
        <table className="table table-dark table-striped" cellSpacing="10" >
          <tbody>
            <tr>
              <th>
                <label>Nombre: </label>
              </th>
              <td>
                <input type="text" name="name" onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <th>
                <label>Referencia: </label>
              </th>
              <td>
                <input type="text" name="referencia" onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <th>
                <label>Precio: </label>
              </th>
              <td>
                <input type="number" name="precio" onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <th>
                <label>Peso: </label>
              </th>
              <td>
                <input type="number" name="peso" onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <th>
                <label>Categoria: </label>
              </th>
              <td>
                <input type="text" name="categoria" onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <th>
                <label>Stock: </label>
              </th>
              <td>
                <input type="number" name="stock" onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <td align="rigth" colSpan="2" >
                <button className="btn btn-primary">Guardar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default CreateProduct;
