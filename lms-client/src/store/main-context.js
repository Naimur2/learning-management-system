import React from "react";

const MainContext = React.createContext({
    user: null,
    validateToken: () => {},
    error: null,
    setError: () => {},
    setUser: () => {},
    addToCart: () => {},
    removeFromCart: () => {},
    clearCart: () => {},
    cart: [],
    cartTotal: 0,
    setCartTotal: () => {},
    wishlist: [],
    removeFromWishlist: () => {},
    clearWishlist: () => {},
    addWithWishlist: () => {},
    mycourse: [],
    setMycourse: () => {},
    addCourse: () => {},
    setAdmin: () => {},
});

export default MainContext;
