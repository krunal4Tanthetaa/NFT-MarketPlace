import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import {
    MdOutlineShoppingCart,
    MdSell,
    MdOutlineRemoveShoppingCart,
} from "react-icons/md";
import { parseUnits } from "ethers";
import toast from "react-hot-toast";

import { GetIpfsUrlFromPinata } from "../FetchData/utils";
import { PulseLoader } from "react-spinners";
import { useNFTdata } from "../Context/NFTdata";
import { IoMdClose } from "react-icons/io";
import Loading from "../ui/Loading";

export default function NFTPage() {
    const {
        MarketPlaceContract,
        address,
        setLoading,
        loading,
        minLoading,
        setMinLoading,
        navigate,
        handleListForSale,
        oneNFTdata: data,
        wait,
        listPrice,
        setListPrice,
        listSale,
        setListSale,
        setTokenId,
        userNFTdata,
        getAllNFTs,
        setselectMulNFT,
        selectMulNFT,
        sideOpen,
    } = useNFTdata();

    const params = useParams();
    const tokenId = params.tokenId;

    async function buyNFT() {
        try {
            setMinLoading(true);
            const contract = await MarketPlaceContract();

            const salePrice = parseUnits(data.price, "ether");

            console.log(tokenId, salePrice, contract);

            //run the executeSale function
            let transaction = await contract.executeSale(tokenId, {
                value: salePrice,
                gasLimit: 20000000,
            });

            setLoading(true);
            await transaction.wait();

            toast.success("You successfully bought the NFT!");
            setLoading(false);
            setMinLoading(false);
            // const abc = await getAllNFTs();
            // const aaa = await userNFTdata();
            await getAllNFTs();
            await userNFTdata();

            // if (abc && aaa) {
            navigate("/profile");
            // }
        } catch (error) {
            if (error.reason == "rejected") {
                toast.error(`Error message ${error.reason}`);
                setListPrice("");
                setMinLoading(false);
                setLoading(false);
            } else {
                console.log(error);
                toast.error(`Error message ${error.reason}`);
            }
        }
    }

    const loginAddress = address?.toLowerCase() ?? "";
    const dataAddress = data?.owner?.toLowerCase() ?? "";

    if (typeof data.image == "string")
        data.image = GetIpfsUrlFromPinata(data.image);

    return (
        <div
            className={`flex flex-col  px-4 py-1  gap-12  ${
                sideOpen ? "blur-sm" : ""
            }`}
        >
            <div className="">
                <Navbar />
            </div>
            <div>
                {!data || loading ? (
                    <Loading />
                ) : (
                    <div className="grid grid-cols-2 max-w-full">
                        <div className="flex justify-center">
                            <img
                                src={data.image}
                                alt=""
                                className="rounded-3xl h-[710px] w-[710px] shadow-2xl shadow-black r"
                            />
                        </div>
                        <div>
                            <div className="text-xl space-y-4 text-white h-fit p-5 w-10/12 shadow shadow-[black] rounded-lg flex flex-col">
                                <div className="flex">
                                    <div className="shadow-md  shadow-black w-auto p-4 text-center text-[#ffffff] text-xl rounded-2xl font-mono font-semibold">
                                        # {data.name}
                                    </div>
                                </div>

                                <div className="shadow shadow-black w-fit p-5 rounded-xl font-mono text-sm text-indigo-100">
                                    <div>Owned by</div>
                                    <div className="text-[#3498DB]">{`${data?.owner?.slice(
                                        0,
                                        9
                                    )}....${data?.owner?.slice(-10)}`}</div>
                                </div>

                                <div className="flex">
                                    <div className="shadow shadow-black   p-5 rounded-2xl  text-base text-[#AAB7B8]">
                                        <div className="text-xs text-indigo-100 ">
                                            <h5>Description</h5>
                                        </div>
                                        <div>
                                            <p>
                                                {data.description} It is a long
                                                established fact that a reader
                                                will be distracted by the
                                                readable content of a page when
                                                looking at its layout. The point
                                                of using Lorem Ipsum is that it
                                                has a more-or-less normal
                                                distribution of letters, as
                                                opposed to using 'Content here,
                                                content here', making it look
                                                like readable English. Many
                                                desktop publishing packages and
                                                web page editors now use Lorem
                                                Ipsum as their default model
                                                text, and a search for
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mr-10 font-bold text-indigo-50 text-xl w-8/12">
                                    {loginAddress !== dataAddress ? (
                                        data.isForSale ? (
                                            <div className="shadow shadow-[#000000] w-full p-5 rounded-xl  mt-4 ">
                                                <div className="text-xs text-indigo-100 ml-2 ">
                                                    <h1 className="font-normal">
                                                        Current price
                                                    </h1>
                                                </div>
                                                <div className="font-semibold ml-2 font-sans h-10 text-4xl mb-2">
                                                    <h1>{data.price} MATIC</h1>
                                                </div>
                                                <div className="flex">
                                                    <button
                                                        className="bg-[#27AE60] rounded-xl hover:bg-[#219151] p-4  w-96 rounded-r-none border-r-2 text-[#FFFFFF]"
                                                        onClick={buyNFT}
                                                        disabled={minLoading}
                                                    >
                                                        {minLoading ? (
                                                            <div className="flex gap-5 justify-center">
                                                                <PulseLoader color="#fff" />
                                                            </div>
                                                        ) : (
                                                            <div className="flex gap-5 justify-center text-lg font-bold">
                                                                <div>
                                                                    <h1 className="tracking-wider">
                                                                        Buy now
                                                                    </h1>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            setselectMulNFT(
                                                                (ids) =>
                                                                    ids.includes(
                                                                        data
                                                                    )
                                                                        ? ids.filter(
                                                                              (
                                                                                  id
                                                                              ) =>
                                                                                  id !=
                                                                                  data
                                                                          )
                                                                        : [
                                                                              ...ids,
                                                                              data,
                                                                          ]
                                                            )
                                                        }
                                                        className={`bg-[#27AE60] rounded-2xl hover:bg-[#219151]  p-4 w-46 rounded-l-none text-[#FFFFFF]`}
                                                    >
                                                        {selectMulNFT.includes(
                                                            data
                                                        ) ? (
                                                            <MdOutlineRemoveShoppingCart
                                                                size={30}
                                                            />
                                                        ) : (
                                                            <MdOutlineShoppingCart
                                                                size={30}
                                                            />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="shadow shadow-purple-950 w-96 p-5 rounded-2xl font-mono mt-8">
                                                <div className="text-white-700">
                                                    This NFT is Not for Sell
                                                </div>
                                            </div>
                                        )
                                    ) : !data.isForSale ? (
                                        <div className="shadow shadow-black w-96 p-5 rounded-2xl font-mono mt-8 flex flex-col items-center">
                                            <div className="text-white-700">
                                                <h1 className="m-3">
                                                    You own this NFT
                                                </h1>
                                                <button
                                                    className="bg-[#E74C3C] rounded-xl hover:bg-[#C0392B] px-28 py-4 relative"
                                                    disabled={wait}
                                                    onClick={() => (
                                                        setListSale(
                                                            (list) => !list
                                                        ),
                                                        setTokenId(data.tokenId)
                                                    )}
                                                >
                                                    <div className="absolute top-2 left-2">
                                                        <MdSell />
                                                    </div>

                                                    {wait ? (
                                                        <div className="text-xl text-semibold text-center">
                                                            <PulseLoader
                                                                className="ml-5"
                                                                color="#fff"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="text-xl text-semibold text-center">
                                                            Sale now
                                                        </div>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="shadow shadow-[#000] w-96 p-5 rounded-2xl font-mono mt-8">
                                            <div className="text-white-700 text-center">
                                                You own this NFT
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {listSale && (
                    <>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-purple-400 w-96 h-auto rounded-xl">
                            <div className="text-right mt-3 mr-5">
                                <button
                                    onClick={() => (
                                        setListSale((list) => !list),
                                        setListPrice("")
                                    )}
                                >
                                    <IoMdClose size={25} />
                                </button>
                            </div>
                            <div className="text-center text-xl ">
                                Price:{" "}
                                <input
                                    type="number"
                                    value={listPrice}
                                    onChange={(e) =>
                                        setListPrice(e.target.value)
                                    }
                                    className="rounded-full text-black pl-4 bg-indigo-50"
                                    required
                                />
                            </div>
                            <div className="text-center m-5">
                                <button
                                    type="submit"
                                    className="bg-purple-500 p-3 rounded-xl w-40 hover:bg-purple-600"
                                    onClick={() => (
                                        handleListForSale(),
                                        setListSale((list) => !list)
                                    )}
                                >
                                    List on Sell
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
