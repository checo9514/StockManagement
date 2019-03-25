import React, { Component } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import '../stylesheet/main.css';

export class Delete extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        this.state = {
            show: false,
            id: this.props.id
        };
    }  

    handleClose() {
        this.setState({ show: false });
    }

    handleSubmit = (id, event) => {
        event.persist();
        fetch('api/product/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((res) => {
            console.log('Status: ' + res.ok);
            window.location.reload();
            this.setState({ show: false });
        }).catch((err) => console.log(err));
        
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {
        return (
            <div>
                <Button variant="danger" onClick={this.handleShow}>
                    Delete
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete record</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure to delete this record?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={(e) => this.handleSubmit(this.state.id, e)}>
                           Accept
                        </Button>
                        <Button variant="danger" onClick={this.handleClose}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}