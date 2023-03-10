import { useRouter } from "next/router";
import ArtworkCardDetail from "@/components/ArtworkCardDetail";

export default function ArtworkByld(){
    const router = useRouter();
    const {objectID} = router.query
    
    return(
        <>
            <Row>
                <Col>
                    <ArtworkCardDetail objectID={objectID} />
                </Col>
            </Row>
        </>
    )
}