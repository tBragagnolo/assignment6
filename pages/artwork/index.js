import userSWR from "swr"
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Artwork(){
    const PER_PAGE = 12;
    const [artworkList, setArtworkList] = useState();
    const [page, setPage] = useState(1);
    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];

    
}