import React, { Component } from react;
import { Dropdown } from 'semantic-ui-react'





export const DropdownList = (props) => {
    const options = [

        {key: props.id, name: props.name }

    ]

    return (
        <Dropdown
            deburr
            fluid
            options={options}
            placeholder='Type name here'
            search
            selection
        />
    );
}

