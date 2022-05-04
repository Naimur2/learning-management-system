import React from "react";
import Star from "../../icons/star";
import "./CourseCard.scss";

export default function CourseCard({
    image,
    title,
    description,
    price,
    offerPrice,
    rating,
    onClick,
}) {
    return (
        <div className="course-card" onClick={onClick}>
            <div className="course-card-image">
                <img
                    src={
                        image ||
                        "https://html.com/wp-content/uploads/html-hpg-featured-new.png"
                    }
                    alt="fds"
                    className="course-card-image img-fluid"
                />
            </div>
            <div className="course-card-content">
                <h3 className="course-card-title">
                    {title ||
                        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro,"}
                </h3>
                <p className="course-card-description">
                    {description ||
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit."}
                </p>
                <div className="course-ratings">
                    <p className="course-card-ratings-value">
                        {rating || 4.5}/5
                    </p>
                    <div className="course-card-stars">
                        <span className="icon icon-star-filled"></span>
                        <span className="icon icon-star-filled"></span>
                        <span className="icon icon-star-filled"></span>
                        <span className="icon icon-star-filled"></span>
                        <span className="icon icon-star-half-empty"></span>
                    </div>
                </div>
                <div className="course-card-price">
                    <p>${price || 100}</p>
                    {offerPrice && <p>${offerPrice}</p>}
                </div>
            </div>
        </div>
    );
}
