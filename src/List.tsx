import { useEffect, useState } from "react";
interface IList{
    id?:number;
    firstNum?:string;
    letters?:string;
    secoundNum?:string;
    cityNum?:string;
    entranceTime?:number;
    entryDate?:string;
    eshterak?:string
}
export default function List() {
    const[list,setList]=useState<IList[]>([]);
    const today = Date.now();
    const hazinehVorod=50000;
    const hazinehHarsaat=40000;
    useEffect(() => {
        fetch("/pelak")
          .then((w) => w.json())
          .then((w) => setList(w));
      }, []);
    return(
        <div>
<table className="customers">
  <tr>
    <th>پلاک خودرو</th>
    <th>تاریخ ورود</th>
    <th>ساعت ورود</th>
    <th>اشتراک</th>
    <th>خروج</th>
  </tr> 
  {list.map((e,index)=>{
return(
  <tr>
    <td>{e.firstNum}{e.letters}{e.secoundNum}-{e.cityNum}</td>
    <td>{e.entryDate}</td> 
    <td>{new Intl.DateTimeFormat('fa', {hour: '2-digit', minute: '2-digit'}).format(e.entranceTime)}</td>
    <td>{e.eshterak}</td>
    
    <td  onClick={()=>{
      if (window.confirm("آیا مطمئن هستید؟") === true) {
        
        fetch(`/pelak/${e.id}`, {
         method: "delete",
         headers: {
           "content-type": "application/json",
         },
         body: JSON.stringify(list),
       })
         .then((w) => w.json())
         .then((w) => {
           list.splice(index, 1);
           setList([...list]);
         });
      }
      if (
        (today-(e.entranceTime ?? 0))<3600000
      ) {
        window.confirm("هزینه شما"+hazinehVorod+"ریال میباشد")
      }
      if ((today-(e.entranceTime ?? 0))>3600000) {
        window.alert((today-(e.entranceTime ?? 0))*(hazinehHarsaat/3600000))
      }
    }}>خروج</td>
  </tr>
)
  })
  }
</table>
            
        </div>
    )
    
}



