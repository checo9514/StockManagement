import React, { Component } from 'react';
import { Button, Form, Modal, Alert } from 'react-bootstrap';
import '../stylesheet/main.css';

export class Create extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            show: false,
            error: false,
            issues: []
        };
        this.productData = {
            //id: '',
            model: '',
            description: '',
            year: '',
            brand: '',
            kilometers: '',
            price: '',
        };
    }

    handleChange = (e) => {
        this.setState({ error: false });
        this.productData[e.target.name] = e.target.value;
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleSubmit(event) {
        event.persist();
        const data = this.productData;

        fetch('api/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then(data => {
            console.log(data);
            var errors = data.errors;
            if (!errors) {
                window.location.reload();
                this.setState({ show: false });
            } else {
                var newErrors = [];
                this.setState({ error: true });
                for (var i in errors) {
                    newErrors.push(errors[i][0]);
                }
                this.setState({ issues: newErrors });
                console.log(this.state);
            }
        })
        .catch((err) => console.log(err));
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {
        const { /*id, */model, description, year, brand, kilometers, price } = this.state;

        var errors = '';
        if (this.state.error) {
            errors = this.state.issues.map((error, i) => {
                return <Alert key={i} variant="danger">
                            {error}
                        </Alert>
            });
        }

        return (
            <div>
                <h1>Stock Management</h1>
                <br />
                <Button variant="outline-secondary" className="space-bottom-top" onClick={this.handleShow}>
                    Add New +
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>

                    <Modal.Header closeButton>
                        <Modal.Title>Add Car</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {errors}
                        <Form name="product">
                            {/*<Form.Group controlId="id">
                                <Form.Label>Id</Form.Label>
                                <Form.Control name="id"
                                    type="text"
                                    value={id}
                                    onChange={this.handleChange} />
                            </Form.Group>*/}
                            
                            <Form.Group controlId="model">
                                <Form.Label>Model</Form.Label>
                                <Form.Control name="model"
                                    type="text"
                                    value={model}
                                    onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control name="description"
                                    type="text"
                                    value={description}
                                    onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="year">
                                <Form.Label>Year</Form.Label>
                                <Form.Control name="year"
                                    type="text"
                                    value={year}
                                    onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="brand">
                                <Form.Label>Brand</Form.Label>
                                <Form.Control name="brand"
                                    type="text"
                                    value={brand}
                                    onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="kilometers">
                                <Form.Label>Kilometers</Form.Label>
                                <Form.Control name="kilometers"
                                    type="text"
                                    value={kilometers}
                                    onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="price">
                                <Form.Label>Price</Form.Label>
                                <Form.Control name="price"
                                    type="text"
                                    value={price}
                                    onChange={this.handleChange} />
                            </Form.Group>

                            <Button variant="primary" onClick={this.handleSubmit}>
                                Submit
                            </Button>
                        </Form>
                        
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}