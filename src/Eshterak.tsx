import { useEffect, useState } from "react";
interface IEshterak{
    id?:number;
    firstNum?:string;
    letters?:string;
    secoundNum?:string;
    cityNum?:string;
    nameLastename?:string;
    kodMeli?:string;
    mobile?:string;
    exp?:Number;
}
export default function Eshterak() {
    const [moshtarak,setMoshtarak]=useState<IEshterak[]>([])
    const [moshtarakin,setMoshtarakin]=useState<IEshterak>({})    
    useEffect(() => {
        fetch("/eshtraks")
          .then((w) => w.json())
          .then((w) => setMoshtarak(w));
      }, []);
    return(
        <div>
          <div className="All-pelak">
          <div className='app-pelake'>
          <img src='pelak.jpg' alt='pelak' style={{height:"60px"}}/>
            <input className='input-ce' placeholder="32" value={moshtarakin.firstNum} onChange={(e)=>{setMoshtarakin({...moshtarakin,firstNum:e.target.value})}}/>
            <input className='input-ae' placeholder="الف" value={moshtarakin.letters} onChange={(e)=>{setMoshtarakin({...moshtarakin,letters:e.target.value})}}/>
            <input className='input-ae' placeholder="753" value={moshtarakin.secoundNum} onChange={(e)=>{setMoshtarakin({...moshtarakin,secoundNum:e.target.value})}}/>
          </div>
          <div className='app-pelakcitye'>
            <input className='input-be' placeholder="15" value={moshtarakin.cityNum} onChange={(e)=>{setMoshtarakin({...moshtarakin,cityNum:e.target.value})}}/>
          </div>
            <input placeholder="نام و نام خانوادگی" value={moshtarakin.nameLastename} onChange={(e)=>{setMoshtarakin({...moshtarakin,nameLastename:e.target.value})}}/>
            <input placeholder=" کد ملی" value={moshtarakin.kodMeli} onChange={(e)=>{setMoshtarakin({...moshtarakin,kodMeli:e.target.value})}}/>
            <input placeholder="شماره تماس"value={moshtarakin.mobile} onChange={(e)=>{setMoshtarakin({...moshtarakin,mobile:e.target.value})}}/>
            <input placeholder=":اعتبار تا تاریخ" type={"date"} id="date_value" name="date_end"  onChange={(e)=>{const b =new Date(e.target.value).valueOf()
              setMoshtarakin({...moshtarakin,exp:b})}} />         
            <button onClick={()=>{
fetch("/eshtraks",{
    method:"post",
    headers:{
      "content-type":"application/json",
    },
    body: JSON.stringify({...moshtarakin}),
}).then((w)=>w.json()).then(()=>setMoshtarak([...moshtarak]));
setMoshtarakin({firstNum:'',secoundNum:'',letters:'',cityNum:'',nameLastename:'',kodMeli:'',mobile:''});
}}>ثبت</button>
  </div>
 <table className="customers">
  <tr>
    <th>پلاک خودرو</th>
    <th>نام و نام خانوادگی</th>
    <th>کد ملی  </th>
    <th>شماره تماس</th>
    <th>تاریخ انقضا اشتراک</th>
    <th>تمدید و حذف مشترک</th>
  </tr>
  </table>
   </div>
    )
}