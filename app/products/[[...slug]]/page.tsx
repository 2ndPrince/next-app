import React from 'react';

interface Props {
    params: { slug: string[] },
    searchParams: { sortOrder: string },
}

const Page = ( {params: { slug }, searchParams: { sortOrder }}: Props) => {
    return (
        <div>
            <h1>Product Page {slug}</h1>
            <h2>{sortOrder}</h2>
        </div>
    );
};

export default Page;