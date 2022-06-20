const logoStyle = {
    gridColumn: 3,
    fontSize: "1.5em",
    fontFamily: "Quantico",
    lineHeight: 0,
    alignSelf: "center",
    margin: "auto",
    color: "#E40089"
};

const Logo = () => {
    return (
        <h1 style={logoStyle}>LanguCards</h1>
    )
};

export default Logo;

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker
//             .register('./[NAME OF SW FILE.js]')
//             .then(reg => )
//     });
// }