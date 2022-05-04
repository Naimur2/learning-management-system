import React from "react";
import "./course-details.scss";
import { BsHeart, BsStarFill, BsStarHalf, BsHeartFill } from "react-icons/bs";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "./../../hooks/use-auth";
import MainContext from "./../../store/main-context";
import { API_URI } from "../../env";
import BSModal from "./BSModal";

export default function CourseDetails() {
    const { id } = useParams();
    const [course, setCourse] = React.useState([]);
    const auth = useAuth();
    const navigate = useNavigate();
    const mainCtx = React.useContext(MainContext);
    const isInCart = mainCtx.cart.find((item) => item._id === course._id);
    const isInWishlist = mainCtx.wishlist.find(
        (item) => item._id === course._id
    );

    React.useEffect(() => {
        const getProductData = async () => {
            try {
                const result = await fetch(`${API_URI}/course/product/${id}`);
                const data = await result.json();
                setCourse(data.data);
                console.log(data.data);
            } catch (error) {
                console.log(error);
            }
        };
        getProductData();
    }, [id]);

    const addToCart = async () => {
        if (!auth) {
            navigate("/login");
            return;
        }

        if (isInWishlist) {
            console.log("in wishlist");
            mainCtx.removeWishlistState(course[0]);
            await mainCtx.addToCart(course[0]);
        } else {
            await mainCtx.addToCart(course[0]);
        }
    };
    const [showModal, setShowModal] = React.useState(false);

    const addTomyCourse = async () => {
        const userId = mainCtx.user._id;
        const crs = course[0];
        const data = {
            userId,
            courseId: crs._id,
        };
        const result = await fetch(`${API_URI}/course/add-mycourse`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const res = await result.json();
        if (res.status === 200 && data.type === "ADDED_TO_MY_COURSE") {
            setShowModal(false);
            alert("Course added to your course list");
            mainCtx.addMyCourse(res.data);
        } else {
            alert("Course already added to your course list");
        }
    };

    const buyProduct = (course) => {
        if (!auth) {
            navigate("/login");
            return;
        }
        setShowModal(true);
    };

    const addToWishlist = async () => {
        if (!auth) {
            navigate("/login");
            return;
        }

        const crs = course[0];
        if (isInCart) {
            mainCtx.removeCartState(crs);
            await mainCtx.addWithWishlist(crs);
        } else {
            await mainCtx.addWithWishlist(crs);
        }
    };

    return (
        <section>
            <BSModal
                show={showModal}
                onClose={() => setShowModal((prev) => !prev)}
                onAgree={addTomyCourse}
            />
            {course.length > 0 && (
                <div className="container course-info">
                    <div className="course-info-description">
                        <h2 className="course-info-title">
                            {course[0].course_name}
                        </h2>
                        <p className="course-info-details">
                            {course[0].description}
                        </p>
                        <div className="course-ratings">
                            <h4>{course[0].ratings}</h4>
                            <div className="ratings-stars">
                                <BsStarFill />
                                <BsStarFill />
                                <BsStarFill />
                                <BsStarFill />
                                <BsStarHalf />
                            </div>
                        </div>
                        <div className="course-info-provides">
                            <h5 className="course-info-provides-title">
                                This course includes
                            </h5>
                            <ul className="course-info-list">
                                {course[0]["includes"] &&
                                    JSON.parse(course[0]["includes"]).map(
                                        (item, idcx) => (
                                            <li key={idcx}>{item}</li>
                                        )
                                    )}
                            </ul>
                        </div>
                    </div>
                    <div className="course-info-card-container">
                        <div className="course-info-card">
                            <div className="course-info-card-image">
                                <img src={course[0].image} alt="imagef" />
                            </div>
                            <div className="course-info-price">
                                <h4>${course[0].price}</h4>
                                <h4>${course[0].offer_price}</h4>
                            </div>
                            <div className="add-like">
                                <button
                                    onClick={addToCart}
                                    className="btn btn-primary add-to-cart"
                                >
                                    Add to cart
                                </button>
                                <div onClick={addToWishlist} className="love">
                                    {isInWishlist ? (
                                        <BsHeartFill />
                                    ) : (
                                        <BsHeart />
                                    )}
                                </div>
                            </div>
                            <div className="add-like">
                                <button
                                    onClick={() => buyProduct(course[0])}
                                    className="btn btn-success"
                                >
                                    Buy now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
