"use client";

import { memo, useCallback, useEffect, useState } from "react";

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
import { PAGE_SIZE_STAT_TIKER } from "@/components/constants";
import { itemsCrop } from "@/utils/paginate";
import { UiPagination } from "@/components/uikit/uiPagination";

export const UserStatistics = memo(function UserStatistics({
    dealsStatDefault,
    totalCountTiker,
    winPercent,
    lossPercent,
}) {
    const [dealsStatCrop, setDealsStatCrop] = useState([]);

    const [{ currentPage, pageCount }, setPaginateData] = useState({
        currentPage: 1,
        pageCount: 0,
    });

    const changePaginateData = useCallback(
        (items) => {
            const pageCount = Math.ceil(items.length / PAGE_SIZE_STAT_TIKER);
            const dealsCrop = itemsCrop(
                items,
                currentPage,
                PAGE_SIZE_STAT_TIKER
            );

            setPaginateData((prev) => ({ ...prev, pageCount }));

            return dealsCrop;
        },
        [currentPage]
    );

    useEffect(() => {
        if (dealsStatDefault.length) {
            const dealsStatisticsCrop = changePaginateData(dealsStatDefault);

            setDealsStatCrop((prev) => dealsStatisticsCrop);
        }
    }, [changePaginateData, dealsStatDefault]);

    function handleChangePage(selectPage) {
        if (selectPage === currentPage) return;

        setPaginateData((prev) => ({
            ...prev,
            currentPage: selectPage,
        }));

        const dealsCrop = itemsCrop(
            dealsStatDefault,
            selectPage,
            PAGE_SIZE_STAT_TIKER
        );

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

        const newDealsCrop = itemsCrop(
            dealsStatDefault,
            selectPage,
            PAGE_SIZE_STAT_TIKER
        );

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

        const newDealsCrop = itemsCrop(
            dealsStatDefault,
            selectPage,
            PAGE_SIZE_STAT_TIKER
        );

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
                        {dealsStatCrop?.map((dealStat) => (
                            <TableRow key={dealStat.name}>
                                <TableCell className="font-medium">
                                    {dealStat.name}
                                </TableCell>
                                <TableCell className="text-center">
                                    {dealStat.win}:{dealStat.loss}
                                </TableCell>
                                <TableCell className="text-center">
                                    {dealStat.count}
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
                                {totalCountTiker}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                    <TableCaption>
                        {pageCount > 1 && (
                            <UiPagination
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
