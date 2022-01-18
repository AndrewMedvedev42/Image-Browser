import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export const BackButtonsMenu = () => {
    const history = useNavigate()
    return (
        <nav className="header">
            <button className="back-button" onClick={()=>history("/")}><AiFillHome size={20}/></button>
            <button className="back-button" onClick={()=>history(-1)}>Back</button>
        </nav>
    )
}