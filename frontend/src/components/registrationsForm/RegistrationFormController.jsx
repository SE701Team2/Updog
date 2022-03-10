import React,{useState} from "react"
import { useNavigate } from 'react-router-dom'
import RegistrationFormView from "./RegistrationFormView";
import classes from "./registrationForm.module.scss"

const RegistrationFormController = () => {
    const navigate = useNavigate();
    const [formIsSubmitted, setFormIsSubmitted] = useState(false);
    const submitForm = () => {
        setFormIsSubmitted(true);
    };
    async function handleClose() {
        navigate("/post/:id")
    }
    

   
    return(
        !formIsSubmitted ?(<RegistrationFormView submitForm={submitForm}/>) : (
            <div className={classes.appwrapper}>

                <div>
                    <h1 className={classes.formsuccess}>Account Created!</h1>
                    <button className={classes.close} onClick={handleClose}>Close</button>
                </div>
            </div>
        )
      
    );
    // if(!formIsSubmitted){
    //     return(<RegistrationFormView submitForm={submitForm}/>);
    // }if(formIsSubmitted){
    //      return(
            // <div className={classes.appwrapper}>

            //     <div>
            //         <h1 className={classes.formsuccess}>Account Created!</h1>
            //     </div>
            // </div>
    //     )
    // }

}
export default RegistrationFormController;