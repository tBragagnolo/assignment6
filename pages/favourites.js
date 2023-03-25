import { useAtom } from "jotai"
import { favouritesAtom } from "@/store"

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
                  
            </>
        )
    }
}