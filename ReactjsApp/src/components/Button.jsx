
const Button = ({ func, children, style }) => {
    return (
        <>
            <button className={style} onClick={() => func()}>
                {children}
            </button>
        </>
    )
}

export default Button;