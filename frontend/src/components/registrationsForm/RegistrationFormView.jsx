
import classes from "./registrationForm.module.scss"

const RegistrationFormView = () => (

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
                         <input className={classes.input} type="text" />
                     </div>
                    <div className={classes.email}>
                         <label className="label">Email</label>
                         <input className={classes.input} type="email" />
                     </div>
                    <div className={classes.password}>
                         <label className="label">Password</label>
                         <input className={classes.input} type="password" />
                     </div>
                    
                     <div>
                         <button className={classes.confirm}>Confirm</button>
                     </div>
                 </form>
             </div>
             
         </div>
 
     )
   


export default RegistrationFormView