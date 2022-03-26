import React from 'react'
import Button from '@mui/material/Button';
import classes from './followbutton.module.scss'

export default function followButton() {
    const [buttonText, setButtonText] = React.useState("Follow");

    const changeText = () => {
        if(buttonText === "Follow")  setButtonText("Following")
        else if (buttonText === "Following")  setButtonText("Follow")
    };

    return (
        <Button className={classes.followButton} onClick= {()=> changeText()}>{buttonText}</Button>
        )

}
   

