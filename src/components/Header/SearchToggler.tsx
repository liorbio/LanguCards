import MagnifyingGlass from "../../icons/MagnifyingGlass.png";

const divStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center"
};

const SearchToggler = () => {
    return (
        <div style={divStyle}>
            <img style={{ margin: "auto" }} src={MagnifyingGlass} alt="search and filters" />
        </div>
    )
};

export default SearchToggler;