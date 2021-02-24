import React, { useState, useEffect } from 'react';
import axios from "axios";

const Upload = () => {
    let [message, setMessage] = useState("Please select a file to upload");
    let [data, setData] = useState([]);
    let count = 0;

    const sendData = async (event) => {
        setMessage("Uploading and analysing data...");
        event.preventDefault();
        let myForm = document.getElementById('csvForm');
        let csvFormData = new FormData(myForm);

        const response = await axios({
            method: 'post',
            url: 'http://localhost:9000/uploadCSV',
            data: csvFormData,
            headers: {'Content-Type': 'multipart/form-data' }
            })
            .then(function (response) {
                //handle success
                setMessage(response.data.message);
                setData(response.data.data);
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                setMessage(response.data.message);
                console.log(response);
            });
    }

    if(data.length === 0){
        return <>
        <p>{message}</p>
        <form method='POST' name="csvForm" id="csvForm" onSubmit={sendData}>
            <input type='file' name="csvFile" required />
            <input type='submit' value="Upload CSV" />
        </form>
        </>
    }
    else{
        const headers = Object.keys(data[0]);
        return (
            <>
                <p>{message}</p>
                <table>
                    <thead>
                        <tr>{headers.map((row, id) => {return <th key={id}>{row}</th>})}</tr>
                    </thead>
                    <tbody>
                        {
                        data.map((row, id) => {
                            count++;
                            return(
                                <tr data-trid={count} key={id}>
                                    {
                                        Object.keys(row).map(
                                            (key, index) => {return <td key={index}>{row[key]}</td>}
                                        )
                                    }
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            </>)
    }
    
};

export default Upload;

// fieldname: 'csvFile',
//   originalname: 'small.csv',
//   encoding: '7bit',
//   mimetype: 'application/vnd.ms-excel',
//   destination: './csv/subidos/',
//   filename: 'a15de329a29cee3eda5dd12fe8334c64',
//   path: 'csv\\subidos\\a15de329a29cee3eda5dd12fe8334c64',
//   size: 72