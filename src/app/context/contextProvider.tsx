'use client'
import React, {useEffect} from "react";
import Header from "@/components/navigation/header";
import Footer from "@/components/navigation/footer";
import {usePathname} from "next/navigation";
import {fetchPopular, fetchPromoted, fetchUpcoming} from "@/data/slices/eventsSlice";
import {useAppDispatch} from "@/hooks/hooks";
import {checkUser} from "@/data/slices/authSlice";


export default function ContextProvider({children}: { children: React.ReactNode }) {
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchUpcoming());
        dispatch(fetchPopular());
        dispatch(fetchPromoted());
        dispatch(checkUser());
        console.log('Fetching')
    }, [])
    return <div>
        {pathname !== '/login' && <Header/>}
        <div className={`${pathname !== '/' && pathname !== '/login' && 'pt-[4.5rem]'}`}>
            {children}
        </div>
        {pathname !== '/login' && <Footer/>}
    </div>
}