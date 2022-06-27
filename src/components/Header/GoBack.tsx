//import Back from "../../icons/Back.png";
//import XIcon from '../../icons/XIcon.png';
import { XVector, GoBackVector } from "../../generatedIcons";
import { useNavigate } from "react-router-dom";

const divStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
};

const GoBack = ({ link, icon }: { link: string, icon: string }) => {
    const navigate = useNavigate();
    
    const clickHandler = () => {
        navigate(link);
    }
    
    
    return (
        <div style={divStyle} onClick={clickHandler}>
            {icon === "x" ? <XVector /> : <GoBackVector />}
            </div>
    );
};

export default GoBack;