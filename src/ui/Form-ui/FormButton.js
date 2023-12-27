import { useNFTdata } from "../../Context/NFTdata";
import MiniLoader from "../Miniloader";

function FormButton() {
    const { listNFT, minLoading } = useNFTdata();

    return (
        <div class="sm:col-span-2">
            <button
                className=" bg-[#27AE60] hover:bg-[#219151] py-3 w-full rounded-lg text-[white] tracking-wide"
                id="list-button"
                onClick={listNFT}
                disabled={minLoading}
            >
                {minLoading ? <MiniLoader /> : <h1>List NFT</h1>}
            </button>
        </div>
    );
}

export default FormButton;
