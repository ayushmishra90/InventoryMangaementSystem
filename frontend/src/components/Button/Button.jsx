import "./Button.css";

function Button({

    children,

    variant = "primary",

    icon,

    className = "",

    ...props

}) {

    return (

        <button

            className={`btn ${variant} ${className}`}

            {...props}

        >

            {icon}

            <span className="btn-text">

                {children}

            </span>

        </button>

    );

}

export default Button;