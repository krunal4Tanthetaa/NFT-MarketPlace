/* eslint-disable react/style-prop-object */
import Navbar from "./Navbar";
import Loading from "../ui/Loading";
import MainDiv from "../ui/MainDiv";
import Image from "../ui/Form-ui/FormImage";
import Name from "../ui/Form-ui/FormName";
import Description from "../ui/Form-ui/FormDescription";
import Price from "../ui/Form-ui/FormPrice";
import FormButton from "../ui/Form-ui/FormButton";
import Title from "../ui/Form-ui/FormTitle";

export default function SellNFT() {
    return (
        <MainDiv gap={20}>
            <div>
                <Navbar />
            </div>
            <div className="max-h-[520px] ">
                <Loading />
                <form className="w-3/5 grid-rows-1 grid grid-cols-2 justify-center bg-white mx-auto  rounded-xl overflow-hidden">
                    <Image />

                    <div class="border-b border-gray-900/10 px-12 relative flex flex-col justify-center text-[#333333] font-roboto text-base font">
                        <Title />

                        <div className=" flex flex-col gap-6 p-3 my-16">
                            <Name />

                            <Description />

                            <Price />

                            <FormButton />
                        </div>
                    </div>
                </form>
            </div>
        </MainDiv>
    );
}
