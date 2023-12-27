import { Link } from "react-router-dom";
import { MdSell } from "react-icons/md";
import { GetIpfsUrlFromPinata } from "../FetchData/utils";
import { useNFTdata } from "../Context/NFTdata";
import { PulseLoader } from "react-spinners";

function NFTTile({ data, forSale = true, onClick }) {
    const { minLoading, setListSale, setTokenId, wait, tokenId } = useNFTdata();

    const newTo = {
        pathname: "/nftPage/" + data.tokenId,
    };

    const IPFSUrl = GetIpfsUrlFromPinata(data.image);

    return (
        <>
            <div>
                <div className="relative group ">
                    <div className="h-80 rounded-lg shadow-2xl overflow-hidden ">
                        <Link to={newTo} onClick={() => onClick?.()}>
                            <img
                                src={IPFSUrl ? IPFSUrl : ""}
                                alt=""
                                className="w-full h-full border border-[#3498DB] rounded-lg object-cover hover:scale-125 transition duration-500 cursor-pointer"
                            />
                        </Link>
                        <div className=" w-full p-2 bg-gradient-to-t from-[#454545] to-transparent rounded-lg pt-5 -mt-20 text-center ">
                            <strong className="font-semibold text-white text-lg">
                                {data.name}
                            </strong>
                            <p className="display-inline text-[#ECF0F1]">
                                {data.description}
                            </p>
                        </div>
                    </div>{" "}
                    {!forSale && (
                        <button
                            onClick={() => (
                                setListSale((list) => !list),
                                setTokenId(data.tokenId)
                            )}
                            disabled={minLoading}
                            class="invisible group-hover:visible absolute w-full h-1/5 rounded bottom-0 transition duration-500 bg-[#E74C3C] text-white"
                        >
                            {wait && data.tokenId == tokenId ? (
                                <div className="text-xl text-semibold text-center">
                                    <PulseLoader
                                        className="ml-5"
                                        color="#fff"
                                    />
                                </div>
                            ) : (
                                <div className="realtive">
                                    <h1>Sale now</h1>
                                    <div className="absolute top-2 left-2">
                                        <MdSell />
                                    </div>
                                </div>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}

export default NFTTile;
