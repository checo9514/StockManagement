import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import '../stylesheet/main.css';
import { Create } from './create';
import { Update } from './edit';
import { Delete } from './delete';

export class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = { products: [], loading: true };

        fetch('api/product')
            .then(response => response.json())
            .then(data => {
                this.setState({ products: data, loading: false });
            });
    }
    
    static renderproductsTable(products) {
        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Model</th>
                        <th>Description</th>
                        <th>Year</th>
                        <th>Brand</th>
                        <th>Kilometers</th>
                        <th>Price</th>
                        <th>Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product =>
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.model}</td>
                            <td>{product.description}</td>
                            <td>{product.year}</td>
                            <td>{product.brand}</td>
                            <td>{product.kilometers}</td>
                            <td>{product.price}</td>
                            <td>
                                <Update data={product} />
                                <Delete id={product.id} />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Admin.renderproductsTable(this.state.products);

        return (
            <div>

                <Create />

                {contents}
            </div>
        );
    }
}
