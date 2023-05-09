import React  from "react";
import blackLogo from "../../assets/img/logoBlack.png"
import { Link } from "react-router-dom";
import {ReactComponent as Doc} from "../../assets/icon/black/doc.svg"
const ChangePassStep2 = () =>{

    return(
        <div className="w-full h-screen bg-lightGray sm:p-2 p-16 " style={{direction:'rtl'}}>
            <img src={blackLogo} alt="logo" className="w-[218px] h-[131px] mx-auto"/>
            <div className="bg-white w-[32%] p-16 sm:p-6 rounded-xl mx-auto shadow-blackShadow my-8 xl:w-[80%] lg:w-[80%] md:w-[100%] sm:w-[100%] xs:w-[100%]">
               <p className="text-right font-bold text-black font-IRsans">
                 کد تایید را وارد کنید
                </p>
                <hr className="border-t-4 border-t-mainColor mb-6 border-solid w-8 rounded-full float-right mt-2"/>
                <div class="relative my-6">
                    <div class="absolute top-6 right-2 flex items-center pl-3 pointer-events-none">
                        <Doc/>
                    </div>
                    <input type="text" id="input-group-1" class="pr-9 font-IRsans text-right right-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md my-5 focus:ring-mainColor focus:border-mainColor block w-full pl-10 p-2.5  " placeholder="کد ارسال شده"/>
                </div> 
                <div className="flex items-center justify-start mt-2">
                    <p className="font-IRsans text-black text-xs">
                       ارسال مجدد : 
                    </p>
                    <p className="font-IRsans text-mainColor text-xs mr-1 font-bold hover:text-lightBlue">
                        00:20
                    </p>
                </div>
              <Link to={'/newPassword'}>
              <button className="w-full h-12 bg-mainColor shadow-blueShadow mt-6 font-IRsans text-white text-lg rounded-lg hover:bg-lightBlue hover:text-mainColor">
                   ثبت
                </button> 
              </Link>
            </div>
        </div>
    )
}
export default ChangePassStep2;