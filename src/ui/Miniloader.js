import { PulseLoader } from "react-spinners"

function MiniLoader({ color = "#ffff" }) {
    return (
        <div>
             <PulseLoader className="ml-5" color={`${color}`} />
        </div>
    )
}

export default MiniLoader;
