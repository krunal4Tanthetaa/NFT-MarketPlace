import { PropagateLoader } from "react-spinners";
import Navbar from "./Navbar";
import NFTTile from "./NFTTile";

import { useNFTdata } from "../Context/NFTdata";
import Loading from "../ui/Loading";
import MainDiv from "../ui/MainDiv";

export default function Marketplace() {

    const { AllNft, isConnected, setOneNFTdata } = useNFTdata();

    return (
        <>
            <MainDiv>
                <div className="">
                    <Navbar />
                </div>

                <div className="max-w-full p-10 ">
                    <div className="">
                        {AllNft.length === 0 ? (
                            isConnected ? (
                                <Loading />
                            ) : (
                                <div className="text-center flex flex-col gap-5 font-roboto text-2xl text-[#fdfdfd]">
                                    <p className="font-sans font-bold">
                                        Please Connect your Wallet
                                    </p>
                                    <div>
                                        <PropagateLoader color="#3498DB" />
                                    </div>
                                </div>
                            )
                        ) : (
                            <div
                                className={`grid grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 gap-y-9`}
                            >
                                {AllNft.map((value, index) => {
                                    return (
                                        <NFTTile
                                            data={value}
                                            key={index}
                                            onClick={() => setOneNFTdata(value)}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
                <Loading />
            </MainDiv>
        </>
    );
}
