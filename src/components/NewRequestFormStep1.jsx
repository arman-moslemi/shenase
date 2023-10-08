import React, {useEffect, useState } from "react";
import { DatePicker } from "zaman";
import './components.css';
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import {axiosReq} from "../commons/axiosReq";
import { useNavigate } from "react-router-dom";

const NewRequestFormStep1 = () => {
  const [showSuccessModal,
    setShowSuccessModal] = useState(false);
  const [allValues, setAllValues] = useState({
    ExecutiveDeviceName: '',
    InternetAddressOfTheExecutiveDevice: '',
    DestinationCity: '',
    FlightPath: '',
    TravelDate: '',
    TravelEndDate: '',
    TravelTime: '',
    TravelTopic: '',
    TravelGoalId: '',
    JobGoalId: '',
    DeviceName: '',
    PassportTypeId: '',
    GetVisa: '',
    JointTrip: '',
    DateLetter: '',
    ParticipantID:''
  });

  const fixNumbers = function (str)
{
  var
  persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
  arabicNumbers  = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g]
  if(typeof str === 'string')
  {
    for(var i=0; i<10; i++)
    {
      str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    }
  }
  return str;
};
  const  formatDateTime=(sDate)=> {
    console.log(sDate)
    var lDate = new Date(sDate).toLocaleDateString('fa-IR');
    console.log(555)
    console.log(lDate)
    var d =fixNumbers(lDate.split('/')[2]);
    var dd = d < 10 ? '0' + d : d;
    var yyyy = fixNumbers(lDate.split('/')[0]);
    var mon =fixNumbers(lDate.split('/')[1]);
    var mm = (mon<10?'0'+mon:mon);


       return yyyy+'/'+mm+'/'+dd; 
    
   
}
  const changeHandler = e => {
if(e.target)    {

  setAllValues({ ...allValues, [e.target.name]: e.target.value })
}

  }
    const [reCheck, setRecheck] = useState(false);

    let navigate = useNavigate();
  
    useEffect(() => {
    
      auth();
    }, [reCheck]);
    const auth=async()=>{
      const cookies = new Cookies();
      var token= cookies.get('token');
      console.log(token)
      if(!token){
      //  navigate("/");
      }else{
   if( cookies.get('Role')=="Agent")
   {
  
   }
   else{
    // navigate("/");
  
   }
      }
    }
    const insertReq=async()=>{
        console.log("req")
        console.log(allValues)
        const cookies = new Cookies();
       const dataUser = await axiosReq("Request/InsertRequest",{
        AgentId:cookies?.get("ID"),
        ExecutiveDeviceName:allValues?.ExecutiveDeviceName,
        InternetAddressOfTheExecutiveDevice: allValues.InternetAddressOfTheExecutiveDevice,
        DestinationCity: allValues?.DestinationCity,
        FlightPath:allValues?.FlightPath,
        TravelDateStart: allValues?.TravelDate,
        TravelEndDate: allValues?.TravelEndDate,
        TravelTime: allValues?.TravelTime,
        TravelTopic: allValues?.TravelTopic,
        TravelGoalId: allValues?.TravelGoalId,
        JobGoalId: allValues?.JobGoalId,
        DeviceName: allValues?.DeviceName,
        PassportTypeId: allValues?.PassportTypeId,
        GetVisa: allValues?.GetVisa,
        JointTrip: allValues?.JointTrip,
        DateLetter: allValues?.DateLetter,
        ParticipantID:allValues?.ParticipantID
       });
       console.log(dataUser)
       if (dataUser?.status == 200 || dataUser?.status == 204|| dataUser?.status == 201) {
        
        navigate("/newRequestStep2/"+dataUser?.data?.requestId)
  
      }
      else {
        alert("اطلاعات ورودی نادرست می باشند")
      }  
       
       }
  return (
    <div>
      <p style={{ fontFamily: 'Shabnam' }} className="text-xl text-mainColor font-bold mt-3.5 mb-8 ">گام 1 - اطلاعات اولیه</p>
      <div className="flex w-full flex-wrap">
        <div className="flex flex-col w-[31%] ml-[1.5%] mb-5">
          <span style={{ fontFamily: 'Shabnam' }} className="text-base font-bold font-IRsans">نام دستگاه اجرایی</span>
          <div class="mt-2">
            <input style={{ fontFamily: 'Shabnam' }}
              type="text"
              id="input-group-1"
              onChange={changeHandler}
              name="ExecutiveDeviceName"
              class="font-IRsans text-right right-6 bg-white border border-gray-300 text-gray-900 text-sm rounded-md  focus:ring-mainColor focus:border-mainColor block w-full p-2.5  "
              placeholder="نام دستکاه اجرایی" />
          </div>
        </div>
        <div className="flex flex-col w-[32%] mx-[1.5%] mb-5">
          <span style={{ fontFamily: 'Shabnam' }} className="text-base font-bold font-IRsans">آدرس اینترنتی دستگاه اجرایی</span>
          <div class="mt-2">
            <input style={{ fontFamily: 'Shabnam' }}
              type="text"
              id="input-group-1"
              name="InternetAddressOfTheExecutiveDevice"
              onChange={changeHandler}
              class="font-IRsans text-right right-6 bg-white border border-gray-300 text-gray-900 text-sm rounded-md  focus:ring-mainColor focus:border-mainColor block w-full p-2.5  "
              placeholder="آدرس اینترنتی دستگاه اجرایی" />
          </div>
        </div>
        <div className="flex flex-col w-[31%] mr-[1.5%] mb-5">
          <span style={{ fontFamily: 'Shabnam' }} className="text-base font-bold font-IRsans">کشور و شهر مقصد</span>
          <div class="mt-2">
            <input style={{ fontFamily: 'Shabnam' }}
              type="text"
              id="input-group-1"
              name="DestinationCity"
              onChange={changeHandler}
              class="font-IRsans text-right right-6 bg-white border border-gray-300 text-gray-900 text-sm rounded-md  focus:ring-mainColor focus:border-mainColor block w-full p-2.5  "
              placeholder="کشور و شهر مقصد" />
          </div>
        </div>
        <div className="flex flex-col w-[31%] ml-[1.5%] mb-7">
          <span style={{ fontFamily: 'Shabnam' }} className="text-base font-bold font-IRsans">مسیر پروازی</span>
          <div class="mt-2">
            <input style={{ fontFamily: 'Shabnam' }}
              type="text"
              id="input-group-1"
              name="FlightPath"
              onChange={changeHandler}
              class="font-IRsans text-right right-6 bg-white border border-gray-300 text-gray-900 text-sm rounded-md  focus:ring-mainColor focus:border-mainColor block w-full p-2.5  "
              placeholder="مسیر پروازی" />
          </div>
        </div>
        <div className="flex w-[32%] mx-[1.5%] mb-7 items-end">
          <div className="flex flex-col w-[39%] ">
            <span style={{ fontFamily: 'Shabnam' }} className="text-base font-bold font-IRsans">تاریخ و مدت سفر</span>
            <div class="mt-2 font-IRsans text-right right-6 bg-white border border-gray-300 text-gray-900 text-sm rounded-md  focus:ring-mainColor focus:border-mainColor block w-full" id="StartDate">
              <DatePicker style={{ fontFamily: 'Shabnam' }} placeholder="خهاخعل"
                name="TravelDate"
                onChange={(e)=>setAllValues({ ...allValues,TravelDate:formatDateTime(e.value)})}

              />
              {/* <input style={{fontFamily: 'Shabnam'}}
                                type="text"
                                id="input-group-1"
                                class="   text-right right-6 bg-white border border-gray-300 text-gray-900 text-sm rounded-md  focus:ring-mainColor focus:border-mainColor block w-full p-2.5  "
                                placeholder="کد پستی"/> */}
            </div>
          </div>
          <div className="w-[22%] flex justify-center pb-2"><p style={{ fontFamily: 'Shabnam' }} className="text-base font-normal">لغایت</p></div>
          <div className="w-[39%] font-IRsans text-right right-6 bg-white border border-gray-300 text-gray-900 text-sm rounded-md  focus:ring-mainColor focus:border-mainColor block" id="EndDate">
            <DatePicker style={{ fontFamily: 'Shabnam' }} placeholder="خهاخعل"
            name="TravelEndDate"
            onChange={(e)=>setAllValues({ ...allValues,TravelEndDate:formatDateTime(e.value)})}

            />
            {/* <input style={{fontFamily: 'Shabnam'}}
                                type="text"
                                id="input-group-1"
                                class="  text-right right-6 bg-white border border-gray-300 text-gray-900 text-sm rounded-md  focus:ring-mainColor focus:border-mainColor block w-full p-2.5  "
                                placeholder="کد پستی"/> */}
          </div>
        </div>
        <div className="flex flex-col w-[31%] mr-[1.5%] mb-7">
          <span style={{ fontFamily: 'Shabnam' }} className="text-base font-bold font-IRsans">مدت زمان سفر</span>
          <div class="mt-2">
            <input style={{ fontFamily: 'Shabnam' }}
              type="text"
              id="input-group-1"
              name="TravelTime"
              onChange={changeHandler}
              class="font-IRsans text-right right-6 bg-white border border-gray-300 text-gray-900 text-sm rounded-md  focus:ring-mainColor focus:border-mainColor block w-full p-2.5  "
              placeholder="تعداد روز" />
          </div>
        </div>
        <div className="flex flex-col w-[100%]  mb-8">
          <span style={{ fontFamily: 'Shabnam' }} className="text-base font-bold font-IRsans">موضوع سفر</span>
          <div class="mt-2">
            <input style={{ fontFamily: 'Shabnam' }}
              type="text"
              id="input-group-1"
              name="TravelTopic"
              onChange={changeHandler}
              class="font-IRsans text-right right-6 bg-white border border-gray-300 text-gray-900 text-sm rounded-md  focus:ring-mainColor focus:border-mainColor block w-full p-2.5  "
              placeholder="موضوع سفر را اینجا بنویسید" />
          </div>
        </div>
        <span style={{ fontFamily: 'Shabnam' }} className="text-base font-bold font-IRsans mb-4">اهداف سفر</span>
        <div className="flex flex-wrap w-[100%]">
          <div className="ml-14 mb-4">
            <label style={{ fontFamily: 'Shabnam' }} className="text-base font-normal flex items-center">
              <input style={{ fontFamily: 'Shabnam' }}
                type="checkbox"
                name="TravelGoalId"
                onChange={changeHandler}
                value={"1"}
                class="accent-mainColor w-4 h-4 border-2 border-mainColor outline-mainColor ml-1.5" />
              اداری
            </label>
          </div>
          <div className="ml-14 mb-4">
            <label style={{ fontFamily: 'Shabnam' }} className="text-base font-normal flex items-center">
              <input 
                  name="TravelGoalId"
                  onChange={changeHandler}
                  value={"2"}
              style={{ fontFamily: 'Shabnam' }}
                type="checkbox"
                class="accent-mainColor w-4 h-4 border-2 border-mainColor outline-mainColor ml-1.5" />
              تجاری
            </label>
          </div>
          <div className="ml-14 mb-4">
            <label style={{ fontFamily: 'Shabnam' }} className="text-base font-normal flex items-center">
              <input style={{ fontFamily: 'Shabnam' }}
                  name="TravelGoalId"
                  onChange={changeHandler}
                  value={"3"}
                type="checkbox"
                class="accent-mainColor w-4 h-4 border-2 border-mainColor outline-mainColor ml-1.5" />
              آموزشی
            </label>
          </div>
          <div className="ml-14 mb-4">
            <label style={{ fontFamily: 'Shabnam' }} className="text-base font-normal flex items-center">
              <input style={{ fontFamily: 'Shabnam' }}
                type="checkbox"
                name="TravelGoalId"
                onChange={changeHandler}
                value={"4"}
                class="accent-mainColor w-4 h-4 border-2 border-mainColor outline-mainColor ml-1.5" />
              فرهنگی
            </label>
          </div>
          <div className="ml-14 mb-4">
            <label style={{ fontFamily: 'Shabnam' }} className="text-base font-normal flex items-center">
              <input style={{ fontFamily: 'Shabnam' }}
                type="checkbox"
                name="TravelGoalId"
                onChange={changeHandler}
                value={"5"}
                class="accent-mainColor w-4 h-4 border-2 border-mainColor outline-mainColor ml-1.5" />
              سیاسی
            </label>
          </div>
          <div className="ml-14 mb-4">
            <label style={{ fontFamily: 'Shabnam' }} className="text-base font-normal flex items-center">
              <input style={{ fontFamily: 'Shabnam' }}
                type="checkbox"
                name="TravelGoalId"
                onChange={changeHandler}
                value={"6"}
                class="accent-mainColor w-4 h-4 border-2 border-mainColor outline-mainColor ml-1.5" />
              اقتصادی
            </label>
          </div>
          <div className="ml-14 mb-4">
            <label style={{ fontFamily: 'Shabnam' }} className="text-base font-normal flex items-center">
              <input style={{ fontFamily: 'Shabnam' }}
                type="checkbox"
                name="TravelGoalId"
                onChange={changeHandler}
                value={"7"}
                class="accent-mainColor w-4 h-4 border-2 border-mainColor outline-mainColor ml-1.5" />
              صنعتی
            </label>
          </div>
          <div className="ml-14 mb-4">
            <label style={{ fontFamily: 'Shabnam' }} className="text-base font-normal flex items-center">
              <input style={{ fontFamily: 'Shabnam' }}
                type="checkbox"
                name="TravelGoalId"
                onChange={changeHandler}
                value={"8"}
                class="accent-mainColor w-4 h-4 border-2 border-mainColor outline-mainColor ml-1.5" />
              علمی
            </label>
          </div>

        </div>
        <span style={{ fontFamily: 'Shabnam' }} className="text-base font-bold font-IRsans mb-4 mt-9">اهداف شغلی</span>
        <div className="flex flex-wrap w-[100%]">
          <div className="ml-5 mb-4">
            <label style={{ fontFamily: 'Shabnam' }} className="text-base font-normal flex items-center">
              <input style={{ fontFamily: 'Shabnam' }}
                type="checkbox"
                name="JobGoalId"
                onChange={changeHandler}
                value="1"
                class="accent-mainColor w-4 h-4 border-2 border-mainColor outline-mainColor ml-1.5" />
              مذاکرات
            </label>
          </div>
          <div className="ml-5 mb-4">
            <label style={{ fontFamily: 'Shabnam' }} className="text-base font-normal flex items-center">
              <input style={{ fontFamily: 'Shabnam' }}
                type="checkbox"
                name="JobGoalId"
                onChange={changeHandler}
                value="2"
                class="accent-mainColor w-4 h-4 border-2 border-mainColor outline-mainColor ml-1.5" />
              تامین تجهیزات
            </label>
          </div>
          <div className="ml-5 mb-4">
            <label style={{ fontFamily: 'Shabnam' }} className="text-base font-normal flex items-center">
              <input style={{ fontFamily: 'Shabnam' }}
                type="checkbox"
                name="JobGoalId"
                onChange={changeHandler}
                value="3"
                class="accent-mainColor w-4 h-4 border-2 border-mainColor outline-mainColor ml-1.5" />
              برگزاری نمایشگاه
            </label>
          </div>
          <div className="ml-5 mb-4">
            <label style={{ fontFamily: 'Shabnam' }} className="text-base font-normal flex items-center">
              <input style={{ fontFamily: 'Shabnam' }}
                type="checkbox"
                name="JobGoalId"
                onChange={changeHandler}
                value="4"
                class="accent-mainColor w-4 h-4 border-2 border-mainColor outline-mainColor ml-1.5" />
              تست کالا و خدمات
            </label>
          </div>
          <div className="ml-5 mb-4">
            <label style={{ fontFamily: 'Shabnam' }} className="text-base font-normal flex items-center">
              <input style={{ fontFamily: 'Shabnam' }}
                type="checkbox"
                name="JobGoalId"
                onChange={changeHandler}
                value="5"
                class="accent-mainColor w-4 h-4 border-2 border-mainColor outline-mainColor ml-1.5" />
              حسابرسی
            </label>
          </div>
          <div className="ml-5 mb-4">
            <label style={{ fontFamily: 'Shabnam' }} className="text-base font-normal flex items-center">
              <input style={{ fontFamily: 'Shabnam' }}
                type="checkbox"
                name="JobGoalId"
                onChange={changeHandler}
                value="6"
                class="accent-mainColor w-4 h-4 border-2 border-mainColor outline-mainColor ml-1.5" />
              صدور خدمات فنی و مهندسی
            </label>
          </div>
          <div className="ml-5 mb-4">
            <label style={{ fontFamily: 'Shabnam' }} className="text-base font-normal flex items-center">
              <input style={{ fontFamily: 'Shabnam' }}
                type="checkbox"
                name="JobGoalId"
                onChange={changeHandler}
                value="7"
                class="accent-mainColor w-4 h-4 border-2 border-mainColor outline-mainColor ml-1.5" />
              بازاریابی
            </label>
          </div>

        </div>
        <div className="flex flex-col w-[48.5%] ml-[1.5%] mt-8 mb-12">

          <span style={{ fontFamily: 'Shabnam' }} className="text-base font-bold font-IRsans">متولیان / شرکت کنندگان</span>

          <div class="mt-5 flex w-[100%]">
            <input style={{ fontFamily: 'Shabnam' }}
              type="text"
              id="input-group-1"
              name="DeviceName"
              onChange={changeHandler}

              class="font-IRsans text-right right-6 bg-white border border-gray-300 text-gray-900 text-sm rounded-md  focus:ring-mainColor focus:border-mainColor block w-[28%] p-2.5  "
              placeholder="نام دستکاه " />
            <div className="flex items-center">
              <input className="accent-mainColor w-4 h-4 border-2 border-mainColor outline-mainColor mr-5 ml-1" type="radio" name="ParticipantID"
                             onChange={changeHandler}
 id="r1" />
              <label style={{ fontFamily: 'Shabnam' }} className="" For="r1">متولی</label>
              <input               onChange={changeHandler} value={"1"}
 className="accent-mainColor w-4 h-4 border-2 border-mainColor outline-mainColor mr-5 ml-1" type="radio" name="ParticipantID" id="r2" />
              <label style={{ fontFamily: 'Shabnam' }} className="" For="r2" value={"2"}>شرکت کننده</label>
            </div>
          </div>

        </div>
        <div className="flex flex-col w-[48.5%] mr-[1.5%] mt-8 mb-12">

          <span style={{ fontFamily: 'Shabnam' }} 
           
            className="text-base font-bold font-IRsans">نوع گذرنامه</span>

          <div class="mt-7 flex w-[100%]">
            <div className="flex items-center">
              <input className="accent-mainColor w-4 h-4 border-2 border-mainColor outline-mainColor ml-1" type="radio" name="pp" id="r3" />
              <label style={{ fontFamily: 'Shabnam' }} 
              name="PassportTypeId"
              onChange={changeHandler}
              value={"1"}
              className="" For="r3">عادی</label>
              <input
               name="PassportTypeId"
               onChange={changeHandler}
               value={"2"} className="accent-mainColor w-4 h-4 border-2 border-mainColor outline-mainColor mr-5 ml-1" type="radio"  id="r4" />
              <label style={{ fontFamily: 'Shabnam' }} className="" For="r4">خدمت</label>
              <input 
               name="PassportTypeId"
               onChange={changeHandler}
               value={"3"}
               className="accent-mainColor w-4 h-4 border-2 border-mainColor outline-mainColor mr-5 ml-1" type="radio" id="r5" />
              <label style={{ fontFamily: 'Shabnam' }} className="" For="r5">سیاسی</label>
            </div>
          </div>

        </div>
        <div className="flex w-[100%] mb-10">
          <p style={{ fontFamily: 'Shabnam' }} 
            className="text-base font-bold">آیا نیاز به یادداشت وزارت امور خارجه برای اخذ ویزا دارد ؟</p>
          <div className="flex items-center">
            <input name="GetVisa" onChange={changeHandler} value={true} className="accent-mainColor w-4 h-4 border-2 border-mainColor outline-mainColor mr-7 ml-1" type="radio"  id="a1" />
            <label style={{ fontFamily: 'Shabnam' }} className="" For="a1">بله</label>
            <input value={false} name="GetVisa" onChange={changeHandler} className="accent-mainColor w-4 h-4 border-2 border-mainColor outline-mainColor mr-8 ml-1" type="radio"  id="a2" />
            <label  style={{ fontFamily: 'Shabnam' }} className="" For="a2">خیر</label>
          </div>
        </div>
        <div className="flex w-[100%] mb-8">
          <p style={{ fontFamily: 'Shabnam' }}  className="text-base font-bold">آیا سفر مشترک بین چند دستگاه اجرایی است ؟</p>
          <div className="flex items-center">
            <input onChange={changeHandler} value={true} name="JointTrip"className="accent-mainColor w-4 h-4 border-2 border-mainColor outline-mainColor mr-7 ml-1" type="radio"  id="a3" />
            <label style={{ fontFamily: 'Shabnam' }} 
            className="" For="a1" >بله</label>
            <input   onChange={changeHandler} value={false} name="JointTrip"className="accent-mainColor w-4 h-4 border-2 border-mainColor outline-mainColor mr-8 ml-1" type="radio" id="a4" />
            <label style={{ fontFamily: 'Shabnam' }} className="" For="a2">خیر</label>
          </div>
        </div>
        <div className="flex flex-col w-[90%] ml-[1.5%] mb-3">
          <span style={{ fontFamily: 'Shabnam' }}  className="text-base font-bold font-IRsans">شماره تاریخ نامه و مقام پیشنهاد دهنده داخلی دستگاه برای انجام سفر را درج نمائید :</span>
          <div class="mt-6">
            <input style={{ fontFamily: 'Shabnam' }}
              type="text"
              id="input-group-1"
              onChange={changeHandler}
            name="DateLetter"
              class="font-IRsans text-right right-6 bg-white border border-gray-300 text-gray-900 text-sm rounded-md  focus:ring-mainColor focus:border-mainColor block w-[40%] p-2.5  "
            />
          </div>
        </div>

      </div>
      <div className="flex justify-end">
        <button onClick={insertReq}
          style={{ fontFamily: 'Shabnam' }}
          className="w-40 h-12 flex justify-center items-center bg-mainColor shadow-blueShadow font-IRsans text-white text-xl font-bold rounded-lg hover:bg-lightBlue hover:text-mainColor">
          گام بعدی
        </button>
      </div>

    </div>

  )
}
export default NewRequestFormStep1;