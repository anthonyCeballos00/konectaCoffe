<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
//echo "Probando";

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "GET":
        $sql = "SELECT * FROM products";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $products = $stmt->fetch(PDO::FETCH_ASSOC);
        }else{
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        };
        
        echo json_encode($products);
        break;

    case "POST": 
        $product = json_decode(file_get_contents('php://input') );
        $sql = "INSERT INTO products(id, name, referencia, precio, peso, categoria, stock, fecha_create) VALUES(null, :name, :referencia, :precio, :peso, :categoria, :stock, :fecha_create)";
        $stmt = $conn->prepare($sql);
        $fecha_create = date('Y-m-d');
        $stmt->bindParam(':name', $product->name);
        $stmt->bindParam(':referencia', $product->referencia);
        $stmt->bindParam(':precio', $product->precio, PDO::PARAM_INT);
        $stmt->bindParam(':peso', $product->peso, PDO::PARAM_INT);
        $stmt->bindParam(':categoria', $product->categoria);
        $stmt->bindParam(':stock', $product->stock, PDO::PARAM_INT);
        $stmt->bindParam(':fecha_create', $fecha_create);
        if($stmt->execute()) {
            $response = ['status' =>1, 'message' => 'Producto creado satisfactoriamente.'];
        }else {
            $response = ['status' =>0, 'message' => 'No se pudo crear el producto'];
        }
        echo json_encode($response);
        break;

        case "PUT": 
            $product = json_decode(file_get_contents('php://input') );
            $sql = "UPDATE products SET name= :name, referencia =:referencia, precio =:precio, peso =:peso, categoria =:categoria, stock =:stock, fecha_create =:fecha_create WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $fecha_create = date('Y-m-d');
            $stmt->bindParam(':id', $product->id);
            $stmt->bindParam(':name', $product->name);
            $stmt->bindParam(':referencia', $product->referencia);
            $stmt->bindParam(':precio', $product->precio, PDO::PARAM_INT);
            $stmt->bindParam(':peso', $product->peso, PDO::PARAM_INT);
            $stmt->bindParam(':categoria', $product->categoria);
            $stmt->bindParam(':stock', $product->stock, PDO::PARAM_INT);
            $stmt->bindParam(':fecha_create', $fecha_create);
            if($stmt->execute()) {
                $response = ['status' =>1, 'message' => 'Producto modificado satisfactoriamente.'];
            }else {
                $response = ['status' =>0, 'message' => 'No se pudo modificar el producto'];
            }
            echo json_encode($response);
            break;

        case "DELETE":
            $sql = "DELETE FROM products WHERE id = :id";
            $path = explode('/', $_SERVER['REQUEST_URI']);
            
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            
            if($stmt->execute()) {
                $response = ['status' =>1, 'message' => 'Producto eliminado satisfactoriamente.'];
            }else {
                $response = ['status' =>0, 'message' => 'No se pudo eliminar el producto'];
            }
            echo json_encode($response);
            break;

}