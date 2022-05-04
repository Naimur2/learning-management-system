import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import hero from "../../../images/hero2.png";
import "./hero.scss";

export default function Hero() {
    return (
        <section className="hero">
            <Container className="hero-container">
                <div className="hero-texts">
                    <h1 className="hero-title">Best Online Learning System</h1>
                    <p className="hero-description">
                        Come and enjoy unlimited education support, daily
                        concept clear sessions, and more.
                    </p>
                    <button className="btn btn-primary btn-lg btn-block mt-4">
                        Explore Courses
                    </button>
                </div>
                <div className="hero-image">
                    <img className="image-fluid" src={hero} alt="banner" />
                </div>
            </Container>
        </section>
    );
}
