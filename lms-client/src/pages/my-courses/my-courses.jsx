import React from "react";
import { Container } from "react-bootstrap";
import MainContext from "./../../store/main-context";

export default function MyCourse() {
    const mainCtx = React.useContext(MainContext);

    const courses = mainCtx.mycourse;
    return (
        <Container>
            <h1>My Courses</h1>
            {courses &&
                courses.map((item) => (
                    <div className="course-wishlist">
                        <div className="course-image">
                            <img
                                src="https://blog.hubspot.com/hubfs/html-css-javascript.jpg"
                                alt=""
                            />
                        </div>
                        <div className="center course-description">
                            <h2>{item.course_name}</h2>
                            <p>{item.description}</p>
                        </div>
                        <div className="center course-price">
                            <p>${item.price}</p>
                        </div>
                        <div className="center delete-course">
                            <button className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                ))}
        </Container>
    );
}
