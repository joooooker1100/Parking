import * as React from 'react';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import './App.css';
import { Box, TextField } from '@mui/material';
interface Ipelak {
  id?: number;
  firstNum?: string;
  secoundNum?: string;
  Letters?: string;
  cityNum?: string;
}

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
  const [age, setAge] = React.useState('');
  const handleChange = (event: { target: { value: string } }) => {
    setAge(event.target.value);
  };
  const [name, setName] = React.useState("");
  const [secoundName, setsecoundName] = React.useState("");
  const handleeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleeeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setsecoundName(event.target.value);
  };


  console.log(setsecoundName)
  return (
    <div className="App">
      <header className="App-header">
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '6ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-name"
        
        value={name}
        onChange={handleeChange}
      />
      <FormControl sx={{ m: 1 }} variant="standard">
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={age}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"الف"}>الف</MenuItem>
          <MenuItem value={"ب"}>ب</MenuItem>
          <MenuItem value={"پ"}>پ</MenuItem>
        </Select>
      </FormControl>
            <TextField
        id="outlined-name"
        
        value={secoundName}
        onChange={handleeeChange}
      />
            <TextField
        id="outlined-name"
        
        value={name}
        onChange={handleeChange}
      />
    </Box>
    

      </header>
    </div>
  );
}


export default App;
