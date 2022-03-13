import { useNavigate } from "react-router"
import HeaderView from "./HeaderView"

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
