import React, {useEffect, useState } from "react";
import { DatePicker } from "zaman";
import './components.css';
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import {axiosReq} from "../commons/axiosReq";
import { useNavigate } from "react-router-dom";
import Select from "react-select";



const NewRequestFormStep1 = () => {
  const [showSuccessModal,
    setShowSuccessModal] = useState(false);
  const [country,setCountry] = useState([]);
  const [city,setCity] = useState([]);
    const [reCheck, setRecheck] = useState(false);

    let navigate = useNavigate();
  const [allValues, setAllValues] = useState({
    ExecutiveDeviceName: '',
    InternetAddressOfTheExecutiveDevice: '',
    CityId: '',
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
  const [allValuesError, setAllValuesError] = useState({
    ExecutiveDeviceName: false,
    InternetAddressOfTheExecutiveDevice: false,
    CityId: false,
    FlightPath: false,
    TravelDate: false,
    TravelEndDate: false,
    TravelTime: false,
    TravelTopic: false,
    TravelGoalId: false,
    JobGoalId: false,
    DeviceName: false,
    PassportTypeId: false,
    GetVisa: false,
    JointTrip: false,
    DateLetter: false,
    ParticipantID:false
  });

  const [selectedOptions, setSelectedOptions] = useState();
  const optionList = [
    { value: "tehran-istanbul", label: "تهران - استانبول" },
    { value: "tehran-dubai", label: "تهران - دبی" },
    { value: "tehran-najaf", label: "تهران - نجف" },
    { value: "tehean-seul", label: "تهران - سئول" },
    { value: "tehran-frankfort", label: "تهران - فرانکفورت" }
  ];
  const countryList = [
    { value: "turky", label: "ترکیه" },
    { value: "emarat", label: "امارات" },
    { value: "aragh", label: "عراق" },
    { value: "southkorea", label: "کره جنوبی" },
    { value: "germany", label: "آلمان" }
  ];
  const cityList = [
 
    { value: "1577", label: "نجف" },
    { value: "1587", label: "سئول" },
  ];


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
  if(e.target.value!=""){

    setAllValuesError({ ...allValuesError, [e.target.name]: false })
  }
  else{
    setAllValuesError({ ...allValuesError, [e.target.name]: true })

  }
  // setAllValuesError({ ...allValuesError, [""]: false })

  setAllValues({ ...allValues, [e.target.name]: e.target.value })
}
  }
  const changeHandlerSelect = (e,name) => {
      if(e.value!=""){
    
        setAllValuesError({ ...allValuesError, [name]: false })
      }
      else{
        setAllValuesError({ ...allValuesError, [name]: true })
    
      }
      // setAllValuesError({ ...allValuesError, [""]: false })
    
      setAllValues({ ...allValues, [name]: e.value })
    
      }
      const changeHandlerSelectCountry = async(e,name) => {
      
      

        const dataCity = await axiosReq("Agents/GetCities",{CountryId: e.value});
        var selCount=[];
        dataCity?.data?.forEach(element => {
    selCount.push({value:element.cityId,label:element?.cityName})
  });
  console.log(selCount)
  
        setCity(selCount)
      
        }
const blurHandler = e => {
  if(e.target)    {
    if(e.target.value==""){
  
      setAllValuesError({ ...allValuesError, [e.target.name]: true })
    }
  
  
  }

  }
   
  
    useEffect(() => {
    
      auth();
    }, [reCheck]);
    const auth=async()=>{
      const cookies = new Cookies();
      var token= cookies.get('token');
      console.log(token)
      if(!token){
      navigate("/");
      }else{
   if( cookies.get('Role')=="Agent")
   {
  GetData()
   }
   else{
  navigate("/");
  
   }
      }
    }
    const GetData = async () => {
     
      const dataCountry = await axiosReq("Agents/GetCountries");
      var selCount=[];
      console.log(dataCountry)
      dataCountry.forEach(element => {
  selCount.push({value:element.countryId,label:element?.countryName})
});
console.log(selCount)

      setCountry(selCount)
   

  }
    const 
    allFull=(obj)=>
    {
      const updatedState = {};
      var result =true;
      for(var o in obj){
        if(obj[o]==""){
          updatedState[o] = true;


          setAllValuesError({ ...allValuesError, ...updatedState})
result=false;
        }
          
      }
      console.log(allValuesError)
return result        
    }
    const insertReq=async()=>{
        console.log("req")
        console.log(allValues)
       var res= allFull(allValues)
        const cookies = new Cookies();
       if(res  )
       {
       const dataUser = await axiosReq("Request/InsertRequest",{
        AgentId:cookies?.get("ID"),
        ExecutiveDeviceName:allValues?.ExecutiveDeviceName,
        InternetAddressOfTheExecutiveDevice: allValues.InternetAddressOfTheExecutiveDevice,
        CityId: allValues?.CityId,
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
       else{
        console.log(allValuesError)
        alert("اطلاعات ورودی را وارد نمایید")

       }
       }
       const colourStyles = {
        control:  (defaultStyles,state) => ({
            ...defaultStyles, backgroundColor: 'white'}),
        option: (defaultStyles, { data, isDisabled, isFocused, isSelected }) => {
          return {
            ...defaultStyles,
            backgroundColor: isDisabled ? 'white' : 'white',
            backgroundColor: isFocused ? 'lightBlue' : 'white',
            
             
            color: '#000',
            cursor: isDisabled ? 'not-allowed' : 'default',
            
          };
        },
        
      };
  return (
    <div>
      <p style={{ fontFamily: 'Shabnam' }} className="text-xl text-mainColor font-bold mt-3.5 mb-8 ">گام 1 - اطلاعات اولیه</p>
      <div className="flex w-full flex-wrap">
        <div className="flex flex-col w-[31%] xl-1400:w-[49%] xl-1400:ml-[1%] xl-1400:mr-0 xl-lg:w-[100%] xl-lg:mx-0 ml-[1.5%]  mb-5">
          <span style={{ fontFamily: 'Shabnam' }} className="text-base font-bold font-IRsans">نام دستگاه اجرایی</span>
          <div class="mt-2">
            <input style={{ fontFamily: 'Shabnam' }}
              type="text"
              id="input-group-1"
              onChange={changeHandler}
              onBlur={blurHandler}
              name="ExecutiveDeviceName"
              class={`font-IRsans text-right right-6 bg-white border ${allValuesError.ExecutiveDeviceName?"border-[#ff0000]":"border-gray-300"}  text-gray-900 text-sm rounded-md  focus:ring-mainColor focus:border-mainColor block w-full p-2.5`}
              placeholder="نام دستکاه اجرایی" />
          </div>
          {
allValuesError.ExecutiveDeviceName?
<span style={{ fontFamily: 'Shabnam' }} class="flex items-center font-medium tracking-wide text-[#ff0000] text-xs mt-1 ml-1">
لطفا فیلد را وارد نمایید !
</span>
:
null
          }
        
        </div>
        <div className="flex flex-col w-[32%] xl-1400:w-[49%] xl-1400:mr-[1%] xl-1400:ml-0 xl-lg:w-[100%] xl-lg:mx-0 mx-[1.5%] mb-5">
          <span style={{ fontFamily: 'Shabnam' }} className="text-base font-bold font-IRsans">آدرس اینترنتی دستگاه اجرایی</span>
          <div class="mt-2 font-IRsans">
            <input style={{ fontFamily: 'Shabnam' }}
              type="text"
              id="input-group-1"
              name="InternetAddressOfTheExecutiveDevice"
              onChange={changeHandler}
              onBlur={blurHandler}
              class={`font-IRsans text-right right-6 bg-white border ${allValuesError.InternetAddressOfTheExecutiveDevice?"border-[#ff0000]":"border-gray-300"} text-gray-900 text-sm rounded-md  focus:ring-mainColor focus:border-mainColor block w-full p-2.5`}
              placeholder="آدرس اینترنتی دستگاه اجرایی" />
          </div>
          {
allValuesError.InternetAddressOfTheExecutiveDevice?
<span style={{ fontFamily: 'Shabnam' }} class="flex items-center font-medium tracking-wide text-[#ff0000] text-xs mt-1 ml-1">
لطفا فیلد را وارد نمایید !
</span>
:
null
          }
        </div>
        <div className="flex flex-col w-[15%] xl-1400:w-[28%] xl-1400:ml-[2%] xl-1400:mr-0 xl-lg:w-[100%] xl-lg:mx-0 mr-[1.5%] mb-5">
          <span style={{ fontFamily: 'Shabnam' }} className="text-base font-bold font-IRsans">کشور مقصد</span>
          <div class="mt-2" id="FightPathdiv">
            
              <Select
              options={country}
              placeholder="انتخاب کنید"
              id="CountryId"
             name="CountryId"
             onChange={(e)=>changeHandlerSelectCountry(e,"CountryId")}
             onBlur={blurHandler}
             styles={colourStyles}
              class="font-IRsans text-right right-6 bg-white border border-gray-300 text-gray-900 text-sm rounded-md  block w-full p-2.5"
              // onChange={handleSelect}
              isSearchable={true}
            />
             
  
            {/* <input style={{ fontFamily: 'Shabnam' }}
              type="text"
              id="FlightPath"
              name="FlightPath"
              onChange={changeHandler}
              onBlur={blurHandler}
              class={`font-IRsans text-right right-6 bg-white border ${allValuesError.FlightPath?"border-[#ff0000]":"border-gray-300"} text-gray-900 text-sm rounded-md  focus:ring-mainColor focus:border-mainColor block w-full p-2.5`}
              placeholder="مسیر پرواز" /> */}
          </div>
          
          
        </div>
          {/* {
              city?.length>0? */}
        <div className="flex flex-col w-[15%] xl-1400:w-[28%] xl-1400:ml-[2%] xl-1400:mr-0 xl-lg:w-[100%] xl-lg:mx-0 mr-[1%] mb-5">
          <span style={{ fontFamily: 'Shabnam' }} className="text-base font-bold font-IRsans">شهر مقصد</span>
          <div class="mt-2" id="FightPathdiv">
        <Select
  options={city}
  placeholder="انتخاب کنید"
  // value={selectedOptions}
  id="CityId"
 name="CityId"
 onChange={(e)=>changeHandlerSelect(e,"CityId")}
 styles={colourStyles}
  class={`font-IRsans text-right right-6 bg-white ${allValuesError.CityId?"border-[#ff0000]":"border-gray-300"} border border-gray-300 text-gray-900 text-sm rounded-md  block w-full p-2.5`}
  // onChange={handleSelect}
  isSearchable={true}
/>

            {/* <input style={{ fontFamily: 'Shabnam' }}
              type="text"
              id="FlightPath"
              name="FlightPath"
              onChange={changeHandler}
              onBlur={blurHandler}
              class={`font-IRsans text-right right-6 bg-white border ${allValuesError.FlightPath?"border-[#ff0000]":"border-gray-300"} text-gray-900 text-sm rounded-md  focus:ring-mainColor focus:border-mainColor block w-full p-2.5`}
              placeholder="مسیر پرواز" /> */}
          </div>
          <p style={{ fontFamily: 'Shabnam' }} className={`text-[#ff0000] tracking-wide mt-1 text-xs font-[10px] font-IRsans ${allValuesError.CityId?"flex":"hidden"}`}>لطفا یک مورد را انتخاب نمایید!</p>
          
          
        </div>
   
        <div className="flex flex-col w-[31%] xl-1400:w-[40%] xl-1400:mr-0 xl-1400:ml-0 xl-lg:w-[100%] xl-lg:mx-0 ml-[1.5%] mb-7">
        <span style={{fontFamily:'Shabnam'}}  className="text-base font-bold ">مسیر پروازی</span>
              
                      
        <div class="mt-2" id="FightPathdiv">
        <Select
  options={optionList}
  placeholder="انتخاب کنید"
  value={selectedOptions}
  id="FlightPath"
 name="FlightPath"
 onChange={(e)=>changeHandlerSelect(e,"FlightPath")}
 styles={colourStyles}
  class="font-IRsans text-right right-6 bg-white border border-gray-300 text-gray-900 text-sm rounded-md  block w-full p-2.5"
  // onChange={handleSelect}
  isSearchable={true}
/>
            {/* <input style={{ fontFamily: 'Shabnam' }}
              type="text"
              id="FlightPath"
              name="FlightPath"
              onChange={changeHandler}
              onBlur={blurHandler}
              class={`font-IRsans text-right right-6 bg-white border ${allValuesError.FlightPath?"border-[#ff0000]":"border-gray-300"} text-gray-900 text-sm rounded-md  focus:ring-mainColor focus:border-mainColor block w-full p-2.5`}
              placeholder="مسیر پرواز" /> */}
          </div>
          <p style={{ fontFamily: 'Shabnam' }} className={`text-[#ff0000] tracking-wide mt-1 text-xs font-[10px] font-IRsans ${allValuesError.FlightPath?"flex":"hidden"}`}>لطفا یک مورد را انتخاب نمایید!</p>
          
        </div>
        <div className={`flex xs:flex-col xs:items-start w-[42%] xl-1400:w-[58%] xl-1400:ml-[1%] xl-1400:mr-0 xl-lg:w-[100%] xl-lg:mx-0 mx-[1.5%] mb-7 xs:mb-0 ${allValuesError.FlightPath||allValuesError.TravelTime?"pb-5 xs:pb-0":"pb-0"} items-end`}>
          <div className="flex flex-col w-[45%] xl-lg:w-[47%] xs:w-[60%] ">
            <span style={{ fontFamily: 'Shabnam' }} className="text-base xs:text-sm font-bold font-IRsans">تاریخ و مدت سفر</span>
            <div class="mt-2 font-IRsans text-right right-6 bg-white border border-gray-300 text-gray-900 text-sm rounded-md  focus:ring-mainColor focus:border-mainColor block w-full" id="StartDate">
              <DatePicker style={{ fontFamily: 'Shabnam' }} placeholder="تاریخ"
                name="TravelDate"
                onChange={(e)=>
{                  setAllValues({ ...allValues,TravelDate:formatDateTime(e.value)});
setAllValuesError({...allValuesError,TravelDate:false})
}                }

              />
                

            </div>
            <p style={{ fontFamily: 'Shabnam' }} className={`text-[#ff0000] tracking-wide mt-1 text-xs font-[10px] font-IRsans ${allValuesError.TravelDate||allValuesError.TravelEndDate?"flex xs:hidden":"hidden"}`}>تاریخ رفت و برگشت را وارد نمایید!</p>
            
          </div>
          <div className={`w-[12%]  xs:mt-2  flex justify-center pb-2 ${allValuesError.TravelDate||allValuesError.TravelEndDate?"mb-[18px] xs:mb-0":"mb-0"} `}><p style={{ fontFamily: 'Shabnam' }} className="text-base font-normal">لغایت</p></div>
          <div className={`w-[43%] xl-lg:w-[41%] xs:w-[60%] font-IRsans text-right right-6 bg-white border border-gray-300 text-gray-900 text-sm rounded-md  focus:ring-mainColor focus:border-mainColor block ${allValuesError.TravelDate||allValuesError.TravelEndDate?"mb-[19px] xs:mb-0":"mb-0"} `} id="EndDate">
            <DatePicker style={{ fontFamily: 'Shabnam' }} placeholder="تاریخ"
            name="TravelEndDate"
            onChange={(e)=>
              {                  setAllValues({ ...allValues,TravelEndDate:formatDateTime(e.value)});
              setAllValuesError({...allValuesError,TravelEndDate:false})
              }                }

            />
            
            {/* <input style={{fontFamily: 'Shabnam'}}
                                type="text"
                                id="input-group-1"
                                class="  text-right right-6 bg-white border border-gray-300 text-gray-900 text-sm rounded-md  focus:ring-mainColor focus:border-mainColor block w-full p-2.5  "
                                placeholder="کد پستی"/> */}
          </div>

          
        </div>
        <p style={{ fontFamily: 'Shabnam' }} className={`text-[#ff0000] tracking-wide text-xs mt-1  font-[10px] font-IRsans ${allValuesError.TravelDate||allValuesError.TravelEndDate?"hidden xs:flex":"hidden"}`}>تاریخ رفت و برگشت را وارد نمایید!</p>
        <div className="flex flex-col w-[21%] xl-1400:w-[40%] xl-1400:mr-[1%] xl-1400:ml-0 xl-lg:w-[100%] xl-lg:mx-0 mr-[1.5%] mb-7 xs:mt-5">
          <span style={{ fontFamily: 'Shabnam' }} className="text-base font-bold font-IRsans">مدت زمان سفر</span>
          <div class="mt-2">
            <input style={{ fontFamily: 'Shabnam' }}
              type="text"
              id="input-group-1"
              name="TravelTime"
              onChange={changeHandler}
              onBlur={blurHandler}
              class={`font-IRsans text-right right-6 bg-white border ${allValuesError.TravelTime?"border-[#ff0000]":"border-gray-300"} text-gray-900 text-sm rounded-md  focus:ring-mainColor focus:border-mainColor block w-full p-2.5`}
              placeholder="تعداد روز"
               />
          </div>
          {
allValuesError.TravelTime?
<span style={{ fontFamily: 'Shabnam' }} class="flex items-center font-medium tracking-wide text-[#ff0000] text-xs mt-1 ml-1">
لطفا فیلد را وارد نمایید !
</span>
:
null
          }
        </div>
        <div className="flex flex-col w-[100%]  mb-8">
          <span style={{ fontFamily: 'Shabnam' }} className="text-base font-bold font-IRsans">موضوع سفر</span>
          <div class="mt-2">
            <input style={{ fontFamily: 'Shabnam' }}
              type="text"
              id="input-group-1"
              name="TravelTopic"
              onChange={changeHandler}
              onBlur={blurHandler}
              class={`font-IRsans text-right right-6 bg-white border ${allValuesError.TravelTopic?"border-[#ff0000]":"border-gray-300"} text-gray-900 text-sm rounded-md  focus:ring-mainColor focus:border-mainColor block w-full p-2.5`}
              placeholder="موضوع سفر را اینجا بنویسید" />
          </div>
          {
allValuesError.TravelTopic?
<span style={{ fontFamily: 'Shabnam' }} class="flex items-center font-medium tracking-wide text-[#ff0000] text-xs mt-1 ml-1">
لطفا فیلد را وارد نمایید !
</span>
:
null
          }
        </div>
        <span style={{ fontFamily: 'Shabnam' }} className="text-base font-bold font-IRsans mb-4">اهداف سفر</span>
        <div className="flex flex-wrap w-[100%]">
          <div className="ml-14 mb-4 xs:w-[50%] xs:mx-0">
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
          <div className="ml-14 mb-4 xs:w-[50%] xs:mx-0">
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
          <div className="ml-14 mb-4 xs:w-[50%] xs:mx-0">
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
          <div className="ml-14 mb-4 xs:w-[50%] xs:mx-0">
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
          <div className="ml-14 mb-4 xs:w-[50%] xs:mx-0">
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
          <div className="ml-14 mb-4 xs:w-[50%] xs:mx-0">
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
          <div className="ml-14 mb-4 xs:w-[50%] xs:mx-0">
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
          <div className="ml-14 mb-4 xs:w-[50%] xs:mx-0">
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
          <div className="ml-14 mb-4 xs:w-[50%] xs:mx-0">
            <label style={{ fontFamily: 'Shabnam' }} className="text-base font-normal flex items-center">
              <input style={{ fontFamily: 'Shabnam' }}
                type="checkbox"
                name="TravelGoalId"
                onChange={changeHandler}
                value={"8"}
                class="accent-mainColor w-4 h-4 border-2 border-mainColor outline-mainColor ml-1.5" />
              ورزشی
            </label>
          </div>

        </div>
        <p style={{ fontFamily: 'Shabnam' }} className={`text-[#ff0000] tracking-wide mt-1 w-[100%] text-xs font-[10px] font-IRsans ${allValuesError.TravelGoalId?"flex":"hidden"}`}>لطفا حداقل یک مورد را انتخاب نمایید!</p>
        <span style={{ fontFamily: 'Shabnam' }} className="text-base font-bold font-IRsans mb-4 mt-9 xl-lg:mt-4">اهداف شغلی</span>
        <div className="flex flex-wrap w-[100%]">
          <div className="ml-5 mb-4 xs:w-[100%] xs:mx-0">
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
          <div className="ml-5 mb-4 xs:w-[100%] xs:mx-0">
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
          <div className="ml-5 mb-4 xs:w-[100%] xs:mx-0">
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
          <div className="ml-5 mb-4 xs:w-[100%] xs:mx-0">
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
          <div className="ml-5 mb-4 xs:w-[100%] xs:mx-0">
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
          <div className="ml-5 mb-4 xs:w-[100%] xs:mx-0">
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
          <div className="ml-5 mb-4 xs:w-[100%] xs:mx-0">
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
        <p style={{ fontFamily: 'Shabnam' }} className={`text-[#ff0000] tracking-wide mt-1 w-[100%] text-xs font-[10px] font-IRsans ${allValuesError.JobGoalId?"flex":"hidden"}`}>لطفا حداقل یک مورد را انتخاب نمایید!</p>
        <div className="flex flex-col w-[48.5%] xl-lg:w-[100%] xl-lg:mx-0 xl-lg:mb-0 ml-[1.5%] mt-8 mb-12">

          <span style={{ fontFamily: 'Shabnam' }} className="text-base font-bold font-IRsans">متولیان / شرکت کنندگان</span>

          <div class="mt-5 flex w-[100%] xs:flex-col xs:items-start">
            <input style={{ fontFamily: 'Shabnam' }}
              type="text"
              id="input-group-1"
              name="DeviceName"
              onChange={changeHandler}
              onBlur={blurHandler}
              class={`font-IRsans text-right right-6 bg-white border ${allValuesError.DeviceName?"border-[#ff0000]":"border-gray-300"} text-gray-900 text-sm rounded-md  focus:ring-mainColor focus:border-mainColor block w-[28%] xs:w-[100%] p-2.5 `}
              placeholder="نام دستکاه " />
               {
allValuesError.DeviceName?
<span style={{ fontFamily: 'Shabnam' }} class=" items-center hidden xs:flex font-medium tracking-wide text-[#ff0000] text-xs mt-1 ml-1">
لطفا فیلد را وارد نمایید !
</span>
:
null
          }
              <div className={`flex-col items-center mt-2`}>
            <div className="flex items-center xs:mt-3">
              <input className="accent-mainColor w-4 h-4 border-2 border-mainColor outline-mainColor mr-5 xs:mr-0 ml-1" type="radio" name="ParticipantID"
                             onChange={changeHandler} value={"1"}
 id="r1" />
              <label style={{ fontFamily: 'Shabnam' }} className="" For="r1">متولی</label>
              <input               onChange={changeHandler} value={"2"}
 className="accent-mainColor w-4 h-4 border-2 border-mainColor outline-mainColor mr-5 ml-1" type="radio" name="ParticipantID" id="r2" />
              <label style={{ fontFamily: 'Shabnam' }} className="" For="r2" >شرکت کننده</label>
            </div>
            <p style={{ fontFamily: 'Shabnam' }} className={`text-[#ff0000] tracking-wide mt-1 mr-5 xs:mr-0 text-xs font-[10px] font-IRsans ${allValuesError.ParticipantID?"flex":"hidden"}`}>لطفا یک مورد را انتخاب نمایید!</p>
            </div></div>
          {
allValuesError.DeviceName?
<span style={{ fontFamily: 'Shabnam' }} class="flex items-center xs:hidden font-medium tracking-wide text-[#ff0000] text-xs mt-1 ml-1">
لطفا فیلد را وارد نمایید !
</span>
:
null
          }
          
          

        </div>
        <div className="flex flex-col w-[48.5%] xl-lg:w-[100%] xl-lg:mx-0 mr-[1.5%] mt-8 mb-12">

          <span style={{ fontFamily: 'Shabnam' }} 
           
            className="text-base font-bold font-IRsans">نوع گذرنامه</span>

          <div class="mt-7 xl-lg:mt-4 flex w-[100%]">
            <div className="flex items-center">
              <input className="accent-mainColor w-4 h-4 border-2 border-mainColor outline-mainColor ml-1" type="radio"  id="r3" 
              name="PassportTypeId"
              onChange={changeHandler}
              value={"1"}/>
              <label style={{ fontFamily: 'Shabnam' }} 
              
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
          <p style={{ fontFamily: 'Shabnam' }} className={`text-[#ff0000] tracking-wide mt-1 text-xs font-[10px] font-IRsans ${allValuesError.PassportTypeId?"flex":"hidden"}`}>لطفا یک مورد را انتخاب نمایید!</p>

        </div>
        <div className="flex w-[100%]  lg:flex-col lg:items-start">
          <p style={{ fontFamily: 'Shabnam' }} 
            className="text-base font-bold">آیا نیاز به یادداشت وزارت امور خارجه برای اخذ ویزا دارد ؟</p>
          <div className="flex items-center lg:mt-4">
            <input name="GetVisa" onChange={changeHandler} value={true} className="accent-mainColor w-4 h-4 border-2 border-mainColor outline-mainColor mr-7 lg:mr-0 ml-1" type="radio"  id="a1" />
            <label style={{ fontFamily: 'Shabnam' }} className="" For="a1">بله</label>
            <input value={false} name="GetVisa" onChange={changeHandler} className="accent-mainColor w-4 h-4 border-2 border-mainColor outline-mainColor mr-8 ml-1" type="radio"  id="a2" />
            <label  style={{ fontFamily: 'Shabnam' }} className="" For="a2">خیر</label>
          </div>
        </div>
        <p style={{ fontFamily: 'Shabnam' }} className={`text-[#ff0000] tracking-wide mt-1 text-xs font-[10px] font-IRsans ${allValuesError.GetVisa?"flex":"hidden"}`}>لطفا یک مورد را انتخاب نمایید!</p>
        <div className="flex w-[100%] mt-10 lg:mt-7 lg:flex-col lg:items-start">
          <p style={{ fontFamily: 'Shabnam' }}  className="text-base font-bold">آیا سفر مشترک بین چند دستگاه اجرایی است ؟</p>
          <div className="flex items-center lg:mt-4">
            <input onChange={changeHandler} value={true} name="JointTrip"className="accent-mainColor w-4 h-4 border-2 border-mainColor outline-mainColor mr-7 lg:mr-0 ml-1" type="radio"  id="a3" />
            <label style={{ fontFamily: 'Shabnam' }} 
            className="" For="a1" >بله</label>
            <input   onChange={changeHandler} value={false} name="JointTrip"className="accent-mainColor w-4 h-4 border-2 border-mainColor outline-mainColor mr-8 ml-1" type="radio" id="a4" />
            <label style={{ fontFamily: 'Shabnam' }} className="" For="a2">خیر</label>
          </div>
        </div>
        <p style={{ fontFamily: 'Shabnam' }} className={`text-[#ff0000] tracking-wide mt-1 text-xs font-[10px] font-IRsans ${allValuesError.JointTrip?"flex":"hidden"}`}>لطفا یک مورد را انتخاب نمایید!</p>
        <div className="flex flex-col mt-8 w-[90%] ml-[1.5%] mb-3">
          <span style={{ fontFamily: 'Shabnam' }}  className="text-base font-bold font-IRsans">شماره تاریخ نامه و مقام پیشنهاد دهنده داخلی دستگاه برای انجام سفر را درج نمائید :</span>
          <div class="mt-6">
            <input style={{ fontFamily: 'Shabnam' }}
              type="text"
              id="input-group-1"
              onChange={changeHandler}
              onBlur={blurHandler}
            name="DateLetter"
              class={`font-IRsans text-right right-6 bg-white border ${allValuesError.DateLetter?"border-[#ff0000]":"border-gray-300"} text-gray-900 text-sm rounded-md  focus:ring-mainColor focus:border-mainColor block w-[40%] lg-md:w-[70%] xs:w-[100%] p-2.5`}
            />
          </div>
          {
allValuesError.DateLetter?
<span style={{ fontFamily: 'Shabnam' }} class="flex items-center font-medium tracking-wide text-[#ff0000] text-xs mt-1 ml-1">
لطفا فیلد را وارد نمایید !
</span>
:
null
          }
        </div>

      </div>
      <div className="flex justify-end">
        <button onClick={insertReq}
          style={{ fontFamily: 'Shabnam' }}
          className="w-40 h-12 flex lg-md:mt-6 xs:w-[100%] justify-center items-center bg-mainColor shadow-blueShadow font-IRsans text-white text-xl font-bold rounded-lg hover:bg-lightBlue hover:text-mainColor">
          گام بعدی
        </button>
      </div>

    </div>

  )
}
export default NewRequestFormStep1;