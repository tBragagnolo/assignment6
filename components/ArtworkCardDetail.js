import useSWR from "swr"
import Error from "next/error"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from "next/link";
import { Container } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";

export default function ArtworkCardDetail(props){
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    //var found = favouritesList.includes(Number(props.objectID));

    const [showAdded, setShowAdded] = useState(false);

    useEffect(()=>{
        setShowAdded(favouritesList?.includes(props.objectID))
    }, [favouritesList]);
    

    async function favouritesClicked(){
        if(showAdded == true){
            //setFavouritesList(current => current.filter(fav => fav != props.objectID));
            setFavouritesList(await removeFromFavourites(props.objectID)) 
            setShowAdded(false);
        }
        else{
            //setFavouritesList([...favouritesList, Number(props.objectID)]);
            setFavouritesList(await addToFavourites(props.objectID))
            setShowAdded(true);
        }
    }

    const {data, error} = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`);

    if(error){ return <Error statusCode={404} /> }

    if(data){
        return(
            <>
                <Card>
                    {data?.primaryImage && <Card.Img src={data?.primaryImage}/>}<br />
                    <Container>
                        {data?.title ? <Card.Title>{data?.title}</Card.Title> : <Card.Title>N/A</Card.Title>}
                        <Card.Text>
                            {data?.objectDate ? <span><b>Date:</b> {data?.objectDate}</span> : <span><b>Date:</b> N/A</span>}<br/>
                            {data?.classification ? <span><b>Classification:</b> {data?.classification}</span> : <span><b>Classification:</b> N/A</span>}<br/>
                            {data?.medium ? <span><b>Medium:</b> {data?.medium}</span> : <span><b>Medium:</b> N/A</span>}<br /><br/>
                            {data?.artistDisplayName ? <span><b>Artist:</b> {data?.artistDisplayName} (<a href={data?.artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a>)</span> : <span><b>Artist:</b> N/A</span>}<br/>
                            {data?.creditLine ? <span><b>Credit Line:</b> {data?.creditLine}</span> : <span><b>Credit Line:</b> N/A</span>}<br/>
                            {data?.dimensions ? <span><b>Dimensions:</b> {data?.dimensions}</span> : <span><b>Dimensions:</b> N/A</span>}<br/><br/>
                            {showAdded ? <Button variant="primary" onClick={favouritesClicked}>+ Favourite (added)</Button> : <Button variant="outline-primary" onClick={favouritesClicked}>+ Favourite</Button>}<br/>
                        </Card.Text>
                    </Container><br />
                </Card>
            </>
        )
    }

    else{ return null }
}