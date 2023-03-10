import useSWR from "swr"
import Error from "next/error"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from "next/link";
import { Container } from "react-bootstrap";

export default function ArtworkCardDetail(props){
    const {data, error} = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`);
    //10496

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
                            {data?.dimensions ? <span><b>Dimensions:</b> {data?.dimensions}</span> : <span><b>Dimensions:</b> N/A</span>}<br/>
                        </Card.Text>
                    </Container><br />
                </Card>
            </>
        )
    }

    else{ return null }
}