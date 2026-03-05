import { ButtonProps } from "./types";

export default function Button({ children, ...props }: ButtonProps) {
    return (
        <button
            className="bg-blue-200 p-2 rounded cursor-pointer"
            {...props}
        >
            {children}
        </button>
    );
}