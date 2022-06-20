import Back from "../../icons/Back.png";
import XIcon from '../../icons/XIcon.png';
import { useNavigate } from "react-router-dom";

const divStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center"
};

const GoBack = ({ link, icon }: { link: string, icon: string }) => {
    const navigate = useNavigate();
    
    const clickHandler = () => {
        navigate(link);
    }
    // icon: arrow or X
    const goBackIcon = icon === "x" ? XIcon : Back;

    return (
        <div style={divStyle} onClick={clickHandler}>
            <img style={{ margin: "auto" }} src={goBackIcon} alt="go back" />
        </div>
    );
};

export default GoBack;