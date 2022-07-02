import { createSearchParams, useNavigate } from "react-router-dom";

const LanguCoupon = ({ cardId, term, needsRevision }: { cardId: string, term: string, needsRevision: boolean }) => {
    const navigate = useNavigate();
    const navToCard = () => {
        navigate({
            pathname: "card",
            search: `${createSearchParams({ cardid: cardId })}`
        });
    };
    return (
        <section onClick={navToCard} style={needsRevision ? { backgroundColor: "#FAF1ED" } : {}}>{term}</section>
    );
};

export default LanguCoupon;