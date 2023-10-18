import React, { Component } from 'react';
import { Table, Pagination, Header } from 'semantic-ui-react';
import { CreateStore } from "./CreateStore";
import { EditStore } from "./EditStore";
import { DeleteStore } from "./DeleteStore";



export class StoresList extends Component {
    constructor(props) {
        super(props);
        this.state = { stores: [], loading: true, value: 1 }

    }

    componentDidMount() {
        this.populateStoresData();
    }

    componentDidUpdate() {
        this.populateStoresData();
    }


    fetchData() {
        this.populateStoresData();
    }


    render() {

        //Pagination 

        const stores = this.state.stores;
        const itemsPerPage = 10;
        var indexOfLastItem = this.state.value * itemsPerPage;
        var indexOfFirstItem = indexOfLastItem - itemsPerPage;
        var currentItems = stores.slice(indexOfFirstItem, indexOfLastItem);
        const totalItems = stores.length;
        const numberOfPages = Math.ceil(totalItems / itemsPerPage);


        let contents =
            this.state.loading ? <p><em>Loading...</em> </p> :

                currentItems.length !== 0 || this.state.value === 1 ?


                 <div>


                <CreateStore fetchdata={this.fetchData.bind(this)} />
                <Table celled>
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
                        {currentItems.map((s) =>
                            <Table.Row key={s.id}>
                                <Table.Cell>{s.id}</Table.Cell>
                                <Table.Cell>{s.name}</Table.Cell>
                                <Table.Cell>{s.address}</Table.Cell>
                                <Table.Cell><EditStore id={s.id} name={s.name} address={s.address} fetchData={this.fetchData.bind(this)} /> </Table.Cell>
                                <Table.Cell><DeleteStore id={s.id} name={s.name} address={s.address} fetchData={this.fetchData.bind(this)} /></Table.Cell>
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
                <Header size="large" color="blue"> Stores List </Header>
                {contents}
            </div>
        );

    }
    async populateStoresData() {
        const response = await fetch('/api/Stores');
        const data = await response.json();
        this.setState({ stores: data, loading: false });
    }


}