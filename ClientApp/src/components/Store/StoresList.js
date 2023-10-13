import React, { Component } from 'react';
import { Icon, Menu, Table } from 'semantic-ui-react';
import { CreateStore } from "./CreateStore";
import { EditStore } from "./EditStore";
import { DeleteStore } from "./DeleteStore";



export class StoresList extends Component {
    constructor(props) {
        super(props);
        this.state = { stores: [], loading: true }



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
        const stores = this.state.stores;
        let contents =
            this.state.loading ? <p><em>Loading...</em> </p> : <div>


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
                        {stores.map((s) =>
                            <Table.Row key={s.id}>
                                <Table.Cell>{s.id}</Table.Cell>
                                <Table.Cell>{s.name}</Table.Cell>
                                <Table.Cell>{s.address}</Table.Cell>
                                <Table.Cell><EditStore id={s.id} name={s.name} address={s.address} fetchdata={this.fetchData.bind(this)} /> </Table.Cell>
                                <Table.Cell><DeleteStore id={s.id} name={s.name} address={s.address} fetchdata={this.fetchData.bind(this)} /></Table.Cell>
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
                <h1> Stores List</h1>
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