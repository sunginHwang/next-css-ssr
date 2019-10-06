import * as React from "react";
import axios from 'axios';
import PlaceHolderItem from "../components/placeHolderItem/PlaceHolderItem";

function PlaceHolder({ placeHolders }) {
    const renderPlaceHolders = placeHolders.map(p => <PlaceHolderItem title={p.title}/>)
    return(
        <div>
            <ul>
                {renderPlaceHolders}
            </ul>
        </div>
    )
}

PlaceHolder.getInitialProps = async ({}) => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return { placeHolders: res.data }
}

export default PlaceHolder;