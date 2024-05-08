"use client"

export function Logo() {
    return (
        <img
            src={process.env.NEXT_PUBLIC_APP_URL + "/logo.png"}
            alt="logo"
            className="max-w-[150px] max-h-[39px] md:max-w-[217px]"
        />
    );
};