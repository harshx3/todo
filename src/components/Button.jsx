const Button = ({ name, onClick, cName, }) => {
    return (
        <button onClick={onClick} className={cName}>{name}</button>
    )
};

export default Button;