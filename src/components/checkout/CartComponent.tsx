import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/data/store";
import {
    fetchExchangeRates,
    initiatePurchase,
    addToCart,
    removeFromCart,
    selectExchangeRates
} from "@/data/slices/cartSlice";
import {Button, Modal, Select} from "antd";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { format } from "date-fns";
import {useAppDispatch, useAppSelector} from "@/hooks/hooks";
import {selectFocusEvent} from "@/data/slices/eventsSlice";
import {useRouter} from "next/navigation";
import {event} from "next/dist/build/output/log";



export function ChoosePaymentMethod({show,setShow}: {show: boolean, setShow: (value: boolean) => void}) {
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state: RootState) => state.cart);
    const event = useAppSelector(selectFocusEvent)
    const router = useRouter();
    const { items, totalPrice, totalTickets, loading, error } = cart;
    const exchangeRates = useAppSelector(selectExchangeRates);
    function convertPrice(amount: number) {
        if (event && event.currency !== exchangeRates.currency){
            console.log(exchangeRates)
            const convertedPrice = amount * 1.035 / exchangeRates.rates[event.currency] ;
            return `${convertedPrice.toFixed(2)}`;
        } else return amount;
    }
    const handleInitiatePurchase = async (method:string) => {
        try {
            const authorizationUrl = await dispatch(initiatePurchase(method)).unwrap();
            console.log(authorizationUrl);
            router.push(authorizationUrl);
        } catch (err) {
            console.error("Failed to initiate purchase:", err);
        }
    };
    return <Modal open={show} title={'Choose Payments'} onCancel={() => setShow(false)} closable={true} onClose={() => setShow(false)} footer={null}>
        <div className={'grid grid-cols-2 gap-4 py-5'}>
            <div className={''}>
                <h3 className={'font-medium text-lg text-gray-800'}>Card Payment Amount</h3>
                <h4 className={'font-semibold text-lg'}>{exchangeRates.currency} {convertPrice(totalPrice)}</h4>
            </div>
            <div className={''}>
                <h3 className={'font-medium text-lg text-gray-800'}>Mobile Payment Amount</h3>
                <h4 className={'font-semibold text-lg'}>{event?.currency} {totalPrice}</h4>
            </div>
        </div>
        <div className={'grid grid-cols-2 gap-4'}>
            <Button type={'primary'} size={'large'} loading={loading} onClick={() => handleInitiatePurchase('credit_card')}>Card Payment</Button>
            <Button type={'primary'} size={'large'} ghost loading={loading} onClick={() => handleInitiatePurchase('mobile_money')}>Mobile Money</Button>
        </div>
    </Modal>
}

export function CartComponent() {
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state: RootState) => state.cart);
    const event = useAppSelector(selectFocusEvent)
    const { items, totalPrice, totalTickets, loading, error } = cart;
    const handleRemoveFromCart = (id: string) => {
        dispatch(removeFromCart(id));
    };
    const router = useRouter();
    const [show,setShow] = useState(false);
    const exchangeRates = useAppSelector(selectExchangeRates);


    if (!event){
        return <div>No event</div>
    }

    function convertPrice(amount: number) {
        if (event && event.currency !== exchangeRates.currency){
            console.log(exchangeRates)
        const convertedPrice = amount * 1.035 / exchangeRates.rates[event.currency] ;
        return `${convertedPrice.toFixed(2)}`;
        } else return amount;
    }
    return (
        <div>
            <ChoosePaymentMethod show={show} setShow={(value) => setShow(value)}/>
            <div className="flex justify-between items-center mt-4">
                <h1 className="font-medium my-0">Cart</h1>

            </div>
            <div className="bg-dark text-white rounded-lg ">
                <div className="px-4 pt-4">
                    <h3 className="font-semibold text-gray-500">{format(event.eventDate, 'EEE, dd MMM yyyy')}</h3>
                    <h2 className="font-semibold">{event.eventName}</h2>
                    <p className="flex items-center gap-1">
                        <HiOutlineLocationMarker className="text-primary" /> {event.venue.name}
                    </p>
                </div>
                <div>
                    {items.map(item => (
                        <div key={item.id} className="flex justify-between items-center bg-white bg-opacity-15  py-3 px-4">
                            <h4 className="">{item.amount} X {item.name}</h4>
                            <h4 className="font-medium">{event.currency} {item.price}</h4>
                            <Button type="link" danger onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
                        </div>
                    ))}
                    <div className="flex justify-between bg-white bg-opacity-15  py-3 px-4 mt-4">
                        <h4 className="my-0">Total:</h4>
                        <h4 className="font-medium my-0">{totalTickets} tickets</h4>
                        <h4 className="font-medium my-0">{event.currency} {totalPrice}</h4>
                    </div>

                    <div className={'p-4'}>
                        <h3 className={'font-medium text-lg text-gray-200'}>Payment Amount</h3>
                        <h4 className={'font-semibold text-lg'}>{event.currency} {totalPrice}</h4>
                    </div>

                </div>
                <div className="px-4 pb-4">
                    <Button type="primary" loading={loading} onClick={() => setShow(true)}>Confirm Purchase</Button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>
            </div>
        </div>
    );
}