'use client';
import React, {useState} from 'react';
import {CldUploadWidget, CldImage} from "next-cloudinary";

interface CloudinaryResult {
    public_id: string;
}

const UploadPage = () => {
    const [publicId, setPublicId] = useState('');
    return (
        <>
            <div>
                {publicId && <CldImage src={publicId} width={270} height={180} alt={"A coffee image"}/>}
                <CldUploadWidget
                    options={{
                        sources: ['local'],
                        multiple: false,
                        maxFiles: 5,
                        styles: {}
                    }}
                    uploadPreset={'tymojv3y'}
                    onSuccess={(result, widget) => {
                        if (result.event !== 'success') return;
                        const info = result.info as CloudinaryResult;
                        setPublicId(info.public_id)
                    }}
                >
                    {({open}) =>
                        <button
                            className={'btn btn-primary'}
                            onClick={() => open()}
                        >Upload</button>}
                </CldUploadWidget>
            </div>
        </>

    );
};

export default UploadPage;