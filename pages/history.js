import { useAtom } from "jotai"
import { searchHistoryAtom } from "@/store"

export default function History(){
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    return(
        <>

        </>
    )
}