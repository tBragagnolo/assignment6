import { useAtom } from "jotai"
import { favouritesAtom } from "@/store"
import { Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Container } from "react-bootstrap";

export default function Favourites(){
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

    if(favouritesList.length > 0){
        return(
            <>
                <Row className="gy-4">
                    {favouritesList.map(m =>(
                        <Col lg={3} key={m}><ArtworkCard objectID={m} /></Col>
                    ))}
                </Row> 
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
                            <span>Try adding some new artwork to the list</span>
                        </Container><br />
                    </Card>
                </Row> 
            </>
        )
    }
}