import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const List = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    axios.get("http://localhost:/api/product/").then(function (response) {
      console.log(response.data);
      setProducts(response.data);
    });
  };

  const deleteProduct = (id) => {
    axios.delete(`http://localhost:/api/product/${id}/delete`).then(function(response){
      console.log(response.data);
      getProducts();
    })
  }

  return (
    <div>
      <h1>Lista de Productos</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Referencia</th>
            <th>Precio</th>
            <th>Peso</th>
            <th>Categoría</th>
            <th>Stock</th>
            <th>Fecha de creación</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, key) => 
          <tr key={key} >
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.referencia}</td>
            <td>{product.precio}</td>
            <td>{product.peso}</td>
            <td>{product.categoria}</td>
            <td>{product.stock}</td>
            <td>{product.fecha_create}</td>
            <td>
              <button className="btn btn-secondary" style={{marginRight:"7px"}}>
              <Link to={`product/${product.id}/edit`} style={{ color:"white"}} >Editar</Link>
              </button>              
              <button className="btn btn-danger" onClick={() => deleteProduct(product.id)} >Delete</button>
            </td>
          </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default List;
