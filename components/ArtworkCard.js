import useSWR from "swr"
import Error from "next/error"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from "next/link";
import { Container } from "react-bootstrap";

export default function ArtworkCard(props){
    const {data, error} = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`);

    const btnURL = "/artwork/" + props.objectID;

    if(error){ return <Error statusCode={404} /> }

    if(data){
        return(
            <>
                <Card style={{ width: '18rem' }}>
                    {data?.primaryImageSmall ? <Card.Img src={data?.primaryImageSmall}/> : <Card.Img src="https://via.placeholder.com/375x375.png?text=[+Not+Available+]"/>}<br />
                    <Container>
                        {data?.title ? <Card.Title>{data?.title}</Card.Title> : <Card.Title>N/A</Card.Title>}
                        <Card.Text>
                            {data?.objectDate ? <span><b>Date:</b> {data?.objectDate}</span> : <span><b>Date:</b> N/A</span>}<br/>
                            {data?.classification ? <span><b>Classification:</b> {data?.classification}</span> : <span><b>Classification:</b> N/A</span>}<br/>
                            {data?.medium ? <span><b>Medium:</b> {data?.medium}</span> : <span><b>Medium:</b> N/A</span>}
                        </Card.Text>
                        <Link href={btnURL} passHref>
                            <Button variant="outline-dark"><b>ID:</b> {data?.objectID}</Button>
                        </Link>
                    </Container><br />
                </Card>
            </>
        )
    }

    else{ return null }
}