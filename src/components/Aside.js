import { IoClose } from "react-icons/io5";
import { createPortal } from "react-dom";
import { FiAlertCircle } from "react-icons/fi";

import { useNFTdata } from "../Context/NFTdata";
import { MdDeleteForever } from "react-icons/md";

import { BeatLoader, PulseLoader } from "react-spinners";

function Aside() {
    const {
        setSideOpen,
        setselectMulNFT,
        selectMulNFT,
        buyMultipleNFTs,
        selectValue,
        minLoading,
        loading,
    } = useNFTdata();

    console.log(selectMulNFT);

    return (
        <>
            <div className={`${loading ? "opacity-10" : ""}`}>
                {createPortal(
                    <div
                        className={`h-screen w-2/5 absolute top-0 right-0 grid justify-items-end p-8`}
                    >
                        <div className="relative h-full w-3/5 bg-white rounded-2xl !blur-none">
                            <div className="border-b-2 flex justify-between h-20 items-center p-5">
                                <p className="font-sans text-2xl font-bold flex items-center gap-2">
                                    Your cart{" "}
                                    <span>
                                        <FiAlertCircle size={20} />
                                    </span>
                                </p>
                                <button onClick={() => setSideOpen((e) => !e)}>
                                    <IoClose size={30} />
                                </button>
                            </div>

                            <div
                                className={`flex flex-col border-b-2  px-5 pb-5 ${
                                    selectMulNFT.length == 0 ? "opacity-70" : ""
                                }`}
                            >
                                {selectMulNFT.length == 0 ? (
                                    <div className="flex justify-center items-center h-40 space-x-9 p-5 font-medium text-gray-400">
                                        <p>Add items to get started</p>
                                    </div>
                                ) : (
                                    <div className="flex px-2 pt-4 pb-3 justify-between text-base font-semibold">
                                        <div>
                                            {selectMulNFT.length}{" "}
                                            {selectMulNFT.length > 1
                                                ? "items"
                                                : "item"}
                                        </div>
                                        <div
                                            className="hover:text-slate-400 cursor-pointer"
                                            onClick={() => setselectMulNFT([])}
                                        >
                                            clear all
                                        </div>
                                    </div>
                                )}
                                {selectMulNFT.map((nft) => {
                                    return (
                                        <div className="p-2 flex rounded-lg gap-3 items-center">
                                            <div className="shadow-xl">
                                                <img
                                                    src={nft.image}
                                                    alt=""
                                                    className="h-28 w-24 rounded-xl"
                                                />
                                            </div>

                                            <div className="flex gap-2 flex-col font-bold">
                                                <p className="text-slate-700">
                                                    {nft.name}
                                                </p>
                                                <p>
                                                    {nft.description.substr(
                                                        0,
                                                        7
                                                    ) + "..."}
                                                </p>
                                            </div>
                                            <div className="ml-auto relative group  grid justify-end">
                                                <div className="">
                                                    <button
                                                        className="opacity-0 group-hover:opacity-100 duration-300 absolute inset-x-0 bottom-0 flex justify-center items-end text-xl bg-white text-black font-semibold"
                                                        onClick={() =>
                                                            setselectMulNFT(
                                                                (e) =>
                                                                    e.filter(
                                                                        (
                                                                            oneNft
                                                                        ) =>
                                                                            oneNft !==
                                                                            nft
                                                                    )
                                                            )
                                                        }
                                                    >
                                                        <MdDeleteForever
                                                            size={25}
                                                        />
                                                    </button>
                                                </div>
                                                <div>
                                                    <p className="text-xl font-bold">
                                                        {nft.price} MATIC
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div
                                className={`flex flex-col gap-4 ${
                                    selectMulNFT.length == 0 ? "opacity-30" : ""
                                }`}
                            >
                                <div className="flex justify-between p-5 text-xl font-bold">
                                    <div>Total price</div>
                                    <div>
                                        <p>{selectValue} MATIC</p>
                                    </div>
                                </div>
                                <div className="grid justify-center text-white">
                                    <button
                                        className="bg-blue-500 rounded-2xl hover:bg-blue-600 p-4 px-20 w-full  border-r-2"
                                        onClick={buyMultipleNFTs}
                                        disabled={minLoading}
                                    >
                                        {minLoading ? (
                                            <div className="flex gap-5 justify-center">
                                                <PulseLoader color="#fff" />
                                            </div>
                                        ) : (
                                            <div className="flex gap-5 justify-center">
                                                <div>Complete purchase</div>
                                            </div>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
            </div>
        </>
    );
}

export default Aside;
