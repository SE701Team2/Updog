import React from 'react'
import Button from '@mui/material/Button';

export default function followButton() {
    const [buttonText, setButtonText] = React.useState("Follow");

    const changeText = () => {
        if(buttonText === "Follow")  setButtonText("Following")
        else if (buttonText === "Following")  setButtonText("Follow")
        
    };

    return (
        <Button  onClick= {()=> changeText()}>{buttonText}</Button>
      )
   
    }
   

