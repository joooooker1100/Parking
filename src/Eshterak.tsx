import { Modal, Box } from "@mui/material";
import React from "react";
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
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Eshterak() {
    const [moshtarak,setMoshtarak]=useState<IEshterak[]>([])
    const [moshtarakin,setMoshtarakin]=useState<IEshterak>({})    
    const[listMoshtarekin,setListmoshtarekin]=useState<IEshterak[]>([])
    const [editmoshtarak, setEditemoshtarak] = useState<IEshterak>({});
    const [index, setIndex] = useState<number>();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        fetch("/eshtraks")
          .then((w) => w.json())
          .then((w) => setMoshtarak(w));
      }, []);
      useEffect(() => {
        fetch("/eshtraks")
          .then((w) => w.json())
          .then((w) => setListmoshtarekin(w));
      }, []);

    return(
        <div>
       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <input
            type={"text"}
            value={editmoshtarak.firstNum}
            onChange={(e) => {
              setEditemoshtarak({ ...editmoshtarak,firstNum: e.target.value });
            }}
          />
          <input
            type={"text"}
            value={editmoshtarak.letters}
            onChange={(e) => {
              setEditemoshtarak({ ...editmoshtarak, letters: e.target.value });
            }}
          />
          <input
            type={"text"}
            value={editmoshtarak.secoundNum}
            onChange={(e) => {
              setEditemoshtarak({ ...editmoshtarak, secoundNum: e.target.value });
            }}
          />
          <input
            type={"text"}
            value={editmoshtarak.cityNum}
            onChange={(e) => {
              setEditemoshtarak({ ...editmoshtarak, cityNum: e.target.value });
            }}
          />
           <input
            type={"text"}
            value={editmoshtarak.kodMeli}
            onChange={(e) => {
              setEditemoshtarak({ ...editmoshtarak, kodMeli: e.target.value });
            }}
          />
                    <input
            type={"text"}
            value={editmoshtarak.mobile}
            onChange={(e) => {
              setEditemoshtarak({ ...editmoshtarak, mobile: e.target.value });
            }}
          />
          <input
            type={"text"}
            value={editmoshtarak.nameLastename}
            onChange={(e) => {
              setEditemoshtarak({ ...editmoshtarak, nameLastename: e.target.value });
            }}
          />
           <input
            type={"date"}
            value={editmoshtarak.exp as any}
            onChange={(e) => {const d = new Date(e.target.value).valueOf()
              setEditemoshtarak({ ...editmoshtarak, exp: d });
            }}
          />
 <button
            onClick={() => {
              handleClose();
              const edite = {
                firstnum: editmoshtarak.firstNum,
                letters: editmoshtarak.letters,
                secoudnum: editmoshtarak.secoundNum,
                citynum: editmoshtarak.cityNum,
                namelastname: editmoshtarak.nameLastename,
                kodmeli: editmoshtarak.kodMeli,
                mobile: editmoshtarak.mobile,
                exp:editmoshtarak.exp
              };
              listMoshtarekin[index!] = edite;
              setListmoshtarekin([...listMoshtarekin]);

              fetch(`/eshtraks/${editmoshtarak.id}`, {
                method: "put",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(editmoshtarak),
              })
                .then((w) => w.json())
                .then((w) => {
                  listMoshtarekin[index!] = w;
                  setListmoshtarekin([...listMoshtarekin]);
                });
            }}
          >
    ذخیره
  </button>

        </Box>
      </Modal>
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
  {
    listMoshtarekin.map((e,index)=>{
      return(
<tr>
  <td>{e.firstNum}{e.secoundNum}{e.letters}{e.cityNum}</td>
  <td>{e.nameLastename}</td>
  <td>{e.kodMeli}</td>
  <td>{e.mobile}</td>
  <td>{new Intl.DateTimeFormat('fa', {year:"numeric", month: '2-digit' , day:"2-digit"}).format(e.exp as any)}</td>
  <td><button onClick={()=>{
    
    if (window.confirm("آیا مطمئن هستید؟") === true) {
      
      fetch(`/eshtraks/${e.id}`, {
       method: "delete",
       headers: {
         "content-type": "application/json",
       }
     })
     .then((w) => w.json())
     .then((w) => {
       moshtarak.splice(index, 1);
      setMoshtarak([...moshtarak])
     });
    }
  }}>حذف</button>
                  <button
                    onClick={() => {
                      handleOpen();
                      setEditemoshtarak(e);
                      setIndex(index);
                    }}
                  >
                    ویرایش
                  </button>
  </td>
</tr>
      )
    })
  }
  </table>
   </div>
    )
}


