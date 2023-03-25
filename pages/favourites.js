import { useAtom } from "jotai"
import { favouritesAtom } from "@/store"
import { Row, Col } from "react-bootstrap";

export default function Favourites(){
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

    if(favouritesList){
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
                                <span>Try searching something else</span>
                            </Container><br />
                        </Card>
                    </Row> 
            </>
        )
    }
}