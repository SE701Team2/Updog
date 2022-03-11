import React,{useState} from "react"
import { Button} from "@mui/material";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import RegistrationFormView from "./RegistrationFormView";
import classes from "./registrationForm.module.scss"

const CloseButton = styled(Button)({

        display: 'flex',
        fontSize: '16px',
        padding: '10px 60px',
        boxShadow: 'rgba(0, 0, 0, 0) 0px 10px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
        cursor: 'pointer',
        transition:'all 0.1s',
        margin: 'auto',
        marginTop: '200px',
    
    }
)
 

const RegistrationFormController = () => { 
   
   const [values,setValues]=useState({
        userName:"",
        email:"",
        password:""

    });
   
    const [formIsSubmitted, setFormIsSubmitted] = useState(false);
    const submitForm = () => {
        setFormIsSubmitted(true);
    };
 
    const handleChange = async (e) => {
        
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        })
      
        
    };
     
    function validation() {
        const error = {};
        if (!values.userName ) {
             
            error.userName = "Name is required.";
        }
        if (!values.email) {
            error.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            error.email = "Email is invalid.";
        }
        if (!values.password) {
            error.password = "Password is required.";
        } else if (values.password.length < 5) {
            error.password = "Password too short! ";
        }
        return error;
    }
   
    return(
        !formIsSubmitted ?(<RegistrationFormView submitForm={submitForm} 
            onInputChange={handleChange} value={values} errors={validation()}/>) : (
            <div className={classes.appwrapper}>

                <div>
                    <h1 className={classes.formsuccess}>Account Created!</h1>
                    <Link to="/">
                        <CloseButton variant="contained" disableRipple>Close</CloseButton>
                    </Link>
                    
                </div>
            </div>
        )
      
    );
  
}
export default RegistrationFormController;