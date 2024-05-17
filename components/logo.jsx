"use client"

export function Logo() {
    return (
        <img
            src={process.env.NEXT_PUBLIC_APP_URL + "/logo.png"}
            alt="logo"
            className="max-w-[300px]"
        />
    );
};