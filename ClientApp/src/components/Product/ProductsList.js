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

  
    fetchData() {
        this.populateProductsData();
    }
    


    render() {
        const products = this.state.products;
        let contents =
            this.state.loading ? <p><em>Loading...</em> </p> : 
                <div>
                    <CreateProduct fetchData={this.fetchData.bind(this)} />
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
                                    <Table.Cell><EditProduct id={p.id} name={p.name} price={p.price} fetchData={this.fetchData.bind(this)} /> </Table.Cell>
                                    <Table.Cell><DeleteProduct id={p.id} name={p.name} price={p.price} fetchData={this.fetchData.bind(this)} /></Table.Cell>
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


        return (
            <div>

                <h1> Products List</h1>
                {console.log(true)}
                
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