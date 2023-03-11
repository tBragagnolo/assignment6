import useSWR from "swr"
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Error from "next/error";
import { Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Pagination } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";
import { Container } from "react-bootstrap";

export default function Artwork(){
    const PER_PAGE = 12;
    const [artworkList, setArtworkList] = useState();
    const [page, setPage] = useState(1);
    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];

    const {data, error} = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);

    function previous(){
        if(page > 1){
            setPage(prev => prev - 1);
        }
    }

    function next(){
        if(page < artworkList.length){
            setPage(prev => prev + 1);
        }
    }

    useEffect(()=>{
        if(data){
            let results = [];

            for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
                const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
                results.push(chunk);
            }  
            
            setArtworkList(results);
        }
        setPage(1);
    }, [data]);

    if(error){ return <Error statusCode={404} /> }

    if(artworkList){
        if(artworkList.length > 0){
            return(
                <>
                    <Row className="gy-4">
                        {artworkList[page - 1].map(m =>(
                            <Col lg={3} key={m}><ArtworkCard objectID={m} /></Col>
                        ))}
                    </Row> 
                    <Pagination>
                        <Pagination.Prev onClick={previous} />
                        <Pagination.Item>{page}</Pagination.Item>
                        <Pagination.Next onClick={next} />
                    </Pagination>
                </>
            )
        }
        else{
            return(
                <>
                    <Row className="gy-4">
                        <Card>
                            <Container>
                                <br />
                                <h4>Nothing Here</h4>
                                <span>Try searching something else</span>
                            </Container><br />
                        </Card>
                    </Row>
                </>
            ) 
        }
    }
    else{ return null }
}