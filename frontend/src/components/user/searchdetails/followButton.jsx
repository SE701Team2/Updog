import React from 'react'
import Button from '@mui/material/Button';
import classes from './followbutton.module.scss'

/**
 * The follow button component changes the Button text from following to follow or vice versa.
 *  
 */

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
   

