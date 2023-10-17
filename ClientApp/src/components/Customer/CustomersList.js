import React, { Component } from 'react';
import { Table, Pagination} from 'semantic-ui-react';
import { CreateCustomer } from "./CreateCustomer";
import { EditCustomer } from "./EditCustomer";
import { DeleteCustomer } from "./DeleteCustomer";





export class CustomersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
            customers: [],
            loading: true,
            value: 1,
        
        }

        

    }


    componentDidMount() {
        this.populateCustomersData();
    }


   
       
    fetchData() {
        this.populateCustomersData();
    }

  

   
    render() {
        const customers = this.state.customers;
        const itemsPerPage = 10;
        var indexOfLastItem = this.state.value * itemsPerPage;
        var indexOfFirstItem = indexOfLastItem - itemsPerPage;
        var currentItems = customers.slice(indexOfFirstItem, indexOfLastItem);
        const totalItems = customers.length;
        const numberOfPages = Math.ceil(totalItems / itemsPerPage);
       
        let contents = this.state.loading ?
            <p> <em>Loading...</em> </p> :


            currentItems.length !== 0 || this.state.value === 1 ?

                <div>
                    <CreateCustomer fetchData={this.fetchData.bind(this)} />
                    < Table celled>
                        <Table.Header>
                            <Table.Row>

                                <Table.HeaderCell>Id</Table.HeaderCell>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Address</Table.HeaderCell>
                                <Table.HeaderCell>Edit</Table.HeaderCell>
                                <Table.HeaderCell>Delete</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>


                        <Table.Body>

                            {currentItems.map((c) =>
                                <Table.Row key={c.id}>
                                    <Table.Cell>{c.id}</Table.Cell>
                                    <Table.Cell>{c.name}</Table.Cell>
                                    <Table.Cell>{c.address}</Table.Cell>
                                    <Table.Cell><EditCustomer id={c.id} name={c.name} address={c.address} fetchData={this.fetchData.bind(this)} /> </Table.Cell>
                                    <Table.Cell><DeleteCustomer id={c.id} name={c.name} address={c.address} fetchData={this.fetchData.bind(this)} /></Table.Cell>
                                </Table.Row>
                            )}

                        </Table.Body>

                        <Table.Footer >



                        </Table.Footer>


                    </Table >
                   
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
               
                {contents}

                
            </div>
        );

    }
    async populateCustomersData() {
        const response = await fetch('/api/Customers');
        const data = await response.json();

        this.setState({ customers: data, loading: false });
    }

    


}