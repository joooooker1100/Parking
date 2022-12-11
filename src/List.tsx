import { useEffect, useState } from "react";
interface IList{
    id?:number;
    firstNum?:string;
    letters?:string;
    secoundNum?:string;
    cityNum?:string;
    entranceTime?:number;
    entryDate?:string;
}


export default function List() {
    const[list,setList]=useState<IList[]>([]);





    
    
    
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
    <th>خروج</th>
  </tr>
  
  {list.map((e,index)=>{
return(

  <tr>
    <td>{e.firstNum}{e.letters}{e.secoundNum}-{e.cityNum}</td>
    <td>{e.entryDate}</td> 
    <td>{new Intl.DateTimeFormat('fa', {hour: '2-digit', minute: '2-digit'}).format(e.entranceTime)}</td>
    <td  onClick={()=>{
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

        
    }}>خروج</td>
  </tr>
)
  })

  }
</table>
            
        </div>
    )
    
}



