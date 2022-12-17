import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import InputBase from '@mui/material/InputBase';
import './App.css';
import { useState } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import { Link } from 'react-router-dom';

interface Ipelak {
  id?: number;
  firstNum?: string;
  secoundNum?: string;
  letters?: string;
  cityNum?: string;
  entranceTime?:string;
  entryDate?:string;
  eshterak?:string
}
interface IEshterak{
  id?:number;
  firstNum?: string;
  secoundNum?: string;
  letters?: string;
  cityNum?: string;
  nameLastename?:string;
  kodMeli?:string;
  mobile?:string;
  exp?:number;
  eshterak?:string
}
const options = ['ورود ساعتی', 'ورود اشتراکی'];
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    
    fontSize: 16,
    padding: '10px 10px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));
function App() {
  const [tab, setTab] = React.useState('');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const today = Date.now();

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };
  const [pelakNum, setpelakNum] = useState<Ipelak>({});
  const [pelak,setPelak]=useState<Ipelak[]>([])
  const [eshterak, setEshterak] = useState<Ipelak>({});
  const [moshtarak,setMoshtarak]=useState<IEshterak[]>([]);
  React.useEffect(() => {
    fetch("/pelak")
      .then((w) => w.json())
      .then((w) => setPelak(w));
  }, []);
  React.useEffect(() => {
    fetch("/eshtraks")
      .then((w) => w.json())
      .then((w) => setMoshtarak(w));
  }, []);
  function pelakFirst(e:any) {
    setpelakNum({...pelakNum,firstNum:e.target.value})
  }
  function pelakLetters(e:any) {
    setpelakNum({...pelakNum,letters:e.target.value})
  }
  function pelakSecound(e:any) {
    setpelakNum({...pelakNum,secoundNum:e.target.value})
  }
  function pelakCity(e:any) {
    setpelakNum({...pelakNum,cityNum:e.target.value})
  }
  function moshtarakFirst(e:any) {
    setEshterak({...eshterak,firstNum:e.target.value})
  }
  function moshtarakLetters(e:any) {
    setEshterak({...eshterak,letters:e.target.value})
  }
  function moshtarakSecound(e:any) {
    setEshterak({...eshterak,secoundNum:e.target.value})
  }
  function moshtarakCity(e:any) {
    setEshterak({...eshterak,cityNum:e.target.value})
  }
  return (
    <div className="App">
      <div className='button-group'>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button ><Link className='Link' to='/List'>لیست ورود و خروج</Link></Button>
      <Button><Link className='Link' to='/Eshterak'>خرید و تمدید اشتراک</Link></Button>
      <Button>تنظیمات</Button>
    </ButtonGroup>
      </div>
      <header className="App-header">
        <div className='app-pelak'>
          <img src='pelak.jpg' alt='pelak' style={{height:"60px"}}/>    
           <input className='input-c' type={'text'} value={pelakNum.firstNum} placeholder={'32'}
        onChange={(e)=>{pelakFirst(e);moshtarakFirst(e)
        }}/>
           <input className='input-a' type={"text"} value={pelakNum.letters} placeholder={'الف'}
          onChange={(e)=>{pelakLetters(e);moshtarakLetters(e)}}/>
           <input className='input-a' type={'text'} value={pelakNum.secoundNum} placeholder={'674'}
        onChange={(e)=>{pelakSecound(e);moshtarakSecound(e)}}/>
        </div>
        <div className='app-pelakcity'>
           <input className='input-b' type={'text'}value={pelakNum.cityNum} placeholder={'15'}
        onChange={(e)=>{pelakCity(e);moshtarakCity(e)}}/>
        </div>
      <div className='app-button'>
      <React.Fragment>
      <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
        <Button onClick={()=>{if (selectedIndex===0) { if(
        (pelakNum.firstNum?.length??0)>0 &&
        (pelakNum.secoundNum?.length??0)>0 &&
        (pelakNum.letters?.length??0)>0 &&
        (pelakNum.cityNum?.length??0)>0
      ){
        fetch("/pelak",{
          method:"post",
          headers:{
            "content-type":"application/json",
          },
          body: JSON.stringify({...pelakNum,
            entranceTime:today,entryDate:new Date().toLocaleDateString("fa").substr(0, 10),eshterak:"ندارد"}),
        })
        .then((w)=>w.json()).then(()=>setPelak([...pelak]))
      }
      setpelakNum({firstNum:'',secoundNum:'',letters:'',cityNum:''});
        }


        if (selectedIndex===1) {
          const result = moshtarak.filter((e)=>{
            return e.firstNum === eshterak.firstNum && e.letters === eshterak.letters && e.secoundNum === eshterak.secoundNum && e.cityNum === eshterak.cityNum 
            
          })
          const resultExp= result.filter((e)=>{
            return  (e.exp??0) > today
          })
          console.log(result)
          console.log(resultExp)
              if (result.length === 1 && resultExp.length === 1) {
                
                fetch("/pelak",{
                  method:"post",
                  headers:{
                    "content-type":"application/json",
                  },
                  body: JSON.stringify({...pelakNum,
                    entranceTime:today,entryDate:new Date().toLocaleDateString("fa").substr(0, 10),eshterak:"دارد"}),
                }).then((w)=>w.json()).then(()=>setPelak([...pelak]))
              }
              else if(result.length === 0){
                
                window.alert("پلاک مورد نظر جزیی از خانواده ما نمیباشد")
              }  
              else if(result.length === 1 && resultExp.length === 0 ){
                
                window.alert("اشتراک پلاک مورد نظر به اتمام رسیده است")
              }  
          
        }}}
        >{options[selectedIndex]}</Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
      </div>
      </header>
    </div>
  );
}


export default App;
