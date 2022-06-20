import { useNavigate } from "react-router-dom";
import { PacketInterface } from "./LearningBox";
import classes from './PacketCover.module.css';

type PacketCoverDeclaration = ({ language, direction }: PacketInterface) => JSX.Element | null;

const PacketCover: PacketCoverDeclaration = ({ language, direction }) => {
    const navigate = useNavigate();
    
    const navigateToPacketRoute = () => {
        navigate(`/${language}`);
    };

    return (
        <div className={classes.packetCover} onClick={navigateToPacketRoute}>
            <h1>{`${language![0].toUpperCase()+language!.slice(1)} Packet`}</h1>
        </div>
    );
};

export default PacketCover;