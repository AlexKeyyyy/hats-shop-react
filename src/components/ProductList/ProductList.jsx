import React, {useState} from "react";
import './ProductList.css'
import Item from "../Item/Item";
import {useTelegram} from "../../hooks/useTg";
import {useEffect, useCallback} from "react";

const products = [
    {id: '1', title: 'Шапка', price: 5000, description: 'Крутая шапка'},
    {id: '2', title: 'Чепчик', price: 2700, description: 'Лучший чепчик'},
    {id: '3', title: 'Кепочка', price: 2500, description: 'Кепарик'},
    {id: '4', title: 'Ушанка', price: 2000, description: 'Чтобы ухам тепло'},
    {id: '5', title: 'Томас Шелби', price: 10000, description: 'Прям с Келиана Мерфи'},
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    },0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('http://localhost:8000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if (alreadyAdded) {
            newItems = addedItems.filter(item => item.id === product.id);
        } else {
            newItems = [...addedItems, product]
        }

        setAddedItems(newItems);

        if (newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams( {
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <Item
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    )
}

export default ProductList;