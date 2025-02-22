import React, {useEffect , useState} from 'react';
import {useParams , useNavigate} from 'react-router-dom';
import axios from 'axios';

import { API_URL } from "../http/index_http.js";
import "../stylse/Reference.css"

function Reference() {
    const {id} = useParams();
    const [reference , setReference] = useState([]);
    // const navigate = useNavigate();

    const dataReference = async () => {
        try {
            const response = await axios.get(`${API_URL}/reference_books/${id}/`);
            console.log('response.dataReference: ', response.data);
            setReference(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect (() => {
        dataReference();
    }, [id])

    return (
        <div className="reference">
            <h1 className="reference-h1">Справочники</h1>
            <h2 className="reference-h2">{`${reference.reference_type}: ${reference.name}`}</h2>
            <div className="reference-content"><p>{reference.content}</p></div>
        </div>

    );



}

export default Reference;