import { useAtom } from "jotai"
import { favouritesAtom } from "@/store"
import { Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Container } from "react-bootstrap";

export default function Favourites(){
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

    if(favouritesList.lenght > 0){
        return(
            <>
                <h1>Favourites</h1>
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