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

const GoBack = ({ goHome = false, icon }: { goHome?: boolean, icon: string }) => {
    const navigate = useNavigate();
    
    const clickHandler = () => {
        navigate(-1);
    };
    const goBackToLearningBox = () => {
        navigate("/");
    };
    
    return (
        <div style={divStyle} onClick={goHome ? goBackToLearningBox : clickHandler}>
            {icon === "x" ? <XVector /> : <GoBackVector />}
            </div>
    );
};

export default GoBack;