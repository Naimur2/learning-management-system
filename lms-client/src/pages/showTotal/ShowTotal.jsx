import React from "react";
import MainContext from "./../../store/main-context";
import { Container, Button } from "react-bootstrap";
import { API_URI } from "../../env";
import { useNavigate } from "react-router-dom";

export default function ShowTotal() {
    const mainCtx = React.useContext(MainContext);
    const navigate = useNavigate();
    const insertData = async () => {
        const result = await fetch(`${API_URI}/book/insert`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: mainCtx.user._id,
                items: mainCtx.selectedItems,
                details: mainCtx.bookingDetails,
                status: "pending",
            }),
        });

        if (result.status === 200) {
            mainCtx.setSelectedItems([]);
            mainCtx.setBookingDetails(null);
            alert("Booking Successful");
            navigate("/user");
        } else {
            alert("Booking Failed");
        }
    };
    return (
        <Container className="my-4">
            <h4 className="h2">Name:{mainCtx.bookingDetails.name}</h4>
            <h4 className="h2">Email:{mainCtx.bookingDetails.email}</h4>
            <h4 className="h2">Phone:{mainCtx.bookingDetails.phone}</h4>
            <h4 className="h2">Slot:{mainCtx.bookingDetails.slot}</h4>
            <h4 className="h2">Total:{mainCtx.bookingDetails.date}</h4>
            <h4 className="h2">
                Total People:{mainCtx.bookingDetails.peoples}
            </h4>
            <hr />
            <h4 className="h2">
                Total :{" "}
                {mainCtx.selectedItems.reduce((acc, cur) => {
                    return acc * 1 + cur.price * 1;
                }, 0)}
            </h4>
            <Button onClick={insertData}>Submit</Button>
        </Container>
    );
}
