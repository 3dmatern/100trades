"use client";

import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";

export default function Social() {
    return (
        <div className="flex items-center w-full gap-x-2">
            <Button
                size="lg"
                className="w-full"
                variant="outline"
                onClick={() => {}}
            >
                <FcGoogle className="w-5 h-5" />
            </Button>
        </div>
    );
}
