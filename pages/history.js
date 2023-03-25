import { useAtom } from "jotai"
import { searchHistoryAtom } from "@/store"
import { useRouter } from "next/router";
import { ListGroup } from "react-bootstrap";

export default function History(){
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    const router = useRouter();

    let parsedHistory = [];

    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    function historyClicked(e, index){
        let url = "/artwork?" + searchHistory[index];
        router.push(url);
    }

    function removeHistoryClicked(e, index){
        e.stopPropagation(); 
        setSearchHistory(current => {
            let x = [...current];
            x.splice(index, 1)
            return x;
        });
    }

    if(parsedHistory.length > 0){
        return(
            <>
                <ListGroup>
                    
                </ListGroup>
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
                            <span>Try searching for some artwork</span>
                        </Container><br />
                    </Card>
                </Row> 
            </>
        )
    }
}