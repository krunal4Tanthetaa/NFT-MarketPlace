import { useNFTdata } from "../Context/NFTdata";

function MainDiv({ children, gap = 0 }) {
    const { sideOpen, loading } = useNFTdata();

    return (
        <div
            className={`flex flex-col  px-4 py-1 ${
                gap === 0 ? "" : `gap-${gap}`
            }  ${
                sideOpen || loading
                    ? "blur-sm opacity-50 pointer-events-none"
                    : ""
            }`}
        >
            {children}
        </div>
    );
}

export default MainDiv;
