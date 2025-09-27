import { useState, useEffect } from 'react'
import { Button } from 'primereact/button'
import { getTotalPrice, removeFromCart, updateQuantity } from '../utils/cartUtils'
import '../styles/cartpage.css'
import { useNavigate } from 'react-router-dom'

export default function CartPage({handleReload}) {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const cartData = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(cartData);
    }, []);

    const handleRemove = (productId) => {
        removeFromCart({ id: productId });
        setCart(cart.filter(item => item.id !== productId));
        handleReload();
    }

    const handleQuantityChange = (productId, quantity) => {
        if (quantity < 1) return;
        updateQuantity({ id: productId }, quantity);
        setCart(cart.map(item =>
            item.id === productId ? { ...item, so_luong: quantity } : item
        ));
        handleReload();
    }

    const handleCheckout = () => {
        navigate('/checkout');
    }


    return (
        <div className='cart-page'>
            <div className={`cart-items-container`}>
                <h2 className='cart-header'>Giỏ hàng</h2>
                <div className='cart-items'>
                    {cart.length === 0 ? (
                        <p>Giỏ hàng của bạn đang trống!</p>) : (
                        cart.map(item => (
                            <div key={item.id} className='cart-item'>
                                <img src={item.anh_san_pham || 'images/default-product.png'} alt={item.ten_san_pham} />
                                <div className="cart-item-info">
                                    <h3>{item.ten_san_pham}</h3>
                                    <p>{item.gia_ban.toLocaleString()} VNĐ</p>
                                    <div className="quantity-container">
                                        <input
                                            type="number"
                                            value={item.so_luong}
                                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                            min={1}
                                            />
                                        <Button label='Xóa' onClick={() => handleRemove(item.id)}  />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className='cart-total'>
                    <h3>Tổng tiền: {getTotalPrice().toLocaleString()} VNĐ</h3>
                    <Button label='Đặt hàng' className='p-button-success' onClick={handleCheckout} />
                </div>
            </div>
        </div>
    )
}
