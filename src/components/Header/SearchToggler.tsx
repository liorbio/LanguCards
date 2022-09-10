import { MagnifVector } from "../../generatedIcons";

const divStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "end"
};

const SearchToggler = () => {
    return (
        <div style={divStyle}>
            {/*<img style={{ margin: "auto" }} src={MagnifyingGlass} alt="search and filters" />*/}
            <MagnifVector />
        </div>
    )
};

export default SearchToggler;