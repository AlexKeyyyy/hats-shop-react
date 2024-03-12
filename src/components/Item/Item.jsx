import React from "react";
import Button from "../Button/Button";
import './Item.css'

const Item = ({product, className, onAdd}) => {
    const onAddHandler = () => {
        onAdd(product);
    }

    return (
        <div className={'product' + className}>
            <div className={'img'}>
                <img src={product.image} alt={product.title}/>
                <div className={'title'}>{product.title}</div>
                <div className={'description'}>{product.description}</div>
                <div className={'price'}>
                    <span>Стоимость: <b>{product.price}</b></span>
                </div>
                <button className={'add-btn'} onClick={onAddHandler}>
                    Добавить в корзину
                </button>
            </div>

        </div>
    )
}

export default Item;