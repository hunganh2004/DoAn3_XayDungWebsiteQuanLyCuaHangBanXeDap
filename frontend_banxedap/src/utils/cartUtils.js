
export function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const productIndex = cart.findIndex(item => item.id === product.id);

    if (productIndex >= 0) {
        cart[productIndex].so_luong+= 1;
    }
    else {
        cart.push({
            ...product,
            so_luong: 1,
        })
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateQuantity(product, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const updateCart = cart.map(item => 
        item.id === product.id ? {...item, so_luong: quantity} : item
    )

    localStorage.setItem('cart', JSON.stringify(updateCart));
}

export function removeFromCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const updateCart = cart.filter(item => item.id !== product.id);

    localStorage.setItem('cart', JSON.stringify(updateCart));
}

export function getTotalQuantity() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    return cart.reduce((total, item) => total + item.so_luong, 0);
}

export function getTotalPrice() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    return cart.reduce((total, item) => total + item.gia_ban * item.so_luong, 0);
}

export function productInCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const listId = cart.map(item => item.id);
    return listId;
}

