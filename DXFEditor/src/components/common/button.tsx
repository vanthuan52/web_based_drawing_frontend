import { Link } from "react-router-dom";
import { IButtonProps } from "../types";



const Button = ({
    title,
    onClick,
    style,
    link,
    loading,
    type = 'button',
    disabled,
}:IButtonProps) => {
    let componentClass = style
    if (link)
        return (
         <Link to={link} className={`${componentClass ?? ''} `}>
            {title} 
         </Link>
        )
    return (
        <button
            // style={{backgroundColor:"#FFFFFF"}}
            type={type ?? 'button'}
            onClick={onClick}
            disabled= {disabled || loading}
        >
            <span className={loading ? 'invisible' : ''} >{title}</span>

        </button>
    )
}

export default Button