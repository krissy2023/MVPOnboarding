import React, { Component } from 'react';
import { Table, Pagination, Header} from 'semantic-ui-react'
import { CreateSale } from './CreateSale'
import {EditSale } from './EditSale'
import {DeleteSale } from './DeleteSale'

export class SalesList extends Component {
    constructor() {
        super();
        this.state = { sales: [], loading: true, value: 1 }

    }

    componentDidMount() {
        this.populateSalesData();
       
    }

    fetchData() {
        this.populateSalesData();
       
    }


    render() {

        //Pagination 

      const sales = this.state.sales;
      const itemsPerPage = 10;
      var indexOfLastItem = this.state.value * itemsPerPage;
      var indexOfFirstItem = indexOfLastItem - itemsPerPage;
      var currentItems = sales.slice(indexOfFirstItem, indexOfLastItem);
      const totalItems = sales.length;
      const numberOfPages = Math.ceil(totalItems / itemsPerPage);
     

      let contents =
          this.state.loading ? <p><em>Loading...</em> </p> :

              currentItems.length !== 0 || this.state.value === 1 ?

                    <div>
                     <CreateSale fetchData={this.fetchData.bind(this)} />
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
                          {currentItems.map((
                                    sale
                                ) =>
                                    <Table.Row key={sale.id}>
                                        <Table.Cell>{sale.customer.name}</Table.Cell>
                                        <Table.Cell>{sale.product.name}</Table.Cell>
                                        <Table.Cell>{sale.store.name}</Table.Cell>
                                        <Table.Cell>{new Date(sale.dateSold).toLocaleString()}</Table.Cell>
                                        <Table.Cell><EditSale
                                            id={sale.id}
                                            customerId={sale.customerId}
                                            productId={sale.productId}
                                            storeId={sale.storeId}
                                            customerName={sale.customer.name}
                                            storeName={sale.store.name}
                                            productName={sale.product.name}
                                            fetchData={this.fetchData.bind(this)}

                                        /> </Table.Cell>
                                        <Table.Cell><DeleteSale
                                            id={sale.id}
                                            customerId={sale.customerId}
                                            productId={sale.productId}
                                            storeId={sale.storeId}
                                            customerName={sale.customer.name}
                                            storeName={sale.store.name}
                                            productName={sale.product.name}
                                            fetchData={this.fetchData.bind(this)}
                                        /></Table.Cell>
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
                   
                    <Header size="large" color="blue"> Sales List </Header>
                    {contents}
                </div>
            );
        }
    
    async populateSalesData() {
        const response = await fetch('/api/Sales');
        const data = await response.json();
        this.setState({ sales: data, loading: false });
    }
}