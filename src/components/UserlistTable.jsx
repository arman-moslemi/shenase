import React from "react";
import {ReactComponent as Search} from "../assets/icon/white/search.svg"
import './components.css';
import { Link } from "react-router-dom";
import {ReactComponent as Eye} from "../assets/icon/black/eye.svg";
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

const UserlistTable = () =>{
    const tableRow =[
        {
          id:'1',
         num:'1',
         name:'علی',
         lastName:'اطهری',
         position:'مدیر مالی',
         holding:'شستا',
         company:'شرکت یک',
         status:<span className="font-IRSans text-green text-sm">آنلاین</span>             
                   
                     
        },   {
            id:'1',
           num:'1',
           name:'حسن',
           lastName:'تابان',
           position:'حسابرس',
           holding:'شستا',
           company:'شرکت یک',
           status:<span className="font-IRSans text-[#FF6900] text-sm">آفلاین</span>             
                     
                       
          },
      
      ]
    const tableBody = tableRow.map((tableRow) =>
    <tr key={tableRow.id} className="border-b border-b-borderGray">
      <td className="py-4 text-sm text-right pr-4 font-IRsans px-4">{tableRow.num}</td>
      <td className="py-4 text-sm text-right font-IRsans px-4">
        
      
          {tableRow.name}
        
        
       
      </td>
      <td className="py-4 text-sm text-right px-4 font-IRsans">{tableRow.lastName}</td>
      <td className="py-4 text-sm text-center px-4 font-IRsans" >{tableRow.position}</td>
      <td className="py-4 text-sm text-center px-4 font-IRsans"  >{tableRow.holding}</td>
      <td className="py-4 text-sm text-center px-4 font-IRsans">{tableRow.company}</td>
      <td className="py-4 text-sm text-center px-4 font-IRsans">{tableRow.status}</td>
      </tr> 
    )
    return(
        <>
        <div className="flex justify-between items-center mt-8 flex-wrap md:justify-end">
            <div className="flex items-center flex-wrap">
                <span className="font-IRsans text-mainColor font-bold text-base ml-4">
                    جستجو در بین کاربران
                </span>
                <input type="text" className="border rounded-full w-80 border-midGray px-4 py-1.5 font-IRsans md:mt-3" placeholder="جستجو کنید ..."/>
            </div>
            <button className="bg-mainColor shadow-blueShadow rounded-md text-base font-IRsans text-white flex px-5 py-2  items-center justify-center md:float-left md:mt-3">
                <Search/>
                جستجو

            </button>
        </div>
        <div className=" mt-10 border-borderGray border border-solid w-full overflow-x-auto whitespace-nowrap ">
          <table class="table-auto w-full font-IRsans">
  <thead className="bg-darkGray h-11 rounded-t-2xl w-full whitespace-nowrap overflow-x-scroll" style={{borderRadius:'20px'}}> 
    <tr className="text-white  p-6 whitespace-nowrap overflow-x-scroll" style={{borderRadius:'20px'}}>
      <th className="text-right pr-4 font-IRsans md:px-4">ردیف</th>
      <th className="text-right font-IRsans md:px-4">نام کاربر</th>
      <th className="text-right font-IRsans md:px-4">نام خانوادگی کاربر</th>
      <th className="text-center font-IRsan md:px-4">سمت</th>
      <th className="text-center font-IRsans md:px-4">هولدینگ</th>
      <th className="text-center font-IRsans md:px-4" >شرکت</th>
      <th className="text-center font-IRsans md:px-4" >وضعیت</th>
    </tr>
  </thead>
  <tbody>
   {tableBody}
 
  </tbody>
</table>

        </div>
        </>
    )


}

export default UserlistTable;