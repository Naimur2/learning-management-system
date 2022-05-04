import React from "react";
import { Button, Container, Form, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { API_URI } from "../../env";
import MainContext from "../../store/main-context";

export default function AddCourse() {
    const navigate = useNavigate();
    const [courseName, setCourseName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [offerPrice, setOfferPrice] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [image, setImage] = React.useState("");
    const [provides, setProvides] = React.useState("");

    const handleChange = (e, type) => {
        switch (type) {
            case "courseName":
                setCourseName(e.target.value);
                break;
            case "description":
                setDescription(e.target.value);
                break;
            case "price":
                setPrice(e.target.value);
                break;
            case "offerPrice":
                setOfferPrice(e.target.value);
                break;
            case "category":
                setCategory(e.target.value);
                break;
            case "image":
                setImage(e.target.value);
                break;
            case "provides":
                setProvides(e.target.value);
                break;

            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const courseProvides = provides.split(",");
        const formData = {
            courseName,
            description,
            price,
            offerPrice,
            category,
            image,
            provides: courseProvides,
        };
        try {
            const response = await fetch(`${API_URI}/course/add`, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();

            if (response.status !== 200) {
                alert("Error");
            } else {
                alert("Course added successfully");
                navigate("/dashboard");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Container className="mt-4">
            <h1>Add new Course</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="courseName">
                    <Form.Label>Course Name</Form.Label>
                    <Form.Control
                        onChange={(e) => handleChange(e, "courseName")}
                        required
                        type="text"
                        placeholder="Enter your courseName"
                        value={courseName}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="courseDescription">
                    <Form.Label>Course Description</Form.Label>
                    <Form.Control
                        onChange={(e) => handleChange(e, "description")}
                        required
                        type="text"
                        placeholder="Enter your course description"
                        value={description}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="coursePrice">
                    <Form.Label>Course Price</Form.Label>
                    <Form.Control
                        onChange={(e) => handleChange(e, "price")}
                        required
                        type="text"
                        placeholder="Enter your course price"
                        value={price}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="courseOfferPrice">
                    <Form.Label>Course Offer Price</Form.Label>
                    <Form.Control
                        onChange={(e) => handleChange(e, "offerPrice")}
                        required
                        type="text"
                        placeholder="Enter your course offer price"
                        value={offerPrice}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="courseCategory">
                    <Form.Label>Course Category</Form.Label>
                    <Form.Control
                        onChange={(e) => handleChange(e, "category")}
                        required
                        type="text"
                        placeholder="Enter your course category"
                        value={category}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="courseImage">
                    <Form.Label>Course Image</Form.Label>
                    <Form.Control
                        onChange={(e) => handleChange(e, "image")}
                        required
                        type="text"
                        placeholder="Enter your course image"
                        value={image}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="courseProvides">
                    <Form.Label>Course Provides</Form.Label>
                    <Form.Control
                        as="textarea"
                        onChange={(e) => handleChange(e, "provides")}
                        required
                        type="text"
                        placeholder="Enter your course provides eds with comma separated"
                        value={provides}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add Course
                </Button>
                <Stack className="mt-3">
                    <Link to="/">
                        <Button variant="secondary">
                            Go back to the home page
                        </Button>
                    </Link>
                </Stack>
            </Form>
        </Container>
    );
}
