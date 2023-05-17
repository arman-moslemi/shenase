import React  from "react";
import MainRightMenu from "../../components/MainRightMenu";
import {ReactComponent as Doc} from "../../assets/icon/blue/doc.svg"
import TravelingDoneReport from "../../components/TravelingDoneReport";

const TravelDone = () =>{

    return(
        <div className="w-full h-full bg-lightGray py-10 px-32 xl:px-0 md:p-0  lg:h-full" style={{direction:'rtl'}}>
        <div className="flex md:block">
            <MainRightMenu/>
            <div className="bg-white rounded-tr-none rounded-br-none rounded-tl-2xl rounded-bl-2xl p-12 my-10 w-[80%] xl:p-5 md:w-[95%] md:rounded-xl md:mx-auto">
            <div className="flex items-center">
                    <Doc/>
                <span className="font-IRsans text-mainColor mr-3 font-bold">
                      گزارش سفر
                </span>
                </div>
                <div className="w-full flex justify-end">
            <div className="px-10 w-max h-[40px] rounded-3xl text-white font-IRsans bg-tripDone flex justify-center items-center font-bold">
                اتمام سفر
            </div>
            </div>
                <TravelingDoneReport/>
            </div>
            
        </div>
    </div>
    )
}
export default TravelDone;


/*responsive--done*/