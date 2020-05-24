import React from 'react';
import {Spinner} from 'reactstrap';

const Loading = () => {
    return (
        <>
            <Spinner type="grow" color="primary"/>
            <Spinner type="grow" color="secondary"/>
            <Spinner type="grow" color="success"/>
            <Spinner type="grow" color="danger"/>
            <Spinner type="grow" color="warning"/>
            <Spinner type="grow" color="info"/>
            <Spinner type="grow" color="light"/>
            <Spinner type="grow" color="dark"/>
        </>
    );
};

export default Loading;