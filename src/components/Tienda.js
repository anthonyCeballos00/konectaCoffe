import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Tienda = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [cont, setCont] = useState(0);

  useEffect(() => {
    getProducts();
  }, [cont]);

  const getProducts = () => {
    axios.get("http://localhost:/api/product/").then(function (response) {
      console.log(response.data);
      setProducts(response.data);
    });
  };

  const venderProducto = (p) => {
     const valor = parseInt(p.stock);
    if (valor > 0) {
      const nVal = valor - 1;
      const prod = { ...p, stock: nVal };
      console.log(prod);

      axios
        .put(`http://localhost:/api/product/${p.id}/edit`, prod)
        .then(function (response) {
          console.log(response.data);
          setCont(cont + 1);
        });
        
        
        
    } else {
        alert("Lo sentimos. Ya no hay Stock de este producto");
    }
    
  };

  return (
    <div className="container-fluid">
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
          {products.map((product, key) => (
            <tr key={key}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.referencia}</td>
              <td>{product.precio}</td>
              <td>{product.peso}</td>
              <td>{product.categoria}</td>
              <td>{product.stock}</td>
              <td>{product.fecha_create}</td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => venderProducto(product)}
                >
                  Vender
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tienda;
