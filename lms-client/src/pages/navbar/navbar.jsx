import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import useAuth from "./../../hooks/use-auth";
import React from "react";
import MainContext from "../../store/main-context";

export default function NavBar() {
    const mainCtx = React.useContext(MainContext);
    const [path, setPath] = React.useState("");
    const auth = useAuth();

    React.useEffect(() => {
        if (mainCtx.user && mainCtx.user.role === "admin")
            setPath("/dashboard");
        else if (mainCtx.user && mainCtx.user.role === "user") setPath("/user");
        else setPath("/");
    }, [mainCtx.user]);

    const NoAuth = () => (
        <Nav variant="dark" className="ml-auto">
            <NavLink
                className={(props) => (props.isActive ? "link active" : "link")}
                to={"/courses"}
            >
                Courses
            </NavLink>
            <NavLink
                className={(props) => (props.isActive ? "link active" : "link")}
                to={"/login"}
            >
                Login
            </NavLink>
            <NavLink
                className={(props) => (props.isActive ? "link active" : "link")}
                to={"/register"}
            >
                Register
            </NavLink>
        </Nav>
    );
    const UserAuth = () => (
        <Nav variant="dark" className="ml-auto">
            <NavLink
                className={(props) => (props.isActive ? "link active" : "link")}
                to={"/courses"}
            >
                Courses
            </NavLink>
            <NavLink
                className={(props) => (props.isActive ? "link active" : "link")}
                to={"/user/mycourses"}
            >
                My Courses
            </NavLink>
            <NavLink
                className={(props) => (props.isActive ? "link active" : "link")}
                to={"/user/wishlist"}
            >
                Wishlist ({mainCtx.wishlist.length})
            </NavLink>
            <NavLink
                className={(props) => (props.isActive ? "link active" : "link")}
                to={"/user/cart"}
            >
                My Cart
                <span className="badge badge-pill badge-danger">
                    {mainCtx.cart.length}
                </span>
            </NavLink>
            <NavLink
                className={(props) => (props.isActive ? "link active" : "link")}
                to={"/register"}
            >
                Log out
            </NavLink>
        </Nav>
    );

    const RenderRoute = () =>
        auth && auth.role === "user" ? <UserAuth /> : <></>;

    return (
        <Navbar bg="transparent" expand="lg" variant="dark">
            <Container>
                <Link to={path} className="brand">
                    <Navbar.Brand>Course Zero</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse
                    className="justify-content-end"
                    id="basic-navbar-nav"
                >
                    {!auth ? <NoAuth /> : <RenderRoute />}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
