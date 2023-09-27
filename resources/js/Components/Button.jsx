import PropTypes from "prop-types";

Button.propTypes = {
    type: PropTypes.oneOf(["button", "submit", "reset"]),
    className: PropTypes.string,
    width: PropTypes.number,
    variant: PropTypes.oneOf([
        "primary",
        "warning",
        "danger",
        "light-outline",
        "white-outline",
    ]),
    processing: PropTypes.bool,
    children: PropTypes.node,
};

export default function Button({
    className = "",
    variant = "primary",
    disabled,
    processing,
    children,
    type="button",
    width,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={`rounded-2xl py-[13px] text-center ${width ? `w-[${width}%]` : "w-full"}
                ${processing && "opacity-25"} btn-${variant} ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
