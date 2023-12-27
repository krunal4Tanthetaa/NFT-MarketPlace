import { createPortal } from "react-dom";
import { BeatLoader } from "react-spinners";
import { useNFTdata } from "../Context/NFTdata";

function Loading() {
    const { loading } = useNFTdata();

    return (
        <>
            {loading ? (
                <div>
                    {createPortal(
                        <div className="text-center absolute top-1/2 right-1/2">
                            <BeatLoader color="#3498DB" size={25} />
                        </div>,
                        document.body
                    )}
                </div>
            ) : (
                ""
            )}
        </>
    );
}

export default Loading;
