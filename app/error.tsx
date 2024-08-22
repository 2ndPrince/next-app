'use client';
import React from 'react';
import Error from "next/error";

interface Props {
    error: Error
    reset: () => void;
}

const ErrorPage = ({ error, reset }: Props) => {
    console.log('Error', error);
    return (
        <>
            <div>
                An unexpected error occurred.
            </div>
            <button className='btn btn-primary' onClick={() => reset()}>Retry</button>
        </>

    );
};

export default ErrorPage;