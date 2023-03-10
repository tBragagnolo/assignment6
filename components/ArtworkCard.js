import useSWR from "swr"
import Error from "next/error"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function ArtworkCard(props){
    const {data, error} = useSWR();
    //374686

    if(error){ return <Error statusCode={404} /> }

    if(data){
        return(
            <>
                <Card>
                    {data?.primaryImageSmall ? <Card.Img src={data?.primaryImageSmall}/> : <Card.Img src="https://via.placeholder.com/375x375.png?text=[+Not+Available+]"/>}
                    {data?.title ? <Card.Title>{data?.title}</Card.Title> : <Card.Title>N/A</Card.Title>}
                    {data?.objectDate ? <Card.Text><strong>Date:</strong> {data?.objectDate}</Card.Text> : <Card.Text><strong>Date:</strong> N/A</Card.Text>}
                    {data?.classification ? <Card.Text><strong>Classification:</strong> {data?.classification}</Card.Text> : <Card.Text><strong>Classification:</strong> N/A</Card.Text>}
                    {data?.medium ? <Card.Text><strong>Medium:</strong> {data?.medium}</Card.Text> : <Card.Text><strong>Medium:</strong> N/A</Card.Text>}
                </Card>
            </>
        )
    }

    else{return null}
}