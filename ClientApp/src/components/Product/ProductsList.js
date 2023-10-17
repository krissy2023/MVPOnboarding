import React, { Component } from 'react';
import {  Table, Pagination } from 'semantic-ui-react';
import { CreateProduct } from "./CreateProduct";
import { EditProduct } from "./EditProduct";
import { DeleteProduct } from "./DeleteProduct";



export class ProductsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            loading: true,
            value: 1,
           

        }



    }


    componentDidMount() {
        this.populateProductsData();
    }

  
    fetchData() {
        this.populateProductsData();
    }

    handleClick(e) {
        this.setState({value: 1})
    }

    render() {
        const products = this.state.products;
        const itemsPerPage = 10;
        var indexOfLastItem = this.state.value * itemsPerPage;
        var indexOfFirstItem = indexOfLastItem - itemsPerPage;
        var currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
        const totalItems = products.length;
        const numberOfPages = Math.ceil(totalItems / itemsPerPage);
       
       
        let contents =
            this.state.loading ? <p><em>Loading...</em> </p> : 

                currentItems.length !== 0 || this.state.value === 1 ?


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
                            {currentItems.map((p) =>
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
                    <Pagination
                        floated="right"
                        boundaryRange={0}
                        defaultActivePage={1}
                        totalPages={numberOfPages}
                        onPageChange={(e, data) => this.setState({ value: data.activePage })}
                        siblingRange={1}
                        pointing
                        secondary
                        
                        
                    />

                       
                   


                 
               </div> : this.setState({ value: 1 });


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