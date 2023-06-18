import React from "react";
import './components.css';
import { Link } from "react-router-dom";
import {ReactComponent as Eye} from "../assets/icon/black/eye.svg"
export const truncate = (str, len) => {
  // console.log("truncate", str, str.length, len);
  if (str.length > len && str.length > 0) {
    let new_str = str + " ";
    new_str = str.substr(0, len);
    new_str = str.substr(0, new_str.lastIndexOf(" "));
    new_str = new_str.length > 0 ? new_str : str.substr(0, len);
    return new_str + "...";
  }
  return str;
};

const AgentListTable = () =>{
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [showRuleModal, setShowRuleModal] = React.useState(false);
const tableRow =[
  {
    id:'1',
   num:'1',
   date:'#1234',
   subject:truncate("فراموشی رمز عبور ...",30),
   location:'02/02/12-23:50',
   status:<span className="text-sm text-[#ffd200] font-bold font-IRsans">بسته شده</span >,
   function: <Link className="flex justify-center">
   <Eye/>
   </Link>
             
               
  },
  {
    id:'2',
   num:'2',
   date:'#4323',
   subject:truncate("فراموشی رمز عبور ...",30),
   location:'02/02/12-23:50',
   status:<span className="text-sm text-green font-bold font-IRsans">پاسخ داده شده</span >,
   function:<Link className="flex justify-center">
   <Eye/>
   </Link>
            
  },
  {
    id:'3',
   num:'3',
   date:'#4321',
   subject:truncate("فراموشی رمز عبور ...",30),
   location:'02/02/12-23:50',
   status:<span className="text-sm text-[#ff6900] font-bold font-IRsans">در انتظار پاسخ</span >,
   function:<Link className="flex justify-center">
   <Eye/>
   </Link>
  },
  {
    id:'4',
   num:'4',
   date:'#2323',
   subject:truncate("فراموشی رمز عبور ...",30),
   location:'02/02/12-23:50',
   status:<span className="text-sm text-green font-bold font-IRsans">پاسخ داده شده</span >,
   function:<Link className="flex justify-center">
   <Eye/>
   </Link>
  },
  {
    id:'5',
   num:'5',
   date:'#1212',
   subject:truncate("فراموشی رمز عبور ...",30),
   location:'02/02/12-23:50',
   status:<span className="text-sm text-[#ff6900] font-bold font-IRsans">در انتظار پاسخ</span >,
   function:<Link className="flex justify-center">
   <Eye/>
   </Link>
  }
]
  const tableBody = tableRow.map((tableRow) =>
  <tr key={tableRow.id} className="border-b border-b-borderGray">
    <td className="py-4 text-sm text-right pr-4 font-IRsans">{tableRow.num}</td>
    <td className="py-4 text-sm text-right font-IRsans">{tableRow.date}</td>
    <td className="py-4 text-sm text-right font-IRsans truncate">{tableRow.subject}</td>
    <td className="py-4 text-sm text-center font-IRsans" >{tableRow.location}</td>
    <td className="py-4 text-sm text-center font-IRsans"  >{tableRow.status}</td>
    <td className="py-4 text-sm text-center font-IRsans">{tableRow.function}</td>
    </tr> 
  )
    return(
        <div className=" mt-10 border-borderGray border border-solid w-full overflow-x-auto whitespace-nowrap ">
          <table class="table-auto w-full font-IRsans">
  <thead className="bg-darkGray h-11 rounded-t-2xl w-full whitespace-nowrap overflow-x-scroll" style={{borderRadius:'20px'}}> 
    <tr className="text-white  p-6 whitespace-nowrap overflow-x-scroll" style={{borderRadius:'20px'}}>
      <th className="text-right pr-4 font-IRsans md:px-4">ردیف</th>
      <th className="text-right font-IRsans md:px-4">شماره تیکت</th>
      <th className="text-right font-IRsans md:px-4">موضوع تیکت</th>
      <th className="text-center font-IRsan md:px-4s">آخرین به روز رسانی</th>
      <th className="text-center font-IRsans md:px-4">وضعیت تیکت</th>
      <th className="text-center font-IRsans md:px-4" >مشاهده</th>
    </tr>
  </thead>
  <tbody>
   {tableBody}
 
  </tbody>
</table>
{showSuccessModal ?
                  <>
                   <div
                   className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                 >
                   <div className="relative w-[30%] my-5 mx-auto max-w-5xl">
                    
                     <div className="border-0 rounded-lg p-2 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  
                       <div className="flex justify-center p-4 border-b border-solid border-b-[#EDF3FA] rounded-t">
                         <span className="text-base font-bold font-IRsans text-black text-center">
                          علت رد درخواست سفر
                         </span>
                      
                       </div>
                       
                       <div className="relative p-6 flex-auto">
                         <p className="my-4 text-black text-sm leading-relaxed break-words whitespace-normal font-IRsans">
                         درخواست شما به علت عدم توضیح کافی راجع به موضوع سفر و مشخص نبودن تاریخ دقیق آن پذیرفته نشد.
لطفا موارد ذکر شده را اصلاح کنید و سپس مجددا درخواست خود را ثبت کنید.
                         </p>
                       </div>
                      
                       <div className="flex items-center justify-endborder-t justify-end border-solid border-slate-200 rounded-b">
                         <button
                           className="text-mainColor font-IRsans float-left background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                           type="button"
                           onClick={() => setShowSuccessModal(false)}
                         >
                           بستن
                         </button>
                        <Link to={'/newRequest'}>
                        <button
                           className="text-mainColor font-IRsans float-left background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                           type="button"
                           
                         >
                           درخواست مجدد
                         </button>
                        </Link>
                       </div>
                     </div>
                   </div>
                 </div>
                 <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                 
                  </>
                  :null
               }
               {
                showRuleModal ?
                <>
                <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
              >
                <div className="relative w-[50%] my-5 mx-auto max-w-5xl">
                 
                  <div className="border-0 rounded-lg p-2 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
               
                    <div className="flex justify-center p-4 border-b border-solid border-b-[#EDF3FA] rounded-t">
                      <span className="text-base font-bold font-IRsans text-black text-center">
                       آیین نامه سفر و ثبت گزارش دستاورد سفر
                      </span>
                   
                    </div>
                    
                    <div className="relative p-6 flex-auto">
                      <p className="my-4 text-black text-sm font-bold leading-relaxed break-words whitespace-normal font-IRsans">
                     قوانین سفر :
                     </p>
                     <p className="my-4 text-black text-sm leading-relaxed break-words whitespace-normal font-IRsans">
                    
                    
                     هر مامور اعزامی موظف است هر روز گزارش دستاورد از آن روز سفر را ونل خود ثبت کند تا کارشناس امور بین الملل بررسی کند و تایید یا رد کند.
                     <br/>
                     هر مامور اعزامی موظف است پس از پایان سفر خود گزارش ستاورد کلی سفر خود به همراه مستندات مناسب را بارگزاری کند تا کارشناس امور بین الملل بررسی کند
                      صورت نا معتبر بودن گزارش و رد آن توسط کارشناس امور بین الملل اجازه ی سفر بعدی به مامور اعزامی داده نمی شود و دسترسی به پنل برای کاربر بسته می شود.
                      </p>
                    </div>
                   
                    <div className="flex items-center justify-endborder-t justify-center mb-3 border-solid border-slate-200 rounded-b">
                      <button
                        className="text-mainColor font-IRsans float-left background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowRuleModal(false)}
                      >
                        بستن
                      </button>
                  
                     <button
                        className="text-white bg-mainColor shadow-blueShadow rounded-md font-IRsans float-left background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowRuleModal(false)}
                      >
                       تاریخچه درخواست ها
                      </button>
                     
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              
               </>
                :null
               }
        </div>
    )
}
export default AgentListTable;