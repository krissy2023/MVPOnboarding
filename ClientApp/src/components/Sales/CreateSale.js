import React, { Component } from "react";
import { Button, Modal, Form, Icon, Input, Dropdown, Select } from 'semantic-ui-react'






export class CreateSale extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customers: [],
            products: [],
            stores: [],
            customerId: "",
            productId: "",
            storeId: "",
            isModalOpen: false,
            


        }

        this.changeCustomerHandler = this.changeCustomerHandler.bind(this);
        
        this.changeProductHandler = this.changeProductHandler.bind(this);
        this.changeStoreHandler = this.changeStoreHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      
    }

    openModal = () => {
        this.setState({ isModalOpen: true })
    }

    closeModal = () => {
        this.setState({ isModalOpen: false })
    }

    changeCustomerHandler = (e, { value }) => {
        
        const val = JSON.stringify(value);
        this.setState({customerId: val })

    }
    changeProductHandler = (e, { value }) => {

        const val = JSON.stringify(value);
        this.setState({ productId: val })

    }
    changeStoreHandler = (e, { value }) => {

        const val = JSON.stringify(value);
        this.setState({ storeId: val })

    }


    async handleSubmit(event) {
        event.preventDefault();

        const response = await fetch('/api/Sales', {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(

                {
                    customerId: this.state.customerId,
                    productId: this.state.productId,
                    storeId: this.state.storeId

                }


            )
        })

         await response.json();
        this.props.fetchData();
        this.closeModal();
    }



    componentDidMount() {
        this.getCustomersData();
        this.getProductsData();
        this.getStoresData();
    }

    render() {

        const customers = this.state.customers;
        const products = this.state.products;
        const stores = this.state.stores;

        
        

       
       
        return (

        <Modal
            onClose={this.closeModal}
            onOpen={this.openModal}
            open={this.state.isModalOpen}
            size='tiny'
            trigger={< Button color="olive"> New Sale</Button>}
            className='modal'
        >
            
                <h3> Create New Sale </h3>

            

            <Form id="form-data" onSubmit={this.handleSubmit} >
                    <Form.Field
                        label="Customer"
                        placeholder='Select Customer'
                        control={Select}
                        options={customers.map((c) =>
                            ({ key: c.id, value: c.id, text: <p>({c.id})&nbsp; &nbsp; &nbsp;{c.name}</p> })
                        )}
                        
                        onChange={this.changeCustomerHandler}
                    >
                </Form.Field>


                <Form.Field
                        label="Product"
                        placeholder='Select Product'
                        control={Select}
                        options={products.map((p) =>
                            ({ key: p.id, value: p.id, text: p.name })
                        )}
                        onChange={this.changeProductHandler}
                        
                >
                </Form.Field>


                <Form.Field
                        label="Store"
                        placeholder='Select Store'
                        control={Select}
                        options={stores.map((s) =>
                            ({ key: s.id, value: s.id, text: s.name })
                        )}
                        onChange={this.changeStoreHandler}
                     
                >
                    </Form.Field>
                    <Button floated="right" inverted color='green' type='submit' value='submit' >
                        <Icon name='checkmark' /> Submit </Button>

                    <Button floated="right" inverted color='red' onClick={this.closeModal}>
                        <Icon name='remove' /> Cancel
                    </Button>
                    
            </Form>

        </Modal>

        );
    }

    async getCustomersData() {
        const response = await fetch('/api/Customers');
        const data = await response.json();
        this.setState({ customers: data });


    }
    async getProductsData() {
        const response = await fetch('/api/Products');
        const data = await response.json();
        this.setState({ products: data });


    }
    async getStoresData() {
        const response = await fetch('/api/Stores');
        const data = await response.json();
      
        this.setState({ stores: data });


    }



}

