import statusAvailable from '../assets/statusAvailable.svg';
import statusPlanned from '../assets/statusPlanned.svg';
import statusInProgress from '../assets/statusInProgress.svg';
import React from 'react';
export default function Counter() {
    const statusComponents = [
        {
            name: 'Address Lookup',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: <p>UI/UX design to commence in 02/2024</p>,
            release: <p>Version 1.1</p>,
        },
        {
            name: 'Alert - Callout',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.1</p>,
        },
        {
            name: 'Alert - Dialog',
            ui_ux: <img src={statusAvailable}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.1</p>,
        },
        {
            name: 'Alert - Toast',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.1</p>,
        },
        {
            name: 'Autocomplete',
            ui_ux: <img src={statusAvailable}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.0</p>,
        },
        {
            name: 'Avatar',
            ui_ux: <img src={statusAvailable}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.0</p>,
        },
        {
            name: 'Badge',
            ui_ux: <img src={statusAvailable}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.0</p>,
        },
        {
            name: 'Box',
            ui_ux: undefined,
            build: <img src={statusAvailable}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: <p>Code only component</p>,
            release: <p>Version 1.0</p>,
        },
        {
            name: 'Button',
            ui_ux: <img src={statusAvailable}></img>,
            build: <img src={statusAvailable}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.0</p>,
        },
        {
            name: 'Button - Icon',
            ui_ux: <img src={statusAvailable}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.0</p>,
        },
        {
            name: 'Button - Split',
            ui_ux: <img src={statusAvailable}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.0</p>,
        },

        {
            name: 'Card',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: <p>UI/UX design to commence in 04/2024</p>,
            release: <p>Version 1.1</p>,
        },
        {
            name: 'Chart',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.1</p>,
        },
        {
            name: 'Checkbox',
            ui_ux: <img src={statusAvailable}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.0</p>,
        },
        {
            name: 'Chip',
            ui_ux: <img src={statusAvailable}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.0</p>,
        },
        {
            name: 'Color Field',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.2</p>,
        },
        {
            name: 'Color Picker',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.2</p>,
        },
        {
            name: 'Datagrid / Data Table',
            ui_ux: <img src={statusInProgress}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: <p>In UI/UX design as of 01/2024</p>,
            release: <p>Version 1.2</p>,
        },
        {
            name: 'Date Field',
            ui_ux: <img src={statusAvailable}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.0</p>,
        },
        {
            name: 'Date Picker',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.1</p>,
        },
        {
            name: 'Date Range Field',
            ui_ux: <img src={statusAvailable}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.1</p>,
        },
        {
            name: 'Date Range Picker',
            ui_ux: <img src={statusAvailable}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.1</p>,
        },
        {
            name: 'Date Time Field',
            ui_ux: <img src={statusAvailable}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.0</p>,
        },
        {
            name: 'Display Field',
            ui_ux: undefined,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: <p>Code only component</p>,
            release: <p>Version 1.1</p>,
        },
        {
            name: 'Divider',
            ui_ux: undefined,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: <p>Code only component</p>,
            release: <p>Version 1.0</p>,
        },
        {
            name: 'Duration Field',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.0</p>,
        },
        {
            name: 'Expander',
            ui_ux: <img src={statusAvailable}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.1</p>,
        },
        {
            name: 'File Input',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.1</p>,
        },
        {
            name: 'File Upload',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.1</p>,
        },
        {
            name: 'Filters',
            ui_ux: <img src={statusInProgress}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: <p>In UI/UX design as of 01/2024</p>,
            release: <p>Version 1.2</p>,
        },
        {
            name: 'Flag',
            ui_ux: undefined,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.2</p>,
        },
        {
            name: 'Hyper Link',
            ui_ux: <img src={statusAvailable}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.0</p>,
        },
        {
            name: 'Icon',
            ui_ux: <img src={statusAvailable}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.0</p>,
        },
        {
            name: 'Image',
            ui_ux: undefined,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: <p>Code only component</p>,
            release: <p>Version 1.1</p>,
        },
        {
            name: 'Image Picker',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 3.0</p>,
        },
        {
            name: 'Label',
            ui_ux: undefined,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: <p>Code only component</p>,
            release: <p>Version 1.1</p>,
        },
        {
            name: 'Layout Grid',
            ui_ux: undefined,
            build: <img src={statusAvailable}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: <p>Code only component</p>,
            release: <p>Version 1.0</p>,
        },
        {
            name: 'List',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.1</p>,
        },
        {
            name: 'Lookup',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.0</p>,
        },
        {
            name: 'Maps',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.1</p>,
        },
        {
            name: 'Measure',
            ui_ux: <img src={statusAvailable}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.1</p>,
        },
        {
            name: 'Modal',
            ui_ux: <img src={statusAvailable}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.0</p>,
        },
        {
            name: 'Number Field',
            ui_ux: <img src={statusAvailable}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.0</p>,
        },
        {
            name: 'Overlay',
            ui_ux: undefined,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: <p>Code only component</p>,
            release: <p>Version 1.1</p>,
        },
        {
            name: 'Panel',
            ui_ux: <img src={statusAvailable}></img>,
            build: <img src={statusAvailable}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.0</p>,
        },
        {
            name: 'Password Field',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.0</p>,
        },
        {
            name: 'Popover',
            ui_ux: <img src={statusAvailable}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.0</p>,
        },
        {
            name: 'Progress Circular',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.1</p>,
        },
        {
            name: 'Progress Linear',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.1</p>,
        },
        {
            name: 'Radio',
            ui_ux: <img src={statusAvailable}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.0</p>,
        },
        {
            name: 'Radio Group',
            ui_ux: <img src={statusAvailable}></img>,
            build: <img src={statusAvailable}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.0</p>,
        },
        {
            name: 'Rich Text Editor',
            ui_ux: <img src={statusAvailable}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.1</p>,
        },
        {
            name: 'Row/Col',
            ui_ux: undefined,
            build: <img src={statusAvailable}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: <p>Code only component</p>,
            release: <p>Version 1.0</p>,
        },
        {
            name: 'Select',
            ui_ux: <img src={statusAvailable}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.0</p>,
        },
        {
            name: 'Sheet',
            ui_ux: <img src={statusAvailable}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.1</p>,
        },
        {
            name: 'Simple Table',
            ui_ux: undefined,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: <p>Code only component</p>,
            release: <p>Version 1.3</p>,
        },
        {
            name: 'Spacer',
            ui_ux: undefined,
            build: <img src={statusAvailable}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: <p>Code only component</p>,
            release: <p>Version 1.0</p>,
        },
        {
            name: 'Summary line',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: <p>UI/UX design to commence in 10/2024</p>,
            release: <p>Version 1.3</p>,
        },
        {
            name: 'Switch',
            ui_ux: <img src={statusAvailable}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.0</p>,
        },
        {
            name: 'Tab',
            ui_ux: <img src={statusAvailable}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.1</p>,
        },
        {
            name: 'Text Field',
            ui_ux: <img src={statusAvailable}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.0</p>,
        },
        {
            name: 'Textarea',
            ui_ux: <img src={statusAvailable}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.0</p>,
        },
        {
            name: 'Theme Provider',
            ui_ux: undefined,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: <p>Code only component</p>,
            release: <p>Version 1.0</p>,
        },
        {
            name: 'Time Field',
            ui_ux: <img src={statusAvailable}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.0</p>,
        },
        {
            name: 'Timeline',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.3</p>,
        },
        {
            name: 'Time Picker',
            ui_ux: <img src={statusAvailable}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.1</p>,
        },
        {
            name: 'Tooltip',
            ui_ux: <img src={statusAvailable}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.1</p>,
        },
        /* {
            name: 'Transition Text Field',
            ui_ux: <img src={statusAvailable}></img>,
            build: undefined,
            docs: undefined,
            release: undefined,
        } */
    ];

    return (
        <table className="component-status" style={{ width: '100%' }}>
            <thead>
                <tr>
                    <th>Component</th>
                    <th style={{ textAlign: 'center' }}>UI/UX</th>
                    <th style={{ textAlign: 'center' }}>Build</th>
                    <th style={{ textAlign: 'center' }}>Docs</th>
                    <th>Notes</th>
                    <th>Planned release</th>
                </tr>
            </thead>
            <tbody>
                {statusComponents.map((component) => (
                    <tr>
                        <td style={{ textAlign: 'left', width: '20%' }}>{component.name}</td>
                        <td style={{ textAlign: 'center', verticalAlign: 'middle', width: '12%' }}>{component.ui_ux}</td>
                        <td style={{ textAlign: 'center', verticalAlign: 'middle', width: '12%' }}>{component.build}</td>
                        <td style={{ textAlign: 'center', verticalAlign: 'middle', width: '12%' }}>{component.docs}</td>
                        <td style={{ textAlign: 'left' }}>{component.notes}</td>
                        <td style={{ textAlign: 'left', width: '16%' }}>{component.release}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
