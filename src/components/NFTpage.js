import Navbar from "./Navbar";
import { GetIpfsUrlFromPinata } from "../FetchData/utils";
import { useNFTdata } from "../Context/NFTdata";
import Loading from "../ui/Loading";
import Popup from "../ui/Popup";
import MainDiv from "../ui/MainDiv";
import SellButton from "../ui/SellButton";
import BuyButton from "../ui/BuyButton";
import EditPage from "../ui/EditPage";
import MiniLoader from "../ui/Miniloader";

import { MdOutlineLocalOffer } from "react-icons/md";
import { TfiMenuAlt } from "react-icons/tfi";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { useState } from "react";
import OfferTranButton from "../ui/OfferTranButton";
import OfferAcceptBtn from "../ui/OfferAcceptBtn";
import OfferAdd from "../ui/OfferAdd";
import PopupOffer from "../ui/PopupOffer";

export default function NFTPage() {
    const { address, state, dispatch, MakeOffer } = useNFTdata();

    const loginAddress = address?.toLowerCase() ?? "";
    const dataAddress = state.oneNFT?.owner?.toLowerCase() ?? "";

    const [dropDown, setDropDown] = useState(false);

    // console.log(state.AllOffer);

    if (typeof state.oneNFT.image == "string")
        state.oneNFT.image = GetIpfsUrlFromPinata(state.oneNFT.image);

    return (
        <MainDiv gap={12}>
            <div className="">
                <Navbar />
            </div>
            <div className="">
                <Loading />
                <div className="grid grid-cols-5 px-12 gap-7">
                    <div className="col-span-2 flex border border-black justify-center h-fit w-full">
                        <img
                            src={state.oneNFT.image}
                            alt=""
                            className="rounded-3xl shadow-2xl shadow-black r"
                        />
                    </div>
                    <div className="col-span-3 w-full place-self-start flex flex-col gap-5">
                        <div className="text-xl space-y-4 text-white h-fit p-5 w-full  shadow  shadow-[black] relative rounded-lg flex flex-col ">
                            <div className="flex">
                                <div className="shadow-md  shadow-black w-auto p-4 text-center text-[#ffffff] text-xl rounded-2xl font-mono font-semibold">
                                    # {state.oneNFT.name}
                                </div>
                            </div>

                            <div className="shadow shadow-black w-fit p-5 rounded-xl font-mono text-sm text-indigo-100">
                                <div>Owned by</div>
                                <div className="text-[#3498DB]">{`${state.oneNFT?.owner?.slice(
                                    0,
                                    9
                                )}....${state.oneNFT?.owner?.slice(-10)}`}</div>
                            </div>

                            <div className="flex">
                                <div className="shadow shadow-black   p-5 rounded-2xl  text-base text-[#AAB7B8]">
                                    <div className="text-xs text-indigo-100 ">
                                        <h5>Description</h5>
                                    </div>
                                    <div>
                                        <p>
                                            {state.oneNFT.description} It is a
                                            long established fact that a reader
                                            will be distracted by the readable
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

                            <div className=" font-bold text-indigo-50 text-xl ">
                                {loginAddress !== dataAddress ? (
                                    state.oneNFT.isForSale ? (
                                        <div className="shadow shadow-[#000000] w-full p-5 rounded-xl  mt-4 ">
                                            <div className="text-xs text-indigo-100 ml-2 ">
                                                <h1 className="font-normal">
                                                    Current price
                                                </h1>
                                            </div>
                                            <div className="font-semibold ml-2 font-sans h-10 text-4xl mb-2">
                                                <h1>
                                                    {state.oneNFT.price} MATIC
                                                </h1>
                                            </div>
                                            <div className="flex gap-2">
                                                <BuyButton />
                                                <button
                                                    className="bg-[#34495E] rounded-xl hover:bg-[#2e445a] p-4  w-1/2 text-[#FFFFFF]"
                                                    onClick={() => dispatch({ type:"setOfferPopup", payload: state.oneNFT.tokenId })}
                                                    disabled={state.isLoading}
                                                >
                                                    {state.isMinLoading ? (
                                                        <div className="flex gap-5 justify-center">
                                                            <MiniLoader />
                                                        </div>
                                                    ) : (
                                                        <div className="flex gap-5 justify-center text-lg font-bold">
                                                            <div>
                                                                <h1 className="tracking-wider flex justify-center items-center gap-3">
                                                                    <MdOutlineLocalOffer
                                                                        size={
                                                                            25
                                                                        }
                                                                    />{" "}
                                                                    Make offer
                                                                </h1>
                                                            </div>
                                                        </div>
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
                                ) : !state.oneNFT.isForSale ? (
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
                            {state.oneNFT.isForSale &&
                                loginAddress == dataAddress && (
                                    <button
                                        onClick={() =>
                                            dispatch({
                                                type: "setEditPopup",
                                                payload: state.oneNFT.tokenId,
                                            })
                                        }
                                        className="shadow shadow-[#000] w-60 p-5 absolute top-0 right-7 rounded-2xl text-center bg-[#1F618D] hover:bg-[#1f618d9c] font-mono"
                                    >
                                        Edit Listing
                                    </button>
                                )}
                        </div>
                        <div className={`flex flex-col`}>
                            <div
                                className={`bg-[#fff] h-16 flex items-center text-[#727272] justify-between p-7 border-b rounded-lg cursor-pointer ${
                                    dropDown == true ? "rounded-b-none" : ""
                                }`}
                                onClick={() => setDropDown((e) => !e)}
                            >
                                <div className="flex gap-3  font-extrabold text-xl">
                                    <TfiMenuAlt size={25} />
                                    <h1> Offers</h1>
                                </div>
                                <div>
                                    {dropDown ? (
                                        <RiArrowDropUpLine size={40} />
                                    ) : (
                                        <RiArrowDropDownLine size={40} />
                                    )}
                                </div>
                            </div>
                            <div
                                className={`bg-white mb-8 rounded-b-lg ${
                                    dropDown == true
                                        ? "visible "
                                        : "invisible"
                                }`}
                            >
                                <div className="grid grid-cols-5 border-b gap-5 justify-items-center p-1 text-[#9e9d9d] text-lg drop-shadow ">
                                    <h1>Price</h1>
                                    <h1>Floor Difference</h1>
                                    <h1>Quantity</h1>
                                    <h1>id</h1>
                                    {loginAddress !== dataAddress ? (
                                        <h1>From</h1>
                                    ) : (
                                        <h1>Accept Request</h1>
                                    )}
                                </div>

                                <div className="h-64 overflow-scroll overflow-x-hidden rounded-b-lg">
                                    {state.AllOffer.map((i) => {
                                        return (
                                            <div>
                                                {i.tokenId == state.tokenId ? (
                                                    <div
                                                        className={`grid grid-cols-5 gap-5 justify-items-center py-4 text-[#5c5c5c] bg-white text-lg font-medium border-b`}
                                                    >
                                                        <h1>
                                                            {i.price}{" "}
                                                            <span className="font-bold">
                                                                MATIC
                                                            </span>
                                                        </h1>
                                                        <h1>-</h1>
                                                        <h1>1</h1>
                                                        <h1>{i.tokenId}</h1>
                                                        <div>
                                                            {loginAddress !==
                                                            dataAddress ? (
                                                                <>
                                                                    {address?.toLowerCase() ==
                                                                    i.from.toLowerCase() ? (
                                                                        <OfferTranButton
                                                                            data={
                                                                                i
                                                                            }
                                                                        />
                                                                    ) : (
                                                                        <OfferAdd
                                                                            data={
                                                                                i
                                                                            }
                                                                        />
                                                                    )}
                                                                </>
                                                            ) : (
                                                                <OfferAcceptBtn
                                                                    data={i}
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {state.popUpEdit && <EditPage />}

                {state.popUpOffer && <PopupOffer/>}

                {state.popUpSale && <Popup />}
            </div>
        </MainDiv>
    );
}
