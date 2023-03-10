import useSWR from "swr"
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

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
}