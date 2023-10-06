import React, { Component } from 'react';
import { CreateCustomer } from './CreateCustomer';
import { EditCustomer } from "./EditCustomer";
import { DeleteCustomer } from "./DeleteCustomer";


export class CustomersList extends Component {


    constructor(props) {
        super(props);
        this.state = { customers: [], loading: true };


    }

    componentDidMount() {
        this.populateCustomersData();
    }

    componentDidUpdate() {
        this.populateCustomersData();
    }

    static renderCustomersTable(customers) {
        return (
            <div>
                <CreateCustomer />
                <table className="table table-striped" aria-labelledby="tableLabel">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Edit</th>
                            <th>Delete</th>

                        </tr>
                    </thead>
                    <tbody id="table-data">
                        {customers.map(customers =>
                            <tr key={customers.id}>
                                <td>{customers.id}</td>
                                <td>{customers.name}</td>
                                <td>{customers.address}</td>
                                <td><EditCustomer id={customers.id} fullname={customers.name} address={customers.address} /></td>
                                <td><DeleteCustomer id={customers.id} fullname={customers.name} address={customers.address} /></td>
                               
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : CustomersList.renderCustomersTable(this.state.customers);

        return (
            <div>
                <h1 id="tableLabel">Customers List</h1>
                <p>This component demonstrates fetching data from the server.</p>
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
