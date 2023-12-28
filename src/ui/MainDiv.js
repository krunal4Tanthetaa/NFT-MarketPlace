import { useNFTdata } from "../Context/NFTdata";

function MainDiv({ children, gap = 0 }) {
    const { sideOpen, loading, listSale, editPopup } = useNFTdata();

    return (
        <div
            className={`flex flex-col px-4 py-1 h-screen ${`gap-${gap.toString()}`}  ${
                sideOpen || loading || listSale || editPopup
                    ? "blur-sm opacity-50 pointer-events-none"
                    : ""
            }`}
        >
            {children}
        </div>
    );
}

export default MainDiv;
