import Cell from "@/components/deals/common/cell";

import { formatPrice } from "@/utils/formattedNumber";

export default function TableInfo({
  columnWidth,
  dealsInfo,
  dealsInfoStat,
  isPublished,
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
      {dealsInfo?.[0]?.name !== undefined && (
        <Cell columnWidth={columnWidth["name"]}></Cell>
      )}
      {dealsInfo?.[0]?.resultId !== undefined && (
        <Cell columnWidth={columnWidth["resultId"]}>
          <span className=" overflow-hidden whitespace-nowrap text-ellipsis">
            W:L(%) = {percentWin}:{percentLoss}
          </span>
        </Cell>
      )}
      {dealsInfo?.[0]?.lsId !== undefined && (
        <Cell columnWidth={columnWidth["lsId"]}></Cell>
      )}
      {dealsInfo?.[0]?.pose !== undefined && (
        <Cell columnWidth={columnWidth["pose"]}></Cell>
      )}
      {dealsInfo?.[0]?.risk !== undefined && (
        <Cell columnWidth={columnWidth["risk"]}>
          <span className={portfolioRisk > 0 ? "text-red-600" : ""}>
            ₽ {formatPrice(portfolioRisk)}
          </span>
        </Cell>
      )}
      {dealsInfo?.[0]?.profit !== undefined && (
        <Cell columnWidth={columnWidth["profit"]}>
          <span className={portfolioProfit > 0 ? "text-teal-600" : ""}>
            ₽ {formatPrice(portfolioProfit)}
          </span>
        </Cell>
      )}
      {/* {dealsInfo?.[0]?.rrId !== undefined && (
        <Cell columnWidth={columnWidth["forecast"]}></Cell>
      )} */}
      {/* {dealsInfo?.[0]?.rrId !== undefined && (
                <Cell columnWidth={columnWidth['rrId']}></Cell>
            )} */}
      {dealsInfo?.[0]?.entryDate !== undefined && (
        <Cell columnWidth={columnWidth["entryDate"]}></Cell>
      )}
      {dealsInfo?.[0]?.imageStart !== undefined && (
        <Cell columnWidth={columnWidth["imageStart"]}></Cell>
      )}
      {dealsInfo?.[0]?.deposit !== undefined && (
        <Cell columnWidth={columnWidth["deposit"]}></Cell>
      )}
      {dealsInfo?.[0]?.progress !== undefined && (
        <Cell columnWidth={columnWidth["progress"]}>
          {portfolioProgress || "0.00"}%
        </Cell>
      )}
      {dealsInfo?.[0]?.exitDate !== undefined && (
        <Cell columnWidth={columnWidth["exitDate"]}></Cell>
      )}
      {dealsInfo?.[0]?.imageEnd !== undefined && (
        <Cell columnWidth={columnWidth["imageEnd"]}></Cell>
      )}
      {dealsInfo?.[0]?.take !== undefined && (
        <Cell columnWidth={columnWidth["take"]}></Cell>
      )}
      {dealsInfo?.[0]?.stress !== undefined && (
        <Cell columnWidth={columnWidth["stress"]}></Cell>
      )}
      {isPublished && dealsInfo?.[0]?.entrieTag === undefined ? null : (
        <Cell columnWidth={columnWidth["entrieTag"]}></Cell>
      )}
      {dealsInfo?.[0]?.notes !== undefined && (
        <Cell columnWidth={columnWidth["notes"]}></Cell>
      )}
      {dealsInfo?.[0]?.timeInTrade !== undefined && (
        <Cell columnWidth={columnWidth["timeInTrade"]}>
          ~ {portfolioAverageTime}
        </Cell>
      )}
    </div>
  );
}

function parseTimeInTrade(time) {
  const parseTime = time.split(" ");
  return parseTime;
}
