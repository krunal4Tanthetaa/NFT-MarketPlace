import { createPortal } from "react-dom";
import { BeatLoader } from "react-spinners";

function Loading() {
    return (
        <div>
            {createPortal(
                <div className="text-center absolute top-1/2 right-1/2">
                    <BeatLoader color="#3498DB" size={25} />
                </div>,
                document.body
            )}
        </div>
    );
}

export default Loading;
