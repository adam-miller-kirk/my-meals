"use client";

import { useState } from "react";

type Props = {
    label: string;
};

export default function ShoppingItemToggle({ label }: Props) {
    const [checked, setChecked] = useState(false);

    return (
        <button
            onClick={() => setChecked(!checked)}
            className={`
            flex gap-2 items-center my-1 py-2 px-4 rounded transition
            ${checked ? "bg-green-200 line-through opacity-60" : "bg-blue-200"}
            `}
        >
            {label}
        </button>
    );
}
