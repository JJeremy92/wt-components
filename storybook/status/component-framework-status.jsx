import statusAvailable from '../assets/statusAvailable.svg';
import statusPlanned from '../assets/statusPlanned.svg';
import React from 'react';
export default function ComponentStatus() {
    const statusComponents = [
        {
            name: 'About',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: undefined,
        },
        {
            name: 'Actionbar',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: undefined,
        },
        {
            name: 'App',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusAvailable}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: undefined,
        },
        {
            name: 'Breadcrumbs',
            ui_ux: <img src={statusAvailable}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 3.0</p>,
        },
        {
            name: 'Change Branch',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: undefined,
        },
        {
            name: 'Change Password',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: undefined,
        },
        {
            name: 'Choose One',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: undefined,
        },
        {
            name: 'Container',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusAvailable}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: undefined,
        },
        {
            name: 'Conversation',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: undefined,
        },
        {
            name: 'Document Preview',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: undefined,
        },
        {
            name: 'EDocs',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: undefined,
        },
        {
            name: 'Entity Actions',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: undefined,
        },
        {
            name: 'Footer',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: undefined,
        },
        {
            name: 'Help',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: undefined,
        },
        {
            name: 'Main',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusAvailable}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: undefined,
        },
        {
            name: 'Masthead',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: undefined,
        },
        {
            name: 'Navigation',
            ui_ux: <img src={statusAvailable}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: <p>Version 1.0</p>,
        },
        {
            name: 'Notifications',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: undefined,
        },
        {
            name: 'Recent / Favorites',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: undefined,
        },
        {
            name: 'Status',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: <p>UI/UX design to commence in 02/2024</p>,
            release: <p>Version 1.3</p>,
        },
        {
            name: 'User',
            ui_ux: <img src={statusPlanned}></img>,
            build: <img src={statusPlanned}></img>,
            docs: <img src={statusPlanned}></img>,
            notes: undefined,
            release: undefined,
        },
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
