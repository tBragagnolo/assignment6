import { useAtom } from "jotai"
import { searchHistoryAtom } from "@/store"
import { useRouter } from "next/router";
import { ListGroup } from "react-bootstrap";
import { Row, Col, Card, Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import styles from '@/styles/History.module.css';
import { removeFromHistory } from "@/lib/userData";

export default function History(){
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    const router = useRouter();
    if(!searchHistory) return null;

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

    async function removeHistoryClicked(e, index){
        e.stopPropagation(); 
        // setSearchHistory(current => {
        //     let x = [...current];
        //     x.splice(index, 1)
        //     return x;
        // });

        setSearchHistory(await removeFromHistory(searchHistory[index])) 
    }

    if(parsedHistory.length > 0){
        return(
            <>
                <ListGroup>
                    {parsedHistory.map((m, index) =>(
                        <ListGroup.Item className={styles.historyListItem} onClick={e => historyClicked(e, index)}>
                            {Object.keys(m).map(key => (<>{key}: <strong>{m[key]}</strong>&nbsp;</>))}
                            <Button className="float-end" variant="danger" size="sm" onClick={e => removeHistoryClicked(e, index)}>&times;</Button>
                        </ListGroup.Item>
                    ))}
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