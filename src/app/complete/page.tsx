'use client'; // Ensures that this file is treated as a client component

import {Suspense, useEffect, useState} from 'react';
import {useSearchParams} from 'next/navigation';
import axios from 'axios';
import {common} from "@/data/utils";
import {parseCookies} from "nookies";
import {Button, Result} from "antd";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import {Purchase} from "@/data/types";
import Link from "next/link";


export default function CompletePageWrapper() {

    return <Suspense fallback={null}>
        <CompletePage/>
    </Suspense>
}


function CompletePage() {
    const searchParams = useSearchParams();
    const reference = searchParams.get('reference');
    const [success, setSuccess] = useState<boolean>(false);
    const [ticket, setTicket] = useState<Purchase>();
    const [hasRun, setHasRun] = useState(false);

    const completeTransaction = async (reference: string) => {
        try {
            const cookies = parseCookies(); // Read the cookies
            const token = cookies.token;
            const response = await axios.get(`${common.baseUrl}/api/v1/transactions/complete/${reference}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const raw = localStorage.getItem('viewed')

            if (response.data.success) {
                // Do something if the transaction is successful
                setSuccess(true);
                setTicket(response.data.data as Purchase);
                const viewed = raw ? JSON.parse(raw) : [];
                await axios.post(`${common.baseUrl}/api/v1/events/views`, {events: viewed})
                localStorage.removeItem('viewed');

            } else {
                setSuccess(false);
            }

            console.log('Transaction Completed:', response.data);
        } catch (error: any) {
            console.error('Error Completing Transaction:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        if (reference && !hasRun) {
            completeTransaction(reference);
            setHasRun(true);
        }
    }, [reference]);

    return <div className={'h-[calc(100vh-4.5rem)] w-full flex items-center justify-center'}>
        <Result className={''} title={'Ticket Purchase'}
                icon={success ? <CheckCircleOutlined/> : <CloseCircleOutlined/>}
                subTitle={'Tickets Successfully purchased'} extra={
            <div className={'space-x-2'}>
                <Link href={`/tickets/${ticket?._id}`}><Button type={'primary'}>View Tickets</Button></Link>
                <Link href={`/events/${ticket?.eventId}`}><Button>Buy Again</Button></Link>
            </div>
        } status={success ? 'success' : 'error'}/>
    </div>
}