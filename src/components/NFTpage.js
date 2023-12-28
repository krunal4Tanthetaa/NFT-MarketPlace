import Navbar from "./Navbar";
import { GetIpfsUrlFromPinata } from "../FetchData/utils";
import { useNFTdata } from "../Context/NFTdata";
import Loading from "../ui/Loading";
import Popup from "../ui/Popup";
import MainDiv from "../ui/MainDiv";
import SellButton from "../ui/SellButton";
import BuyButton from "../ui/BuyButton";
import EditPage from "../ui/EditPage";

export default function NFTPage() {
    const {
        address,
        oneNFTdata: data,
        listSale,
        editPopup,
        setEditPopup,
        setTokenId,
    } = useNFTdata();

    const loginAddress = address?.toLowerCase() ?? "";
    const dataAddress = data?.owner?.toLowerCase() ?? "";

    if (typeof data.image == "string")
        data.image = GetIpfsUrlFromPinata(data.image);

    return (
        <MainDiv gap={12}>
            <div className="">
                <Navbar />
            </div>
            <div>
                <Loading />

                <div className="grid grid-cols-2 max-w-full">
                    <div className="flex justify-center">
                        <img
                            src={data.image}
                            alt=""
                            className="rounded-3xl h-[410] w-[410] 2xl:h-[710px] 2xl:w-[710px] shadow-2xl shadow-black r"
                        />
                    </div>
                    <div className="flex justify-center 2xl:justify-start">
                        <div className="text-xl space-y-4 text-white h-fit p-5 w-10/12 shadow shadow-[black] relative rounded-lg flex flex-col">
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
                                            established fact that a reader will
                                            be distracted by the readable
                                            content of a page when looking at
                                            its layout. The point of using Lorem
                                            Ipsum is that it has a more-or-less
                                            normal distribution of letters, as
                                            opposed to using 'Content here,
                                            content here', making it look like
                                            readable English. Many desktop
                                            publishing packages and web page
                                            editors now use Lorem Ipsum as their
                                            default model text, and a search for
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
                                            <BuyButton />
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
                                            <SellButton />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="shadow shadow-[#000] w-96 p-5 mt-8 rounded-2xl font-mono ">
                                        <div className="text-white-700 text-center">
                                            You own this NFT
                                        </div>
                                    </div>
                                )}
                            </div>
                            {data.isForSale && loginAddress == dataAddress && (
                                <button
                                    onClick={() => (setEditPopup(true),setTokenId(data.tokenId))}
                                    className="shadow shadow-[#000] w-60 p-5 absolute top-0 right-7 rounded-2xl text-center bg-[#1F618D] font-mono"
                                >
                                    Edit Listing
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                {editPopup && <EditPage />}

                {listSale && <Popup />}
            </div>
        </MainDiv>
    );
}
