import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();
    return (
        <Container>
            <Button onClick={() => navigate("/dashboard/add-course")}>
                <h3>Add Course</h3>
            </Button>
        </Container>
    );
}
