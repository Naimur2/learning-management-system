import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import CourseCard from "../../components/course-card/CourseCard";
import BSModal from "../course-details/BSModal";
import "./courses.scss";

export default function Courses() {
    const [courses, setCourses] = React.useState([]);
    const navigation = useNavigate();

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1700 },
            items: 3.5,
            partialVisibilityGutter: 100,
        },
        fablet: {
            breakpoint: { max: 1700, min: 1400 },
            items: 3.5,
        },
        tablet: {
            breakpoint: { max: 1400, min: 1180 },
            items: 2.75,
        },
        notepad: {
            breakpoint: { max: 1180, min: 980 },
            items: 2.3,
        },
        mobile: {
            breakpoint: { max: 980, min: 768 },
            items: 1.75,
        },
        smallmobile: {
            breakpoint: { max: 768, min: 0 },
            items: 1,
        },
    };

    React.useEffect(() => {
        fetch("http://localhost:5000/course/all/")
            .then((res) => res.json())
            .then((data) => {
                setCourses(data.data);
            });
    }, []);

    const grouped =
        courses &&
        courses.length > 0 &&
        courses.reduce((acc, cur) => {
            if (!acc[cur.category]) {
                acc[cur.category] = [];
            }
            acc[cur.category].push(cur);
            return acc;
        }, {});

    return (
        <section>
            {grouped &&
                Object.keys(grouped).map((key, idx) => {
                    return (
                        <>
                            <div className="container" key={idx.toString()}>
                                <h2 className="courses-title">
                                    {grouped[key][0].category.replace(
                                        /_/g,
                                        " "
                                    )}
                                </h2>
                                <Carousel
                                    draggable={false}
                                    responsive={responsive}
                                    autoPlay={false}
                                >
                                    {grouped[key].map((course, id) => (
                                        <CourseCard
                                            title={course.course_name}
                                            description={course.description}
                                            price={course.price}
                                            image={course.image}
                                            offerPrice={course.offer_price}
                                            rating={course.rating}
                                            key={id.toString()}
                                            courseId={course._id}
                                            onClick={() =>
                                                navigation(
                                                    `/course/${course._id}`
                                                )
                                            }
                                        />
                                    ))}
                                </Carousel>
                            </div>
                        </>
                    );
                })}
        </section>
    );
}
