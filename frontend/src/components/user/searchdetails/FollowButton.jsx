import React from 'react'
import Button from '@mui/material/Button';
import classes from './followbutton.module.scss'

/**
 * The follow button component changes the Button text from following to follow or vice versa.
 *  
 */

export default function followButton({isFollowing, onClick}) {
    const [isFollowingState, setIsFollowingState] = React.useState(isFollowing);

    const change = () => {
       setIsFollowingState(boolean => {
           onClick(!boolean);
           return !boolean;
       });
       
    };

    return (
        <Button className={classes.followButton} onClick= {change}>{isFollowingState ? 'Unfollow' : 'Follow'}</Button>
        )

}
   

