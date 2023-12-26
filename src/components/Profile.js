import Navbar from "./Navbar";

import NFTTile from "./NFTTile";
import { FaAddressCard } from "react-icons/fa6";
import { useNFTdata } from "../Context/NFTdata";
import Loading from "../ui/Loading";

export default function Profile() {
    const {
        address,
        userNFT: data,
        loading,
        setOneNFTdata,
        sideOpen,
    } = useNFTdata();

    return (
        <div className={`flex flex-col px-4 py-1 ${sideOpen ? "blur-sm" : ""}`}>
            <div>
                <Navbar />
            </div>

            {loading ? (
                <Loading />
            ) : (
                <div className="">
                    <div className="flex justify-end p-4 text-lg">
                        <div className="flex gap-3 bg-slate-600 items-center justify-center p-4 rounded-xl text-[#ECF0F1]">
                            <h1 className="">
                                {" "}
                                <FaAddressCard />
                            </h1>
                            <h1>{address}</h1>
                        </div>
                    </div>
                    {/* <div className="flex ml-5 md:text-2xl text-white justify-center">
                        <div className="bg-purple-300 p-4 rounded-xl text-indigo-50">
                            <h2 className="font-semibold ">
                                NFTs. {data.length}
                            </h2>
                        </div>
                    </div> */}
                    <div className="max-w-full p-10 pt-4">
                    <div className="grid grid-cols-6 gap-8 gap-y-9">
                            {data.map((value, index) => {
                                return (
                                    <NFTTile
                                        data={value}
                                        key={index}
                                        forSale={value.isForSale}
                                        onClick={() => setOneNFTdata(value)}
                                    ></NFTTile>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
