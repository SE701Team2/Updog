import classes from './registrationpage.module.scss'
import Registration  from '../../components/registrationsForm/RegistrationFormController'

const RegistrationPageController = () => (
    <div className={classes.container}>
        <Registration />

    </div>
)

export default RegistrationPageController
