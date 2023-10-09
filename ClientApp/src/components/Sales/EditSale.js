import React, { Component } from "react";
import { Button, Header, Modal, Form, Icon } from 'semantic-ui-react'



export class EditSale extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        }

    }

    openModal = () => {
        this.setState({ isModalOpen: true })
    }

    closeModal = () => {
        this.setState({ isModalOpen: false })
    }


    render() {

        return (
            <Modal
                onClose={this.closeModal}
                onOpen={this.openModal}
                open={this.state.isModalOpen}
                size='small'
                trigger={< Button > Edit </Button>}
                className='modal'
            >
                <Header>
                    Create New Sale

                </Header>
                <Form id="form-data">

                    <label>Customer</label>




                </Form>
                v


                <Button basic color='red' onClick={this.closeModal}>
                    <Icon name='remove' /> Cancel
                </Button>

            </Modal>

        );
    }


}