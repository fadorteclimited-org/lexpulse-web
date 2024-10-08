'use client'
import React, {useEffect} from "react";
import Header from "@/components/navigation/header";
import Footer from "@/components/navigation/footer";
import {usePathname} from "next/navigation";
import {
    changeRegion,
    fetchPopular,
    fetchPromoted,
    fetchUpcoming,
    selectEventsCountry,
    selectEventsLoading
} from "@/data/slices/eventsSlice";
import {useAppDispatch, useAppSelector} from "@/hooks/hooks";
import {checkUser, selectCurrentUser} from "@/data/slices/authSlice";
import {fetchExchangeRates} from "@/data/slices/cartSlice";
import {fetchTickets} from "@/data/slices/ticketsSlice";
import LoadingScreen from "@/components/LoadingScreen";
import {getCountry} from "@/data/utils";


export default function ContextProvider({children}: { children: React.ReactNode }) {
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const country = useAppSelector(selectEventsCountry);
    const user = useAppSelector(selectCurrentUser);
    const loading = useAppSelector(selectEventsLoading);

    useEffect(() => {
        getCountry().then((value) => {
            if (value){
                dispatch(changeRegion(value.name))
            }
        })
    }, []);

    useEffect(() => {
        dispatch(checkUser());
        dispatch(fetchUpcoming());
        dispatch(fetchPopular());
        dispatch(fetchPromoted());
        dispatch(fetchExchangeRates());

        console.log('Fetching')
    }, [country]);



    useEffect(() => {
        if (user) {
            dispatch(fetchTickets());
        }
    }, [dispatch, user]);

    if (loading) {
        return <LoadingScreen/>;
    }
    return <div>
        {pathname !== '/login' && <Header/>}
        <div className={`${pathname !== '/' && pathname !== '/login' && 'pt-[4.5rem]'}`}>
            {children}
        </div>
        {pathname !== '/login' && <Footer/>}
    </div>
}