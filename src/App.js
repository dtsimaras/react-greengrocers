import './styles/reset.css'
import './styles/index.css'
import initialStoreItems from './store-items'
import { useState, useEffect } from 'react'

// TODO: break into components
// TODO: complete extensions
export default function App() {
  const [cartProducts, setCartProducts] = useState([])
  const [total, setTotal] = useState(0.00)

  const handleAddProduct = (product) => {
    let updatedProducts = []
    if (cartProducts.includes(product)) {
      updatedProducts = cartProducts.map((item) => {
        if (item === product)
          item.quantity++
        return item
      })
    } else {
      product.quantity = 1
      updatedProducts = [...cartProducts, product]
    }
    setCartProducts(updatedProducts)
  }

  const handleRemoveQuantity = (product) => {
    const updatedProducts = cartProducts.map(item => {
      if (item === product) {
        item.quantity--
      }
      return item
    }).filter(item => item.quantity >= 1)
    setCartProducts(updatedProducts)
  }

  const handleAddQuantity = (product) => {
    const updatedProducts = cartProducts.map(item => {
      if (item === product) {
        item.quantity++
      }
      return item
    })
    setCartProducts(updatedProducts)
  }

  useEffect(() => {
    let totalPrice = 0
    cartProducts.forEach(product => {
      totalPrice += product.price * product.quantity
    })
    setTotal(totalPrice)
  })

  return (
    <>
      <header id="store">
        <h1>Greengrocers</h1>
        <ul className="item-list store--item-list">
          {initialStoreItems.map(item => {
            return (
              <li key={item.id}>
                <div className="store--item-icon">
                  <img src={'/assets/icons/' + item.id + '.svg'} alt="beetroot" />
                </div>
                <button onClick={() => handleAddProduct(item)}>Add to cart</button>
              </li>
            )
          })}
        </ul>
      </header>
      <main id="cart">
        <h2>Your Cart</h2>
        <div className="cart--item-list-container">
          <ul className="item-list cart--item-list">
            {cartProducts.map(product => {
              return (
                <li key={product.id}>
                  <img
                    className="cart--item-icon"
                    src={'/assets/icons/' + product.id + '.svg'}
                    alt={product.name}
                  />
                  <p>{product.name}</p>
                  <button className="quantity-btn remove-btn center" onClick={() => handleRemoveQuantity(product)}>-</button>
                  <span className="quantity-text center">{product.quantity}</span>
                  <button className="quantity-btn add-btn center" onClick={() => handleAddQuantity(product)}>+</button>
                </li>

              )
            })}
          </ul>
        </div>
        <div className="total-section">
          <div>
            <h3>Total:$</h3>
          </div>
          <div>
            <span className="total-number">£{total.toFixed(2)}</span>
          </div>
        </div>
      </main>
      <div>
        Icons made by
        <a
          href="https://www.flaticon.com/authors/icongeek26"
          title="Icongeek26"
        >
          Icongeek26
        </a>
        from
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </>
  )
}
