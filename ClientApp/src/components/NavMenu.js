import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export class NavMenu extends Component {
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Menu>
                <Menu.Item
                    name='Customers'
                    active={activeItem === 'Customers'}
                    onClick={this.handleItemClick}
                    href='./customer/customerslist'
                >
                    Customers
                </Menu.Item>

                <Menu.Item
                    name='Products'
                    active={activeItem === 'Products'}
                    onClick={this.handleItemClick}
                >
                    Products
                </Menu.Item>

                <Menu.Item
                    name='Stores'
                    active={activeItem === 'Stores'}
                    onClick={this.handleItemClick}
                >
                    Store
                </Menu.Item>
                <Menu.Item
                    name='Sales'
                    active={activeItem === 'Sales'}
                    onClick={this.handleItemClick}
                    href="./sales"
                >
                    Sales
                </Menu.Item>
            </Menu>
        )
    }
}