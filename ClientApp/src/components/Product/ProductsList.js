import React, { Component } from 'react';
import { Icon, Menu, Table } from 'semantic-ui-react';
import { CreateProduct } from "./CreateProduct";
import { EditProduct } from "./EditProduct";
import { DeleteProduct } from "./DeleteProduct";



export class ProductsList extends Component {
    constructor(props) {
        super(props);
        this.state = {products: [], loading: true}



    }


    componentDidMount() {
        this.populateProductsData();
    }

    componentDidUpdate() {
        this.populateProductsData();
    }


    static renderProductsTable(products) {



        return (
            <div>

                <CreateProduct />
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Price</Table.HeaderCell>
                            <Table.HeaderCell>Edit</Table.HeaderCell>
                            <Table.HeaderCell>Delete</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {products.map((p) =>
                            <Table.Row key={p.id}>
                                <Table.Cell>{p.id}</Table.Cell>
                                <Table.Cell>{p.name}</Table.Cell>
                                <Table.Cell>{p.price}</Table.Cell>
                                <Table.Cell><EditProduct id={p.id} name={p.name} price={p.price} /> </Table.Cell>
                                <Table.Cell><DeleteProduct id={p.id} name={p.name} price={p.price} /></Table.Cell>
                            </Table.Row>
                        )}

                    </Table.Body>

                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='6'>

                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>

                </Table>
                <Menu floated='right' pagination>
                    <Menu.Item as='a' icon>
                        <Icon name='chevron left' />
                    </Menu.Item>
                    <Menu.Item as='a'>1</Menu.Item>
                    <Menu.Item as='a'>2</Menu.Item>
                    <Menu.Item as='a'>3</Menu.Item>
                    <Menu.Item as='a'>4</Menu.Item>
                    <Menu.Item as='a' icon>
                        <Icon name='chevron right' />
                    </Menu.Item>
                </Menu>

            </div>
        );

    }


    render() {
        let contents =
            this.state.loading ? <p><em>Loading...</em> </p> : ProductsList.renderProductsTable(this.state.products);
        return (
            <div>
                <h1> Products List</h1>
                {contents}
            </div>
        );

    }
    async populateProductsData() {
        const response = await fetch('/api/Products');
        const data = await response.json();
        this.setState({ products: data, loading: false });
    }


}