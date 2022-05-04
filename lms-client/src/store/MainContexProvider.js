import React from "react";
import { API_URI } from "../env";
import MainContext from "./main-context";

const defaultState = {
    user: null,
    error: null,
    cart: [],
    cartTotal: 0,
    wishlist: [],
    myCourse: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.payload,
            };
        case "SET_ERROR":
            return {
                ...state,
                error: action.payload,
            };
        case "ADD_TO_CART":
            return {
                ...state,
                cart: [...state.cart, action.payload],
                cartTotal: state.cartTotal * 1 + action.payload.price * 1,
            };
        case "REMOVE_FROM_CART":
            return {
                ...state,
                cart: state.cart.filter(
                    (item) => item._id !== action.payload._id
                ),
                cartTotal: state.cartTotal * 1 - action.payload.price * 1,
            };
        case "CLEAR_CART":
            return {
                ...state,
                cart: [],
                cartTotal: 0,
            };
        case "ADD_TO_WHISH_LIST":
            return {
                ...state,
                wishlist: [...state.wishlist, action.payload],
            };
        case "REMOVE_FROM_WHISH_LIST":
            return {
                ...state,
                wishlist: state.wishlist.filter(
                    (item) => item._id !== action.payload._id
                ),
            };
        case "CLEAR_WHISH_LIST":
            return {
                ...state,
                wishlist: [],
            };
        case "SET_CART_TOTAL":
            return {
                ...state,
                cartTotal: action.payload,
            };
        case "SET_CART":
            return {
                ...state,
                cart: action.payload,
            };
        case "SET_WISH_LIST":
            return {
                ...state,
                wishlist: action.payload,
            };
        case "SET_MY_COURSE":
            return {
                ...state,
                myCourses: action.payload,
            };
        case "ADD_COURSE":
            return {
                ...state,
                myCourses: [...state.myCourses, action.payload],
            };
        default:
            return state;
    }
};

export default function MainContexProvider({ children }) {
    const [mainReducer, dispatch] = React.useReducer(reducer, defaultState);

    const validateToken = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;
        try {
            const response = await fetch(`${API_URI}/user/validate`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (data.error) {
                localStorage.removeItem("token");
            } else {
                dispatch({
                    type: "SET_USER",
                    payload: data,
                });
            }
        } catch (err) {
            console.log(err);
        }
    };

    const inserToCart = async (cData, product) => {
        try {
            const response = await fetch(`${API_URI}/cart/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(cData),
            });
            const data = await response.json();
            if (response.status === 200 && data.cartStatus === "ADDED") {
                dispatch({
                    type: "ADD_TO_CART",
                    payload: product,
                });
            } else if (
                response.status === 200 &&
                data.cartStatus === "ALREADY_EXIST"
            ) {
                alert("Product already in cart");
            } else {
                dispatch({
                    type: "SET_ERROR",
                    payload: data.message,
                });
            }
        } catch (err) {
            console.log("message", err);
        }
    };

    const addToCart = async (product) => {
        const cData = {
            productId: product._id,
            quantity: 1,
            customerId: mainReducer.user._id,
            datetime: Date.now(),
        };
        const isInWishList = mainReducer.wishlist.find(
            (item) => item._id === product._id
        );
        if (isInWishList) {
            dispatch({
                type: "REMOVE_FROM_WHISH_LIST",
                payload: product,
            });
        }
        inserToCart(cData, product);
    };

    const removeFromCart = async (product) => {
        const cData = {
            productId: product._id,
            customerId: mainReducer.user._id,
        };

        try {
            const response = await fetch(`${API_URI}/cart/remove`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(cData),
            });
            const data = await response.json();
            if (response.status !== 200) {
                dispatch({
                    type: "SET_ERROR",
                    payload: data.message,
                });
            } else {
                dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: product,
                });
            }
        } catch (err) {
            console.log("message", err);
        }
    };

    const insertWishList = async (cData, product) => {
        try {
            const response = await fetch(`${API_URI}/wishlist/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(cData),
            });

            const data = await response.json();
            if (response.status === 200 && data.wishListStatus === "ADDED") {
                dispatch({
                    type: "ADD_TO_WHISH_LIST",
                    payload: product,
                });
            }
            if (response.status === 200 && data.wishListStatus === "REMOVED") {
                dispatch({
                    type: "REMOVE_FROM_WHISH_LIST",
                    payload: product,
                });
            }
            if (response.status === 200 && data.cartStatus === "REMOVED") {
                dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: product,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const addToWishList = async (product) => {
        const cData = {
            productId: product._id,
            customerId: mainReducer.user._id,
            datetime: Date.now(),
        };

        const isInCart = mainReducer.cart.find(
            (item) => item._id === product._id
        );

        if (isInCart) {
            dispatch({
                type: "REMOVE_FROM_CART",
                payload: product,
            });
        }

        await insertWishList(cData, product);
    };

    const removeFromWishlist = async (product) => {
        const cData = {
            productId: product._id,
            customerId: mainReducer.user._id,
        };

        const response = await fetch(`${API_URI}/wishlist/remove`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(cData),
        });
        const data = await response.json();
        if (response.status !== 200) {
            dispatch({
                type: "SET_ERROR",
                payload: data.message,
            });
        }
        dispatch({
            type: "REMOVE_FROM_WHISH_LIST",
            payload: product,
        });
    };

    const clearCart = async () => {
        const cData = {
            customerId: mainReducer.user._id,
        };
        const response = await fetch(`${API_URI}/cart/clear`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(cData),
        });
        const data = await response.json();
        if (response.status !== 200) {
            dispatch({
                type: "SET_ERROR",
                payload: data.message,
            });
        }
        dispatch({
            type: "CLEAR_CART",
        });
    };

    const clearWishlist = async () => {
        const cData = {
            customerId: mainReducer.user._id,
        };
        const response = await fetch(`${API_URI}/wishlist/clear`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(cData),
        });
        const data = await response.json();
        if (response.status !== 200) {
            dispatch({
                type: "SET_ERROR",
                payload: data.message,
            });
        }
        dispatch({
            type: "CLEAR_WHISH_LIST",
        });
    };

    const setUser = async (user) => {
        console.log(user);
        const getCart = await fetch(`${API_URI}/cart/all/${user._id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        const getWishlist = await fetch(`${API_URI}/wishlist/all/${user._id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        const cartData = await getCart.json();
        const wishlistData = await getWishlist.json();
        console.log(wishlistData);
        console.log(cartData);

        if (getWishlist.status !== 200 || getCart.status !== 200) {
            dispatch({
                type: "SET_ERROR",
                payload: "Something went wrong",
            });
        } else {
            dispatch({
                type: "SET_USER",
                payload: user,
            });
            dispatch({
                type: "SET_CART",
                payload: cartData.data,
            });
            dispatch({
                type: "SET_WISH_LIST",
                payload: wishlistData.data,
            });
        }
    };

    const value = {
        user: mainReducer.user,
        error: mainReducer.error,
        validateToken,
        setUser,
        setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
        addToCart,
        removeFromCart,
        clearCart,
        removeFromWishlist,
        clearWishlist,
        cart: mainReducer.cart,
        cartTotal: mainReducer.cartTotal,
        wishlist: mainReducer.wishlist,
        addWithWishlist: addToWishList,
        myCourse: mainReducer.myCourse,
        setMyCourse: (course) => dispatch({ type: "SET_MY_COURSE", payload: course }),
        addCourse: (course) => dispatch({ type: "ADD_COURSE", payload: course }),
        setAdmin: (admin) => dispatch({ type: "SET_USER", payload: admin }),
    };

    return (
        <MainContext.Provider value={value}>{children}</MainContext.Provider>
    );
}
