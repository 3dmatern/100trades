"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useDealsStatistics } from "@/hooks/use-deals-statistics";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { UserInfo } from "@/components/profile/userInfo";
import { UserStatistics } from "@/components/profile/userStatistics";
import { DealsDateStatistics } from "@/components/deals/deals-date-statistics";

const RESULT_WIN_ID = process.env.NEXT_PUBLIC_RESULT_WIN_ID;
const RESULT_LOSS_ID = process.env.NEXT_PUBLIC_RESULT_LOSS_ID;

export default function ProfilePage() {
    const user = useCurrentUser();
    const {
        dealsStatDefault,
        totalCountTiker,
        winPercent,
        lossPercent,
        dealsStatWLPeriod,
        totalCountPeriod,
        totalWin,
        totalLoss,
    } = useDealsStatistics({
        userId: user.id,
        winID: RESULT_WIN_ID,
        lossID: RESULT_LOSS_ID,
    });

    return (
        <>
            <UserInfo user={user} />

            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="px-5">
                        По часам для всех сделок с W:L
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                        <DealsDateStatistics
                            dealsStatWLPeriod={dealsStatWLPeriod}
                            totalCountPeriod={totalCountPeriod}
                            totalWin={totalWin}
                            totalLoss={totalLoss}
                        />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="px-5">
                        По тикерам для всех сделок с W:L
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                        <UserStatistics
                            dealsStatDefault={dealsStatDefault}
                            totalCountTiker={totalCountTiker}
                            winPercent={winPercent}
                            lossPercent={lossPercent}
                        />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </>
    );
}
