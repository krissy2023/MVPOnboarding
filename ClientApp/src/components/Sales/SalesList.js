import React, { Component } from 'react';
import { Icon, Menu, Table } from 'semantic-ui-react'
import { CreateSale } from './CreateSale'
import {EditSale } from './EditSale'
import {DeleteSale } from './DeleteSale'

export class SalesList extends Component {
    constructor() {
        super();
        this.state = {
            sales: []
           
        }

       

    }

   
    componentDidMount() {
        this.populateSalesData();
    }

    componentDidUpdate() {
        this.populateSalesData();
    }


    static renderSalesTable(sales) {
        
       

        return (
            <div>
               
               <CreateSale />
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Customer</Table.HeaderCell>
                            <Table.HeaderCell>Product</Table.HeaderCell>
                            <Table.HeaderCell>Store</Table.HeaderCell>
                            <Table.HeaderCell>DateSold</Table.HeaderCell>
                            <Table.HeaderCell>Edit</Table.HeaderCell>
                            <Table.HeaderCell>Delete</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {sales.map((
                           sale
                            ) => 
                            <Table.Row key={sale.id}>
                                <Table.Cell>{sale.customer.name}</Table.Cell>
                                <Table.Cell>{sale.product.name}</Table.Cell>
                                <Table.Cell>{sale.store.name}</Table.Cell>
                                <Table.Cell>{new Date(sale.dateSold).toLocaleString()}</Table.Cell>
                                <Table.Cell><EditSale  /> </Table.Cell>
                                <Table.Cell><DeleteSale /></Table.Cell>
                            </Table.Row>


                        
                        )
                        }

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
            let contents = SalesList.renderSalesTable(this.state.sales)
            return (
                <div>
                    {contents}
                </div>
            );
        }
    
    async populateSalesData() {
        const response = await fetch('/api/Sales');
        const data = await response.json();
        
        this.setState({ sales: data });
    }


}