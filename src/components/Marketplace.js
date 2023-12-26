import { BeatLoader, PropagateLoader } from "react-spinners";
import Navbar from "./Navbar";
import NFTTile from "./NFTTile";

import { useNFTdata } from "../Context/NFTdata";
import Loading from "../ui/Loading";

export default function Marketplace() {
    const { AllNft, isConnected, setOneNFTdata, loading, sideOpen } =
        useNFTdata();
        console.log(AllNft)

    return (
        <>
            <div
                className={`flex flex-col  px-4 py-1  ${
                    sideOpen ? "blur-sm" : ""
                }`}
            >
                <div className="">
                    <Navbar />
                </div>

                {loading ? (
                    <Loading />
                ) : (
                    <div className="max-w-full p-10 ">
                        <div className="">
                            {AllNft.length === 0 ? (
                                isConnected ? (
                                    <Loading />
                                ) : (
                                    <div className="text-center flex flex-col gap-5 text-2xl text-white">
                                        <p className="font-sans font-bold">
                                            Please Connect your Wallet
                                        </p>
                                        <div>
                                            <PropagateLoader color="#fff" />
                                        </div>
                                    </div>
                                )
                            ) : (
                                <div className="grid grid-cols-6 gap-8 gap-y-9">
                                    {AllNft.map((value, index) => {
                                        return (
                                            <NFTTile
                                                data={value}
                                                key={index}
                                                onClick={() =>
                                                    setOneNFTdata(value)
                                                }
                                            />
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
