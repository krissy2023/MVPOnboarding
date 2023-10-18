import React, { Component } from 'react';
import { Button, Message, Modal, Form, Icon } from 'semantic-ui-react'



export class CreateProduct extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name:"",
            price:"",
            isModalOpen: false,
            isError: false,
            error: ""
        }
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePrice = this.handleChangePrice.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    openModal = () => {
        this.setState({ isModalOpen: true })
    }

    closeModal = () => {
        this.setState({ isModalOpen: false })
    }

    handleChangeName(event) {



        this.setState({
            name: event.target.value

        });
    }
    handleChangePrice(event) {
        

      this.setState({ price: event.target.value });


    }



   async handleSubmit(event) {
       event.preventDefault();
       try {
           const response = await fetch('/api/Products', {
               method: 'POST',
               headers: {
                   'content-Type': 'application/json'
               },

               body: JSON.stringify({
                   name: this.state.name,
                   price: this.state.price
               })
           })
           if (response.status === 400) {
               throw new Error("Please enter a valid number");
           }

           this.props.fetchData();
           this.setState({ name: "", price: "" });
           this.closeModal();
       } catch (error) {
           this.setState({ error: error.message, isError: true });
           setTimeout(() => this.setState({ isError: false }), 3000);
       }
           
       
    }


    render() {

        

        return (
            <Modal
                onClose={this.closeModal}
                onOpen={this.openModal}
                open={this.state.isModalOpen}
                size='tiny'
                trigger={< Button color="olive" > New Product</Button>}
                className='modal'
            >
               
                <h3> Create New Product </h3>

               
                <Form error id="form-data" onSubmit={this.handleSubmit}>
                    <Form.Field  >
                    <label>Name</label>
                        <input type='text' value={this.state.name} onChange={this.handleChangeName} />
                    </Form.Field>
                    <Form.Field>
                    <label>Price</label>
                        <input type='text' value={this.state.price} onChange={this.handleChangePrice} />

                        {this.state.isError === true ? <Message error  >{this.state.error}</Message> : null}

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

}




