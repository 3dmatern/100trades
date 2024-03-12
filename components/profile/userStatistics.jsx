"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { percentLossOfCount, percentWinOfCount } from "@/utils/getPercent";

const RESULT_WIN_ID = process.env.NEXT_PUBLIC_RESULT_WIN_ID;
const RESULT_LOSS_ID = process.env.NEXT_PUBLIC_RESULT_LOSS_ID;

export function UserStatistics({ dealsWLByUserId }) {
    const router = useRouter();

    const [dealsStatistics, setDealsStatistics] = useState([]);
    const [dealsStatisticsFiltered, setDealsStatisticsFiltered] = useState([]);
    const [totalCount, setTotalCount] = useState(null);
    const [winPercent, setWinPercent] = useState(null);
    const [lossPercent, setLossPercent] = useState(null);

    useEffect(() => {
        if (dealsWLByUserId?.error) {
            toast.error(dealsWLByUserId.error);
            return;
        } else if (dealsWLByUserId?.redirect) {
            return router.push(dealsWLByUserId.redirect);
        }

        if (dealsWLByUserId.length) {
            setDealsStatistics((prev) => dealsWLByUserId);

            let statistics = {};
            let allCount = 0;
            let allWin = 0;
            let allLoss = 0;

            statistics = dealsWLByUserId.reduce((acc, item) => {
                const itemName = item.name;
                const itemResultId = item.resultId;

                if (acc[itemName]) {
                    acc[itemName].count++;
                    if (itemResultId === RESULT_WIN_ID) {
                        acc[itemName].win++;
                    } else if (itemResultId === RESULT_LOSS_ID) {
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

                if (acc[itemName]) {
                    allCount += acc[itemName].count;
                    allWin += acc[itemName].win;
                    allLoss += acc[itemName].loss;
                }

                return acc;
            }, {});

            setDealsStatisticsFiltered((prev) =>
                Object.keys(statistics).map((key) => ({
                    ...statistics[key],
                    win: percentWinOfCount(
                        statistics[key].win,
                        statistics[key].count
                    ),
                    loss: percentLossOfCount(
                        statistics[key].loss,
                        statistics[key].count
                    ),
                }))
            );
            setTotalCount((prev) => allCount);
            setWinPercent((prev) => percentWinOfCount(allWin, allCount));
            setLossPercent((prev) => percentLossOfCount(allLoss, allCount));
        }
    }, [dealsWLByUserId, router]);

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
                        {dealsStatisticsFiltered?.map((dealStatics) => (
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
                </Table>
            </CardContent>
        </Card>
    );
}
