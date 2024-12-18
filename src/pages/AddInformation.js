import React from 'react';
import CommonAdd from '../components/CommonAdd/CommonAdd';
import { useParams } from 'react-router-dom';


const AddInformation = () => {
    const { type } = useParams();
    return (
        <CommonAdd type={type} />
    );
};

export default AddInformation;