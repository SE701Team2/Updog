
import React,{useEffect, useState} from "react"
import classes from "./registrationForm.module.scss"

const RegistrationFormView = ({submitForm}) => {

    function validation(values) {
        const errors = {};
        if (!values.userName) {
            errors.userName = "Name is required.";
        }
        if (!values.email) {
            errors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = "Email is invalid.";
        }
        if (!values.password) {
            errors.password = "Password is required.";
        } else if (values.password.length < 5) {
            errors.password = "Password too short! ";
        }
        return errors;
    }

    const [values,setValues]=useState({
        userName:"",
        email:"",
        password:""

    });
    const [errors, setErrors] = useState({});
    const [data, setData] = useState(false);
    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        })
    };
    const formConfirm = async (event) => {
        event.preventDefault();
        setErrors(validation(values));
        setData(true);
        // post data to backend not finished
        // try{.....} 
        console.log(values.userName,values.email,values.password);
    };
   useEffect(() => {
       if(Object.keys(errors).length === 0 && data){
            submitForm(true)
       }
   })
    return (
        // <div className={classes.container}>
            <div className={classes.appwrapper}>
                 {/* <div>
                     <button className={classes.cancel}>Cancel</button>
                 </div> */}
                <div>
                    <h2 className={classes.title}>Create an account</h2>
                </div>
                <form className="form-wrapper">
                    
                    <div className={classes.name}>
                         <label className="label">Name</label>
                         <input 
                            className={classes.input}
                            type="text" 
                            name="userName"
                            value={values.userName}
                            onChange={handleChange}
                         />
                         {errors.userName && <p className={classes.error}>{errors.userName}</p>}
                     </div>
                    <div className={classes.email}>
                         <label className="label">Email</label>
                         <input 
                            className={classes.input}
                            type="email" 
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                         />
                        {errors.email && <p className={classes.error}>{errors.email}</p>}

                    </div>
                    <div className={classes.password}>
                         <label className="label">Password</label>
                         <input 
                            className={classes.input} 
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}                         
                         />
                         {errors.password && <p className={classes.error}>{errors.password}</p>}

                     </div>
                    
                     <div>
                         <button className={classes.confirm} onClick={formConfirm}>Confirm</button>
                     </div>
                 </form>
             </div>
             
         // </div>
    )
 
}
                


export default RegistrationFormView