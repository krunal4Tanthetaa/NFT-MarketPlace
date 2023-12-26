import Navbar from "./Navbar";
import { useNFTdata } from "../Context/NFTdata";
import { BeatLoader, PulseLoader } from "react-spinners";
import Loading from "../ui/Loading";

export default function SellNFT() {
    const {
        listNFT,
        onChangeFile,
        setFormParams: updateFormParams,
        formParams,
        minLoading,
        loading,
        sideOpen,
    } = useNFTdata();

    return (
        <div
            className={`flex flex-col  px-4 py-1  ${sideOpen ? "blur-sm" : ""}`}
        >
            {" "}
            <div>
                <Navbar />
            </div>
            <div
                className="flex flex-col place-items-center mt-10"
                id="nftForm"
            >
                {loading ? (
                    <Loading />
                ) : (
                    <form className="bg-white shadow-md rounded-xl px-10 pt-4 pb-8 mb-4">
                        <h3 className="text-center font-bold text-purple-500 mb-8">
                            Upload your NFT to the marketplace
                        </h3>
                        <div className="mb-4">
                            <label
                                className="block text-purple-500 text-sm font-bold mb-2"
                                htmlFor="name"
                            >
                                NFT Name
                            </label>
                            <input
                                className="shadow appearance-none border bg-indigo-50 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                placeholder="Axie#4563"
                                onChange={(e) =>
                                    updateFormParams({
                                        ...formParams,
                                        name: e.target.value,
                                    })
                                }
                                value={formParams.name}
                            ></input>
                        </div>
                        <div className="mb-6">
                            <label
                                className="block text-purple-500 text-sm font-bold mb-2"
                                htmlFor="description"
                            >
                                NFT Description
                            </label>
                            <textarea
                                className="shadow appearance-none bg-indigo-50  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                cols="40"
                                rows="5"
                                id="description"
                                type="text"
                                placeholder="Axie Infinity Collection"
                                value={formParams.description}
                                onChange={(e) =>
                                    updateFormParams({
                                        ...formParams,
                                        description: e.target.value,
                                    })
                                }
                            ></textarea>
                        </div>
                        <div className="mb-6">
                            <label
                                className="block text-purple-500 text-sm font-bold mb-2"
                                htmlFor="price"
                            >
                                Price (in ETH)
                            </label>
                            <input
                                className="shadow appearance-none border bg-indigo-50  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="number"
                                placeholder="Min 0.01 ETH"
                                step="0.01"
                                value={formParams.price}
                                onChange={(e) =>
                                    updateFormParams({
                                        ...formParams,
                                        price: e.target.value,
                                    })
                                }
                            ></input>
                        </div>
                        <div>
                            <label
                                className="block text-purple-500 text-sm font-bold mb-2"
                                htmlFor="image"
                            >
                                Upload Image (&lt;500 KB)
                            </label>
                            <input
                                type={"file"}
                                onChange={onChangeFile}
                            ></input>
                        </div>
                        <br></br>

                        <button
                            className="font-bold mt-10 w-full bg-purple-500 text-white rounded p-2 shadow-lg hover:bg-purple-600"
                            id="list-button"
                            onClick={listNFT}
                            disabled={minLoading}
                        >
                            {minLoading ? (
                                <PulseLoader className="ml-5" color="#fff" />
                            ) : (
                                "List NFT"
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
