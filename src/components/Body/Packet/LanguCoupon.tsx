import { createSearchParams, useNavigate } from "react-router-dom";

const LanguCoupon = ({ cardId, term }: { cardId: string, term: string }) => {
    const navigate = useNavigate();
    const navToCard = () => {
        navigate({
            pathname: "card",
            search: `${createSearchParams({ cardid: cardId })}`
        });
    };
    return (
        <section onClick={navToCard}>{term}</section>
    );
};

export default LanguCoupon;