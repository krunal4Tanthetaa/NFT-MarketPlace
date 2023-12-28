import { MdOutlineRemoveShoppingCart, MdOutlineShoppingCart } from "react-icons/md";
import { useNFTdata } from "../Context/NFTdata";
import MiniLoader from "./Miniloader";




function BuyButton() {

    const { minLoading, setselectMulNFT, oneNFTdata: data, selectMulNFT , buyNFT} = useNFTdata();



    return (
        <div className="flex">
            <button
                className="bg-[#27AE60] rounded-xl hover:bg-[#219151] p-4  w-96 rounded-r-none border-r-2 text-[#FFFFFF]"
                onClick={() => buyNFT(data.price , data.tokenId)}
                disabled={minLoading}
            >
                {minLoading ? (
                    <div className="flex gap-5 justify-center">
                        <MiniLoader/>
                    </div>
                ) : (
                    <div className="flex gap-5 justify-center text-lg font-bold">
                        <div>
                            <h1 className="tracking-wider">Buy now</h1>
                        </div>
                    </div>
                )}
            </button>
            <button
                onClick={() =>
                    setselectMulNFT((ids) =>
                        ids.includes(data)
                            ? ids.filter((id) => id != data)
                            : [...ids, data]
                    )
                }
                className={`bg-[#27AE60] rounded-2xl hover:bg-[#219151]  p-4 w-46 rounded-l-none text-[#FFFFFF]`}
            >
                {selectMulNFT.includes(data) ? (
                    <MdOutlineRemoveShoppingCart size={30} />
                ) : (
                    <MdOutlineShoppingCart size={30} />
                )}
            </button>
        </div>
    );
}

export default BuyButton;
