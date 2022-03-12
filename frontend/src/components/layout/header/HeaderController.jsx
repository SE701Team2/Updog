import HeaderView from "./HeaderView"
import { useNavigate } from "react-router"

const HeaderController = () => {
    const navigate = useNavigate();

    const goToFeed = () =>{
        navigate("/feed");
    }

    const goToProfile = ()=>{
        navigate("/user/:username");
    }

    return(
        <HeaderView 
            goToFeed={goToFeed} 
            goToProfile={goToProfile}
        />
    )
}

export default HeaderController
