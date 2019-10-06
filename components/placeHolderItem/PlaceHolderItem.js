import cn from './PlaceHolderItem.scss';
import React from "react";

const PlaceHolderItem = ({title}) => (
    <li className={cn.placeHolderItem}>{title}</li>
);

export default PlaceHolderItem;