import React,{useState} from "react"
import classes from "./registrationForm.module.scss"

const RegistrationFormView = () => {
    const [values,setValues]=useState({
        userName:"",
        email:"",
        password:""

    });
    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        })
    }
    const formConfirm = async (event) => {
        event.preventDefault();

}
    return (
        <div className={classes.container}>
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
                     </div>
                    
                     <div>
                         <button className={classes.confirm} onClick={formConfirm}>Confirm</button>
                     </div>
                 </form>
             </div>
             
         </div>
    )
 
}
                


export default RegistrationFormView