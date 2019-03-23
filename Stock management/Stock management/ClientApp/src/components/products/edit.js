import React, { Component } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import '../stylesheet/main.css';

export class Update extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.productData = {
            id: this.props.data.id,
            model: this.props.data.model,
            description: this.props.data.description,
            year: this.props.data.year,
            brand: this.props.data.brand,
            kilometers: this.props.data.kilometers,
            price: this.props.data.price
        };
        /*for (var i in this.props.data) {
            this.productData.push({
                field: i.charAt(0).toUpperCase() + i.substr(1, i.length),
                value: this.props.data[i]
            });
        }*/
        
        this.state = {
            show: false,
            id: this.props.data.id,
            model: this.props.data.model,
            description: this.props.data.description,
            year: this.props.data.year,
            brand: this.props.data.brand,
            kilometers: this.props.data.kilometers,
            price: this.props.data.price
        };
    }   

    handleChange = (name, e) => {
        this.setState({ [name]: e.target.value });
        this.productData[name] = e.target.value; 
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleSubmit = (id, event) => {
        event.persist();
        const data = this.productData;
        fetch('api/product/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then(data => {
            console.log(data)
        })
        .catch((err) => console.log(err));
        
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {
        const { id, model, description, year, brand, kilometers, price } = this.state;

        return (
            <div>
                <Button variant="info" className="space-bottom-top" onClick={this.handleShow}>
                    Update
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Car</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form name="product">

                            <Form.Group controlId="id">
                                <Form.Label>Id</Form.Label>
                                <Form.Control name="id"
                                    type="text"
                                    value={id}
                                    onChange={(e) => this.handleChange("id", e)} />
                            </Form.Group>

                            <Form.Group controlId="model">
                                <Form.Label>Model</Form.Label>
                                <Form.Control name="model"
                                    type="text"
                                    value={model}
                                    onChange={(e) => this.handleChange("model", e)} />
                            </Form.Group>

                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control name="description"
                                    type="text"
                                    value={description}
                                    onChange={(e) => this.handleChange("description", e)} />
                            </Form.Group>

                            <Form.Group controlId="year">
                                <Form.Label>Year</Form.Label>
                                <Form.Control name="year"
                                    type="text"
                                    value={year}
                                    onChange={(e) => this.handleChange("year", e)} />
                            </Form.Group>

                            <Form.Group controlId="brand">
                                <Form.Label>Brand</Form.Label>
                                <Form.Control name="brand"
                                    type="text"
                                    value={brand}
                                    onChange={(e) => this.handleChange("brand", e)} />
                            </Form.Group>

                            <Form.Group controlId="kilometers">
                                <Form.Label>Kilometers</Form.Label>
                                <Form.Control name="kilometers"
                                    type="text"
                                    value={kilometers}
                                    onChange={(e) => this.handleChange("kilometers", e)} />
                            </Form.Group>

                            <Form.Group controlId="price">
                                <Form.Label>Price</Form.Label>
                                <Form.Control name="price"
                                    type="text"
                                    value={price}
                                    onChange={(e) => this.handleChange("price", e)} />
                            </Form.Group>

                            <Button variant="primary" onClick={(e) => this.handleSubmit(id, e)}>
                                Submit
                            </Button>
                        </Form>
                        
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}