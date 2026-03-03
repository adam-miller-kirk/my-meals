"use client";

import { useState } from "react";
import { shoppingItemToggleProps } from "../model/types";

export default function ShoppingItemToggle({ label, checked = false }: shoppingItemToggleProps) {
    const [isChecked, setIsChecked] = useState(checked);

    return (
        <button
            onClick={() => setIsChecked(!isChecked)}
            className={`
                flex gap-2 items-center my-1 py-2 px-4 rounded transition
                ${isChecked ? "bg-green-200 line-through opacity-60" : "bg-blue-200"}
            `}
        >
            {label}
        </button>
    );
}
