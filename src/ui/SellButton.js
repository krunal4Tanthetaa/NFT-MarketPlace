import { MdSell } from "react-icons/md";
import { useNFTdata } from "../Context/NFTdata";
import MiniLoader from "./Miniloader";

function SellButton({ id }) {
    const {
        setListSale,
        listSale,
        wait,
        setTokenId,
        oneNFTdata: data,
        handleListForSale,
    } = useNFTdata();

    function handleClick() {
        if (listSale == true) {
            return handleListForSale();
        } else {
            setTokenId(data.tokenId);
            setListSale(true);
        }
    }

    return (
        <div>
            <button
                className="bg-[#E74C3C] rounded-xl hover:bg-[#C0392B] px-28 py-4 relative w-full"
                disabled={wait}
                onClick={() => handleClick()}
            >
                <div className="absolute top-2 left-2">
                    <MdSell color="#fff" />
                </div>

                {wait ? (
                    <div className="text-xl text-semibold text-center">
                        <MiniLoader />
                    </div>
                ) : (
                    <div className="text-xl text-semibold text-center text-white">
                        Sale now
                    </div>
                )}
            </button>
        </div>
    );
}

export default SellButton;
