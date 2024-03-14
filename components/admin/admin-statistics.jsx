"use client";

import { memo, useCallback, useEffect, useState } from "react";

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
import { PAGE_SIZE_ADMIN_STAT } from "@/components/constants";
import { itemsCrop } from "@/utils/paginate";
import { UiPagination } from "@/components/uikit/uiPagination";
import { cn } from "@/lib/utils";

export const AdminStatistics = memo(function AdminStatistics({
    dealsStatWLPeriod,
    totalCountDealsStat,
    totalWin,
    totalLoss,
}) {
    const [dealsStatCrop, setDealsStatCrop] = useState([]);
    const [{ currentPage, pageCount }, setPaginateData] = useState({
        currentPage: 1,
        pageCount: 0,
    });

    const changePaginateData = useCallback(
        (items) => {
            const pageCount = Math.ceil(items.length / PAGE_SIZE_ADMIN_STAT);
            const dealsCrop = itemsCrop(
                items,
                currentPage,
                PAGE_SIZE_ADMIN_STAT
            );

            setPaginateData((prev) => ({ ...prev, pageCount }));

            return dealsCrop;
        },
        [currentPage]
    );

    useEffect(() => {
        if (dealsStatWLPeriod.length) {
            const dealsStatisticsCrop = changePaginateData(dealsStatWLPeriod);

            setDealsStatCrop((prev) => dealsStatisticsCrop);
        }
    }, [changePaginateData, dealsStatWLPeriod]);

    function handleChangePage(selectPage) {
        if (selectPage === currentPage) return;

        setPaginateData((prev) => ({
            ...prev,
            currentPage: selectPage,
        }));

        const dealsCrop = itemsCrop(
            dealsStatWLPeriod,
            selectPage,
            PAGE_SIZE_ADMIN_STAT
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
            dealsStatWLPeriod,
            selectPage,
            PAGE_SIZE_ADMIN_STAT
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
            dealsStatWLPeriod,
            selectPage,
            PAGE_SIZE_ADMIN_STAT
        );

        if (newDealsCrop) {
            setDealsStatCrop((prev) => newDealsCrop);
        }
    }

    const getTableBody = () => {
        return dealsStatCrop.map((deal, index) => {
            const lossIsMore = deal.loss > deal.win;
            return (
                <TableRow key={index}>
                    <TableCell>{deal.name}</TableCell>
                    <TableCell
                        className={cn(
                            "text-center text-teal-500",
                            lossIsMore && "text-destructive"
                        )}
                    >
                        {deal.win}:{deal.loss}
                    </TableCell>
                    <TableCell className="text-center">{deal.count}</TableCell>
                </TableRow>
            );
        });
    };

    return (
        <Table className="max-w-[400px] min-w-80 w-full max-h-[598px] mx-auto border overflow-y-auto no-scrollbar">
            <TableHeader>
                <TableRow>
                    <TableHead className="max-w-[100px]">Время</TableHead>
                    <TableHead className="max-w-[100px] text-center">
                        W:L
                    </TableHead>
                    <TableHead className="max-w-[100px] text-center">
                        Сделок
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>{getTableBody()}</TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell>Всего</TableCell>
                    <TableCell
                        className={cn(
                            "text-center text-teal-500",
                            totalWin < totalLoss && "text-destructive"
                        )}
                    >
                        {totalWin}:{totalLoss}
                    </TableCell>
                    <TableCell className="text-center">
                        {totalCountDealsStat}
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
    );
});
