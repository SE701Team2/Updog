import { useNavigate } from "react-router"
import HeaderView from "./HeaderView"
import user from "./mock-userData"

const HeaderController = () => {
    const navigate = useNavigate();

    const goToFeed = () =>{
        navigate("/feed");
    }

    const goToProfile = ()=>{
        navigate(`/user/${user.username}`);
    }

    return(
        <HeaderView 
            user={user}
            goToFeed={goToFeed} 
            goToProfile={goToProfile}
        />
    )
}

export default HeaderController
