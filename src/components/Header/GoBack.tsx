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

const GoBack = ({ goTo = "ONE-BACK", icon }: { goTo?: string, icon: string }) => {
    const navigate = useNavigate();
    
    const goToPage = () => {
        switch (goTo) {
            case "ONE-BACK":
                navigate(-1);
                break;
            case "LEARNING-BOX":
                navigate("/");
                break;
            case "NONE":
                break;
        }
    }
    
    return (
        <div style={divStyle} onClick={goToPage}>
            {icon === "x" ? <XVector /> : <GoBackVector />}
            </div>
    );
};

export default GoBack;