import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import Swal from "sweetalert2"

export const CartPage = () => {

  const {shoppingList, removeProduct, incrementQuantity, decrementQuantity} = useContext(CartContext)

  const total = shoppingList.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2)

  const handlerPurchase = () => {
    const productsPurchased = shoppingList.map(product => `${product.title} X ${product.quantity}`).join('\n')
    Swal.fire({
      title: 'Productos comprados',
      html: `<p> Has comprado: </p> <pre>${productsPurchased}</pre>`,
      icon: 'success',
      confirmButtonText: 'Aceptar'
    })
    
  }

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>

          {shoppingList.map(product => (
            <tr key={product.id}>
              <th scope="row">{product.title}</th>
              <td>${product.price}</td>
              <td>${product.quantity}</td>
              <td>
                <button className="btn btn-primary" onClick={() => decrementQuantity(product.id)}>-</button>
                {product.quantity}
                <button className="btn btn-primary" onClick={() => incrementQuantity(product.id)}>+</button>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => removeProduct(product.id)}>Eliminar</button>
              </td>
            </tr>
          ))}

          <tr>
            <th><b>TOTAL: </b></th>
            <td></td>
            <td></td>
            <td><b>${total}</b></td>
          </tr>
          
        </tbody>
      </table>

      <div className="d-grid gap-2">
        <button className="btn btn-primary" type="button" onClick={handlerPurchase}>Comprar</button>        
      </div>
    </>
  )
}
