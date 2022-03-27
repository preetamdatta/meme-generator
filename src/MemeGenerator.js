import React, { useState, useEffect } from "react";
import { Button, Alert, Box, MenuItem, TextField, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
// import InfoIcon from '@mui/icons-material/Info';
function MemeGenerator() {
  const [fontSize, setFont_size] = useState("22");
  const [finalFontSize, setFinalFont_size] = useState("22");
  const [topText, setTopText] = useState("");
  const [finalTopText, setFinalTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [finalBottomText, setFinalBottomText] = useState("");
  const [selectedImg, setSelectedImg] = useState("");
  const [img, setImg] = useState();
  const [allMemeImgs, setAllMemeImgs] = useState([]);
  const [showError, setShowError] = useState(false);

  const handleChange = event => {
    const { name, value } = event.target;

    switch(name) {
      case "topText":
        setTopText(value);
        break;
      case "bottomText":
        setBottomText(value);
        break;
      case "font_size":
        setFont_size(value);
        break;
      case "selectedImg":
        setSelectedImg(value);
        if(value) setShowError(false)
        break;
      default:
        break;
    }
  };

  const handleClick = () => {
      if(!selectedImg){
          setShowError(true)
          return;
      }
      setImg(allMemeImgs.find(img => img.id === selectedImg).url);
      setFinalTopText(topText);
      setFinalBottomText(bottomText);
      setFinalFont_size(fontSize);
  };

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then(data => data.json())
      .then(response => {
        const { memes } = response.data;
        setAllMemeImgs(memes);
      });
  })
  
    return (
      <div>
        <Typography component="header">
          <Box sx={{ fontSize: 'h6.fontSize' }}>Create your meme</Box>
        </Typography>
        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
        
          <TextField 
            name="topText"
            id="topText"
            label="Top Text"
            variant="standard"
            value={topText}
            onChange={handleChange}/>
          
          <TextField 
            name="bottomText"
            id="bottomText"
            label="Bottom Text"
            variant="standard"
            value={bottomText}
            onChange={handleChange}/>
          
          
          <TextField 
            name="font_size"
            id="font_size"
            label="Font Size"
            variant="standard"
            value={fontSize}
            onChange={handleChange}/>
          
          
          <TextField
            id="selectedImg"
            name="selectedImg"
            select
            label="Select Image"
            variant="standard"
            value={selectedImg}
            onChange={handleChange}
            error={showError}
        >
          {allMemeImgs.map(img => <MenuItem key={img.id} value={img.id} >{img.name}</MenuItem>)}
        </TextField>
          
        </Box>
        
        <Button variant="contained" onClick={handleClick}>Generate!</Button>

        <div className="meme">
          <h2
            style={{ fontSize: Number(finalFontSize) }}
            className="top"
          >
            {finalTopText}
          </h2>
          <img src={img} alt="" />
          <h2
            style={{ fontSize: Number(finalFontSize) }}
            className="bottom"
          >
            {finalBottomText}
          </h2>
        </div>
        {showError && <Alert severity="error">Please select an image!</Alert>}
      </div>
    );
  
}

export default MemeGenerator;