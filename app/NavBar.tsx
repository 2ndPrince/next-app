'use client';
import React from 'react';
import Link from "next/link";
import {useSession} from "next-auth/react";

const NavBar = () => {
    const {status, data: session} = useSession();


    return (
        <div className="grid gap-4 grid-cols-3 grid-rows-1 bg-slate-200 p-5">
            <div className="col-span-2 flex space-x-3">
                <Link href="/" className="mr-5">Next.js</Link>
                <Link href="/users">Users</Link>
            </div>
            <div className="col-span-1 flex justify-end space-x-3">
                {status === 'loading' && <div>Loading...</div>}
                {status === 'authenticated' && <div>
                    {session.user!.name}
                    <Link href={"/api/auth/signout"} className="ml-3 btn">Sign Out</Link>
                </div>}
                {status === 'unauthenticated' && <Link href="/api/auth/signin" className={"btn btn-secondary"}>Login</Link>}
            </div>
        </div>
    );
};

export default NavBar;