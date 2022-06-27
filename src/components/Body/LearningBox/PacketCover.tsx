import { useNavigate } from "react-router-dom";
import classes from './PacketCover.module.css';

const PacketCover = ({ language }: { language: string }) => {
    const navigate = useNavigate();
    
    const navigateToPacketRoute = () => {
        navigate(`/${language}?show=list`);
    };

    return (
        <div className={classes.packetCover} onClick={navigateToPacketRoute}>
            <h1>{`${language![0].toUpperCase()+language!.slice(1)} Packet`}</h1>
        </div>
    );
};

export default PacketCover;