"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { percentLossOfCount, percentWinOfCount } from "@/utils/getPercent";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Table,
    TableCaption,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { PAGE_SIZE } from "@/components/constants";
import { itemsCrop } from "@/utils/paginate";
import { UserStatisticsPagination } from "@/components/profile/ui/userStatisticsPagination";

const RESULT_WIN_ID = process.env.NEXT_PUBLIC_RESULT_WIN_ID;
const RESULT_LOSS_ID = process.env.NEXT_PUBLIC_RESULT_LOSS_ID;

export const UserStatistics = memo(function UserStatistics({
    dealsWLByUserId,
}) {
    const router = useRouter();

    const [dealsStatInit, setDealsStatInit] = useState([]);
    const [dealsStatDefault, setDealsStatDefault] = useState([]);
    const [dealsStatCrop, setDealsStatCrop] = useState([]);
    const [totalCount, setTotalCount] = useState(null);
    const [winPercent, setWinPercent] = useState(null);
    const [lossPercent, setLossPercent] = useState(null);

    const [{ currentPage, pageCount }, setPaginateData] = useState({
        currentPage: 1,
        pageCount: 0,
    });

    const changePaginateData = useCallback(
        (items) => {
            const pageCount = Math.ceil(items.length / PAGE_SIZE);
            const dealsCrop = itemsCrop(items, currentPage, PAGE_SIZE);

            setPaginateData((prev) => ({ ...prev, pageCount }));

            return dealsCrop;
        },
        [currentPage]
    );

    useEffect(() => {
        if (dealsWLByUserId?.error) {
            toast.error(dealsWLByUserId.error);
            return;
        } else if (dealsWLByUserId?.redirect) {
            return router.push(dealsWLByUserId.redirect);
        }

        if (dealsWLByUserId.length) {
            setDealsStatInit((prev) => dealsWLByUserId);

            let statistics = {};
            let allCount = 0;
            let allWin = 0;
            let allLoss = 0;

            statistics = dealsWLByUserId.reduce((acc, item) => {
                const itemName = item.name;
                const itemResultId = item.resultId;

                if (acc[itemName]) {
                    if (itemResultId === RESULT_WIN_ID) {
                        acc[itemName].count++;
                        acc[itemName].win++;
                    } else if (itemResultId === RESULT_LOSS_ID) {
                        acc[itemName].count++;
                        acc[itemName].loss++;
                    }
                } else if (
                    !acc[itemName] &&
                    (itemResultId === RESULT_WIN_ID ||
                        itemResultId === RESULT_LOSS_ID)
                ) {
                    acc[itemName] = {
                        name: itemName,
                        count: 1,
                        win: itemResultId === RESULT_WIN_ID ? 1 : 0,
                        loss: itemResultId === RESULT_LOSS_ID ? 1 : 0,
                    };
                }

                return acc;
            }, {});

            const dealsStatistics = Object.keys(statistics).map((key) => {
                allCount += statistics[key].count;
                allWin += statistics[key].win;
                allLoss += statistics[key].loss;

                return {
                    ...statistics[key],
                    win: percentWinOfCount(
                        statistics[key].win,
                        statistics[key].count
                    ),
                    loss: percentLossOfCount(
                        statistics[key].loss,
                        statistics[key].count
                    ),
                };
            });
            const dealsStatisticsCrop = changePaginateData(dealsStatistics);

            setDealsStatDefault((prev) => dealsStatistics);
            setDealsStatCrop((prev) => dealsStatisticsCrop);
            setTotalCount((prev) => allCount);
            setWinPercent((prev) => percentWinOfCount(allWin, allCount));
            setLossPercent((prev) => percentLossOfCount(allLoss, allCount));
        }
    }, [changePaginateData, dealsWLByUserId, router]);

    function handleChangePage(selectPage) {
        if (selectPage === currentPage) return;

        setPaginateData((prev) => ({
            ...prev,
            currentPage: selectPage,
        }));

        const dealsCrop = itemsCrop(dealsStatDefault, selectPage, PAGE_SIZE);

        if (dealsCrop) {
            setDealsStatCrop((prev) => dealsCrop);
        }
    }

    function handleClickPrevPage() {
        if (currentPage === 1 || pageCount === 0) {
            return;
        }

        const selectPage = currentPage - 1;

        setPaginateData((prev) => ({
            ...prev,
            currentPage: selectPage,
        }));

        const newDealsCrop = itemsCrop(dealsStatDefault, selectPage, PAGE_SIZE);

        if (newDealsCrop) {
            setDealsStatCrop((prev) => newDealsCrop);
        }
    }

    function handleClickNextPage() {
        if (currentPage === pageCount || pageCount === 0) {
            return;
        }

        const selectPage = currentPage + 1;

        setPaginateData((prev) => ({
            ...prev,
            currentPage: selectPage,
        }));

        const newDealsCrop = itemsCrop(dealsStatDefault, selectPage, PAGE_SIZE);

        if (newDealsCrop) {
            setDealsStatCrop((prev) => newDealsCrop);
        }
    }

    return (
        <Card className="max-w-[600px] min-w-80 w-full">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    Статистика по сделкам
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <Table className="max-w-[600px] min-w-80 w-full max-h-[598px] overflow-y-auto no-scrollbar">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="max-w-[100px]">
                                Тикер
                            </TableHead>
                            <TableHead className="max-w-[100px] text-center">
                                W:L(%)
                            </TableHead>
                            <TableHead className="max-w-[100px] text-center">
                                Сделок
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dealsStatCrop?.map((dealStatics) => (
                            <TableRow key={dealStatics.name}>
                                <TableCell className="font-medium">
                                    {dealStatics.name}
                                </TableCell>
                                <TableCell className="text-center">
                                    {dealStatics.win}:{dealStatics.loss}
                                </TableCell>
                                <TableCell className="text-center">
                                    {dealStatics.count}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell>Всего</TableCell>
                            <TableCell className="text-center">
                                {winPercent}:{lossPercent}
                            </TableCell>
                            <TableCell className="text-center">
                                {totalCount}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                    <TableCaption>
                        {pageCount > 1 && (
                            <UserStatisticsPagination
                                currentPage={currentPage}
                                pageCount={pageCount}
                                onChangePage={handleChangePage}
                                onClickPrevPage={handleClickPrevPage}
                                onClickNextPage={handleClickNextPage}
                            />
                        )}
                    </TableCaption>
                </Table>
            </CardContent>
        </Card>
    );
});
