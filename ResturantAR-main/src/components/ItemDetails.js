import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getItemById } from '../API';

export default function ItemDetails() {
    let {itemId} = useParams();
    const [item, setitem] = useState({})

    useEffect(() => {
        async function fetchItem(){
            let item = await getItemById(itemId);
            setitem(state=>item);
        }
        fetchItem();
    }, [itemId])

    return (
        <div>
            <h1>{item.itemName}</h1>
        </div>
    )
}
