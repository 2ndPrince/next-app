import React from 'react';

interface Props {
    params: {
        id: number,
        id2: number
    }
}

const UserDetailPage = ({ params: { id, id2 }}: Props) => {
    return (
        <div>
            <h1>User Detail {id} {id2} </h1>
        </div>
    );
};

export default UserDetailPage;