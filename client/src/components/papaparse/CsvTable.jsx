import React, { useState, useEffect } from 'react';
import axios from "axios";

const CsvTable = () => {
    let [message, setMessage] = useState("Loading data...");
    let [data, setData] = useState([]);
    let count = 0;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect( async () => {
        const result = await axios(
            'http://localhost:9000/testAPI',
        );
        setMessage(result.data.message);
        setData(result.data.data);
    }, []);

    // return <>{data == 0 ? 'There is no data' : finalTable}</>;

    if(data.length === 0){
        return <p>{message}</p>
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

export default CsvTable;
