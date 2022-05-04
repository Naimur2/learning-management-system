import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function BSModal({ onClose, show, onAgree }) {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure to purchase this course ?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    No
                </Button>
                <Button variant="primary" onClick={onAgree}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
