import {Button} from "antd";
import {HeartOutlined} from "@ant-design/icons";
import {format} from "date-fns";
import {HiOutlineLocationMarker} from "react-icons/hi";
import {EventModel} from "@/data/types";


export default function EventComponent({event}: { event: EventModel }) {
    return (
        <div className={'rounded-lg bg-white bg-opacity-20 backdrop-blur-md'}>
            <div className={'relative flex justify-end'}>
                <img src={event.poster} className={'aspect-square w-full object-cover rounded-lg'} alt={event.name}/>
                <Button
                    className={'absolute top-0 right-0 z-10 text-primary m-3'}
                    size={'large'}
                    type={'default'}
                    icon={<HeartOutlined/>}
                    shape={'circle'}
                />
            </div>
            <h3 className={'text-xl font-medium mt-2 mb-1 capitalize'}>{event.name}</h3>
            <div className={'flex justify-between items-center'}>
                <div className={'px-2'}>

                    {/* Format date to "Sat, Aug 24, yyyy" */}
                    <h4 className={'text-primary my-0'}>
                        {format(new Date(event.date), 'EEE, MMM dd, yyyy')}
                    </h4>
                    <span className={'flex gap-2 text-opacity-20'}><HiOutlineLocationMarker/> <h4
                        className={'text-gray-700'}>{event.location}</h4></span>
                </div>
                <h4 className={'text-primary'}>GHS {event.price.toFixed(2)}</h4>
            </div>
        </div>
    );
}