"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useDealsStatistics } from "@/hooks/use-deals-statistics";
import { useTags } from "@/hooks/use-tags";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { UserInfo } from "@/components/profile/userInfo";
import {
  DealsTikerStatistics,
  DealsTimeStatistics,
  DealsDaysStatistics,
  DealsTagsStatistics,
} from "@/components/statistics";
import { TAKE_TAGS } from "@/hooks/constants";
import { UserAllTags } from "@/components/profile/userAllTags";

const RESULT_WIN_ID = process.env.NEXT_PUBLIC_RESULT_WIN_ID;
const RESULT_LOSS_ID = process.env.NEXT_PUBLIC_RESULT_LOSS_ID;

export default function ProfilePage() {
  const user = useCurrentUser();
  const { tikersStat, hoursWLStat, daysWLStat, tagsWLStat } =
    useDealsStatistics({
      userId: user.id,
      winID: RESULT_WIN_ID,
      lossID: RESULT_LOSS_ID,
    });
  const {
    currentPage,
    pageCount,
    userTags,
    selecteduserTags,
    onChangePage,
    onClickPrevPage,
    onClickNextPage,
    onRemoveUserTag,
  } = useTags({ userId: user.id, skip: 0, take: TAKE_TAGS });

  return (
    <>
      <div
        className="
          flex flex-col items-center justify-start gap-8 
          lg:flex-row lg:items-start lg:justify-center
        "
      >
        <UserInfo user={user}  />

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
                  <DealsTikerStatistics tikersStat={tikersStat} />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-1">
                <AccordionTrigger className="px-5">
                  По часам (c 9 до 24)
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <DealsTimeStatistics hoursWLStat={hoursWLStat} />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="px-5">По дням</AccordionTrigger>
                <AccordionContent className="pt-4">
                  <DealsDaysStatistics daysWLStat={daysWLStat} />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="px-5">По тегам</AccordionTrigger>
                <AccordionContent className="pt-4">
                  <DealsTagsStatistics tagsWLStat={tagsWLStat} />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="px-5">
                  Все теги
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <UserAllTags
                    currentPage={currentPage}
                    pageCount={pageCount}
                    userTags={userTags}
                    selecteduserTags={selecteduserTags}
                    onChangePage={onChangePage}
                    onClickPrevPage={onClickPrevPage}
                    onClickNextPage={onClickNextPage}
                    onRemoveUserTag={onRemoveUserTag}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
      
      <Card className="max-w-5xl min-w-80 w-full mx-auto">
        <CardHeader>
          <p className="text-2xl font-semibold text-center">
            Текущие данные
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="px-5">
                Все теги
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <UserAllTags
                  currentPage={currentPage}
                  pageCount={pageCount}
                  userTags={userTags}
                  selecteduserTags={selecteduserTags}
                  onChangePage={onChangePage}
                  onClickPrevPage={onClickPrevPage}
                  onClickNextPage={onClickNextPage}
                  onRemoveUserTag={onRemoveUserTag}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </>
  );
}
