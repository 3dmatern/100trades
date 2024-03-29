"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useDealsStatistics } from "@/hooks/use-deals-statistics";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { UserInfo } from "@/components/profile/userInfo";
import { DealsTikerStatistics } from "@/components/statistics/dealsTikerStatistics";
import { DealsTimeStatistics } from "@/components/statistics/dealsTimeStatistics";
import { DealsDaysStatistics } from "@/components/statistics/dealsDaysStatistics";

const RESULT_WIN_ID = process.env.NEXT_PUBLIC_RESULT_WIN_ID;
const RESULT_LOSS_ID = process.env.NEXT_PUBLIC_RESULT_LOSS_ID;

export default function ProfilePage() {
  const user = useCurrentUser();
  const {
    dealsStatTikerDefault,
    totalCountTiker,
    winPercentTiker,
    lossPercentTiker,
    dealsStatWLHours,
    totalCountHours,
    totalWinHours,
    totalLossHours,
    dealsStatWLDays,
    totalCountDays,
    totalWinDays,
    totalLossDays,
  } = useDealsStatistics({
    userId: user.id,
    winID: RESULT_WIN_ID,
    lossID: RESULT_LOSS_ID,
  });

  return (
    <>
      <UserInfo user={user} />

      <Card className="max-w-[600px] min-w-80 w-full">
        <CardHeader>
          <p className="text-2xl font-semibold text-center">
            Статистика по сделкам с W:L
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-2">
              <AccordionTrigger className="px-5">По тикерам</AccordionTrigger>
              <AccordionContent className="pt-4">
                <DealsTikerStatistics
                  dealsStatTikerDefault={dealsStatTikerDefault}
                  totalCountTiker={totalCountTiker}
                  winPercentTiker={winPercentTiker}
                  lossPercentTiker={lossPercentTiker}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-1">
              <AccordionTrigger className="px-5">
                По часам (c 9 до 24)
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <DealsTimeStatistics
                  deals={dealsStatWLHours}
                  totalCount={totalCountHours}
                  totalWin={totalWinHours}
                  totalLoss={totalLossHours}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="px-5">По дням</AccordionTrigger>
              <AccordionContent className="pt-4">
                <DealsDaysStatistics
                  deals={dealsStatWLDays}
                  totalCount={totalCountDays}
                  totalWin={totalWinDays}
                  totalLoss={totalLossDays}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </>
  );
}
