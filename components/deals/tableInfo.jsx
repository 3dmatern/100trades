import Cell from "@/components/deals/common/cell";

import { formatPrice } from "@/utils/formattedNumber";

export default function TableInfo({
  columnWidth,
  dealsInfoStat,
  isPublished,
  currentSheetColumns
}) {
  const {
    percentWin,
    percentLoss,
    portfolioRisk,
    portfolioProfit,
    portfolioProgress,
    portfolioAverageTime,
  } = dealsInfoStat;
  return (
    <div className="flex items-center h-8 sticky left-0 top-0 z-[4] bg-gray-200">
      {currentSheetColumns?.name !== null && (
        <Cell columnWidth={columnWidth["name"]}></Cell>
      )}
      {currentSheetColumns?.resultId !== null && (
        <Cell columnWidth={columnWidth["resultId"]}>
          <span className=" overflow-hidden whitespace-nowrap text-ellipsis">
            W:L(%) = {percentWin}:{percentLoss}
          </span>
        </Cell>
      )}
      {currentSheetColumns?.lsId !== null && (
        <Cell columnWidth={columnWidth["lsId"]}></Cell>
      )}
      {currentSheetColumns?.pose !== null && (
        <Cell columnWidth={columnWidth["pose"]}></Cell>
      )}
      {currentSheetColumns?.risk !== null && (
        <Cell columnWidth={columnWidth["risk"]}>
          <span className={portfolioRisk > 0 ? "text-red-600" : ""}>
            ₽ {formatPrice(portfolioRisk)}
          </span>
        </Cell>
      )}
      {currentSheetColumns?.profit !== null && (
        <Cell columnWidth={columnWidth["profit"]}>
          <span className={portfolioProfit > 0 ? "text-teal-600" : ""}>
            ₽ {formatPrice(portfolioProfit)}
          </span>
        </Cell>
      )}
      {/* {currentSheetColumns?.forecast !== null && (
        <Cell columnWidth={columnWidth["forecast"]}></Cell>
      )} */}
      {currentSheetColumns?.entrieTake === null ? null : (
        <Cell columnWidth={columnWidth["entrieTake"]}></Cell>
      )}
      {/* {currentSheetColumns?.rrId !== null && (
        <Cell columnWidth={columnWidth['rrId']}></Cell>
      )} */}
      {currentSheetColumns?.entryDate !== null && (
        <Cell columnWidth={columnWidth["entryDate"]}></Cell>
      )}
      {currentSheetColumns?.imageStart !== null && (
        <Cell columnWidth={columnWidth["imageStart"]}></Cell>
      )}
      {currentSheetColumns?.deposit !== null && (
        <Cell columnWidth={columnWidth["deposit"]}></Cell>
      )}
      {currentSheetColumns?.progress !== null && (
        <Cell columnWidth={columnWidth["progress"]}>
          {portfolioProgress || "0.00"}%
        </Cell>
      )}
      {currentSheetColumns?.exitDate !== null && (
        <Cell columnWidth={columnWidth["exitDate"]}></Cell>
      )}
      {currentSheetColumns?.imageEnd !== null && (
        <Cell columnWidth={columnWidth["imageEnd"]}></Cell>
      )}
      {currentSheetColumns?.take !== null && (
        <Cell columnWidth={columnWidth["take"]}></Cell>
      )}
      {currentSheetColumns?.stress !== null && (
        <Cell columnWidth={columnWidth["stress"]}></Cell>
      )}
      {isPublished && currentSheetColumns?.entrieTag === null ? null : (
        <Cell columnWidth={columnWidth["entrieTag"]}></Cell>
      )}
      {currentSheetColumns?.notes !== null && (
        <Cell columnWidth={columnWidth["notes"]}></Cell>
      )}
      {currentSheetColumns?.timeInTrade !== null && (
        <Cell columnWidth={columnWidth["timeInTrade"]}>
          ~ {portfolioAverageTime}
        </Cell>
      )}
    </div>
  );
}
