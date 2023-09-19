import React, { useState, useEffect } from "react";
import ExpertRightMenu from "../../components/ExpertComponent/ExpertRightMenu";
import {ReactComponent as Doc} from "../../assets/icon/blue/doc.svg"
import ExpertRequestList from "../../components/ExpertComponent/ExpertRequestList";
import {ReactComponent as Search} from "../../assets/icon/white/search.svg"
import Cookies from 'universal-cookie';
import { axiosReq } from "../../commons/axiosReq";
import { useNavigate } from "react-router-dom";
const ExpertRequestsList = () =>{
    const [data, setData] = useState();
  const [reCheck, setRecheck] = useState(false);
  const [ticket, setTicket] = useState()

  let navigate = useNavigate();

  useEffect(() => {

    auth();
  }, [reCheck]);
  const auth = async () => {
    const cookies = new Cookies();
    var token = cookies.get('token');
    console.log(token)
    if (!token) {
      navigate("/");
    } else {
      if (cookies.get('Role') == "InternationalExpert") {
        GetData()

      }
      else {
        navigate("/");

      }
    }
  }
    const GetData = async () => {
        console.log(1234)
        const cookies = new Cookies();
    
    
    
        const dataUser = await axiosReq("Ticket/GetSubTickets", {
          TicketId: cookies.get("ID")
        });
        console.log(dataUser)
        setData(dataUser.data)
        const tickets = await axiosReq("Ticket/GetTicket", {
          TicketId: cookies.get("ID")
        });
        console.log(tickets)
        setTicket(tickets?.data)
    
    
      }
    return(
        <div className="w-full h-screen bg-lightGray py-10 px-10 xl:px-0 md:p-0  lg:h-full" style={{direction:'rtl'}}>
        <div className="flex md:block">
            <ExpertRightMenu/>
            <div className="bg-white rounded-tr-none rounded-br-none rounded-tl-2xl rounded-bl-2xl p-8 my-10 w-[80%] xl:p-5 md:w-[95%] md:rounded-xl md:mx-auto">
           
            <div className="flex items-center">
                    <Doc/>
                <span style={{fontFamily:'Shabnam'}} className="   text-mainColor mr-3 font-bold">
                    تاریخچه درخواست ها
                </span>
                
                </div>
            <div className="flex justify-between mt-10 items-end">
                <div className="flex justify-between border border-[#CCCCCD] rounded-full h-[38px] w-[260px] items-center px-2 py-1">
                    <input type="text" className="border-none focus-visible:outline-none" style={{fontFamily:'Shabnam'}} placeholder="جستجو کنید ..."/>
                    <button className="w-[30px] h-[30px] bg-mainColor shadow-blueShadow rounded-full flex justify-center items-center">
                        <Search/>
                    </button>
                </div>
                <div className="flex items-end">
                <div className="flex flex-col w-[150px] ">
                    <span style={{fontFamily:'Shabnam'}}  className="text-base font-normal   ">بازه زمانی</span>
                    <div class=" mt-3">
                        
                        <select style={{fontFamily:'Shabnam'}}
                            name="cars"
                            id="cars"
                            className="    text-right  bg-white border border-gray-300 text-gray-900 text-sm rounded-md  focus:ring-mainColor focus:border-mainColor block w-full p-2">
                            <option style={{fontFamily:'Shabnam'}} value="newRequest" className="  ">انتخاب بازه زمانی</option>
                            <option  style={{fontFamily:'Shabnam'}}value="waiting" className="  ">5 روز گذشته</option>
                            <option  style={{fontFamily:'Shabnam'}}value="waiting" className="  ">10 روز گذشته</option>
                            <option  style={{fontFamily:'Shabnam'}}value="waiting" className="  ">15 روز گذشته</option>
                            <option  style={{fontFamily:'Shabnam'}}value="waiting" className="  ">20 روز گذشته</option>
                            <option  style={{fontFamily:'Shabnam'}}value="waiting" className="  ">ماه گذشته</option>
                        </select>
                 
                    </div>
                </div>
                <div className="flex flex-col w-[150px] mr-2">
                <span style={{fontFamily:'Shabnam'}}  className="text-base font-normal   ">وضعیت درخواست</span>
                   <div class=" mt-3">
                  
                        <select style={{fontFamily:'Shabnam'}}
                            name="cars"
                            id="cars"
                            className="    text-right  bg-white border border-gray-300 text-gray-900 text-sm rounded-md  focus:ring-mainColor focus:border-mainColor block w-full p-2">
                            <option style={{fontFamily:'Shabnam'}} value="newRequest" className="  "> وضعیت درخواست </option>
                            <option  style={{fontFamily:'Shabnam'}}value="waiting" className="  ">درخواست جدید</option>
                            <option  style={{fontFamily:'Shabnam'}}value="check" className="  ">منتظر آپلود امضا</option>
                            <option style={{fontFamily:'Shabnam'}} value="not" className="  ">تایید شده</option>
                         
                        </select>
                        {/* <input
                            type="text"
                            id="input-group-1"
                            disabled="true"
                            class="pr-9    text-right right-6 bg-white border border-gray-300 text-gray-900 text-sm rounded-md  focus:ring-mainColor focus:border-mainColor block w-full pl-10 p-2.5  "
                            placeholder="آرمان"/> */}
                    </div>
                </div>
                {/* <div className="flex flex-col w-[150px] mr-2">
                <span style={{fontFamily:'Shabnam'}}  className="text-base font-normal   ">تایید شده توسط</span>

                   <div class=" mt-3">
                 
                        <select style={{fontFamily:'Shabnam'}}
                            name="cars"
                            id="cars"
                            className="    text-right  bg-white border border-gray-300 text-gray-900 text-sm rounded-md  focus:ring-mainColor focus:border-mainColor block w-full p-2">
                            <option style={{fontFamily:'Shabnam'}} value="newRequest" className="  ">انتخاب کارشناس</option>
                            <option  style={{fontFamily:'Shabnam'}}value="waiting" className="  ">علیرضا ابطهی</option>
                            <option  style={{fontFamily:'Shabnam'}}value="check" className="  ">اصغر جوادی</option>
                        

                        </select>
                      
                    </div>
                </div> */}
                <button className="bg-mainColor shadow-blueShadow py-2 px-4 text-white mr-2 rounded-md" style={{fontFamily:'Shabnam'}} >
                    اعمال
                </button>
                </div>
                <div className="flex">
                    <button className="shadow-blueShadow  flex px-2  items-center h-[40px] bg-mainColor text-white rounded-md">
                  
                        <span className="text-white" style={{fontFamily:'Shabnam'}}>
                            گزارش گیری
                        </span>
                    </button>
         
                </div>
            </div>
            
            <ExpertRequestList/>
              
            </div>
        </div>
      
        
    </div>
    )
}
export default ExpertRequestsList;

/*responsive--done*/