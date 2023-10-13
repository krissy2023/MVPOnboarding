import React, { Component } from 'react';
import { Icon, Menu, Table } from 'semantic-ui-react';
import { CreateCustomer } from "./CreateCustomer";
import { EditCustomer } from "./EditCustomer";
import { DeleteCustomer } from "./DeleteCustomer";



export class CustomersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
            customers: [],
            loading: true,
            
            
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
       
     let contents =
        this.state.loading ? <p><em>Loading...</em> </p> :
                
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
                        {customers.map((c) =>
                            <Table.Row key={c.id}>
                                <Table.Cell>{c.id}</Table.Cell>
                                <Table.Cell>{c.name}</Table.Cell>
                                <Table.Cell>{c.address}</Table.Cell>
                                <Table.Cell><EditCustomer id={c.id} name={c.name} address={c.address} fetchData={this.fetchData.bind(this)} /> </Table.Cell>
                                <Table.Cell><DeleteCustomer id={c.id} name={c.name} address={c.address} fetchData={this.fetchData.bind(this)} /></Table.Cell>
                            </Table.Row>
                        )}

                    </Table.Body>

                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='6'>

                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>

                </Table >
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
        </div >
          
        return (
            <div>
                {console.log(true)}
                
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