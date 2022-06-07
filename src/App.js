import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import CreateProduct from "./components/CreateProduct";
import EditProduct from "./components/EditProduct";
import List from "./components/List";
import Tienda from "./components/Tienda";

function App() {
  return (
    <div className="container-fluid">
      <BrowserRouter>
        <nav className="navbar navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#" style={{fontSize: '40px'}}>
              Konecta Coffee
            </a>
            <div>
              <ul>
                <li className="nav-item">
                  <Link to="/" style={{color: 'white', fontSize:'20px'}}>Productos</Link>
                </li>
                <li className="nav-item">
                  <Link to="product/create" style={{color: 'white', fontSize:'20px'}}>Crear Producto</Link>
                </li>
                <li className="nav-item">
                  <Link to="tienda" style={{color: 'white', fontSize:'20px'}}>Tienda</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route index element={<List />} />
          <Route path="product/create" element={<CreateProduct />} />
          <Route path="product/:id/edit" element={<EditProduct />} />
          <Route path="tienda" element={<Tienda />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
