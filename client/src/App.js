import React from 'react';
import CsvTable from './components/papaparse/CsvTable.jsx';
import Upload from './components/upload/Upload.jsx';
import logo from './logo.svg';
import './App.css';

const app = () => {
    return (
        <div className='App'>
            <header style={{ minHeight: 'inherit' }} className='App-header'>
                <img src={logo} className='App-logo' style={{ width: '40px', height: '50px' }} alt='logo' />
            </header>
            <CsvTable />
            <Upload />
        </div>
    );
};

export default app;
