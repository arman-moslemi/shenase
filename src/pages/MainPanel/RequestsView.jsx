import React from "react";
import MainRightMenu from "../../components/MainRightMenu";
import {ReactComponent as Doc} from "../../assets/icon/blue/doc.svg"

import { Link } from "react-router-dom";
import RequestViewStep1 from "../../components/RequestViewStep1";
import RequestViewStep2 from "../../components/RequestViewStep2";
import RequestViewStep3 from "../../components/RequestViewStep3";
import RequestViewStep4 from "../../components/RequestViewStep4";
const RequestsView = () =>{
    return(
        <div className="w-full h-full  bg-lightGray py-10 px-10 xl:px-0 md:p-0  lg:h-full" style={{direction:'rtl'}}>
        <div className="flex md:block">
            <MainRightMenu/>
            <div className="bg-white rounded-tr-none rounded-br-none rounded-tl-2xl rounded-bl-2xl p-12 my-10 w-[80%] xl:p-5 md:w-[95%] md:rounded-xl md:mx-auto">
            <div className="flex items-center justify-between sm:flex-wrap">
                    <div className="flex items-center">
                    <Doc/>
                <span style={{fontFamily:'Shabnam'}} className="font-IRsans text-mainColor mr-3 font-bold">
                  مشاهده درخواست
                </span>
                    </div>
                  
                </div>
            <div className="mt-12">
                <span className="text-mainColor font-bold" style={{fontFamily:'Shabnam'}}>
                    گام 1 -اطلاعات اولیه
                </span>
                </div>    
          <RequestViewStep1/>
          <div className="mt-12">
                <span className="text-mainColor font-bold" style={{fontFamily:'Shabnam'}}>
                  گام 2 -فهرست اسامی و مشخصات ماموران اعزامی
                </span>
                </div>  
                <RequestViewStep2/>
                <div className="mt-12">
                <span className="text-mainColor font-bold" style={{fontFamily:'Shabnam'}}>
                    گام 3 - اطلاعات تکمیلی
                </span>
                </div> 
                <RequestViewStep3/>
                <div className="mt-12">
                <span className="text-mainColor font-bold" style={{fontFamily:'Shabnam'}}>
                  گام 4 -توضیحات سفر
                </span>
                </div> 
                <RequestViewStep4/>
            </div>

        </div>
    </div>
    )
}
export default RequestsView;

/*responsive--done*/