import { cn } from "@/lib/utils";

import { HEADERS_COLUMN } from "@/components/constants";
import CheckboxOrNumber from "@/components/deals/common/checkboxOrNumber";
import SelectFilterButton from "@/components/deals/common/selectFilterButton";

export default function TableHead({
  checkAll,
  columnWidth,
  onResize,
  onCheckAll,
  onSort,
  className,
  isAdmin,
  isModal,
  isPublished,
  currentSheetColumns
}) {
  const filteredDBName = (dbName) => {
    switch (dbName) {
      case "imageStart":
        return null;
      case "imageEnd":
        return null;
      case "entrieTag":
        return null;
      case "entrieTake":
        return null;

      default:
        return dbName;
    }
  };

  const getContent = ({ isModal, isPublished, currentSheetColumns }) => {
    if (isModal && isPublished) {
      return HEADERS_COLUMN.slice(1).map(
        (item, index) =>
          currentSheetColumns[item.dbName] !== null &&
          item.dbName !== "imageStart" &&
          item.dbName !== "imageEnd" && (
            <SelectFilterButton
              key={item.name}
              name={item.name}
              dbName={item.dbName}
              isSort={filteredDBName(item.dbName)}
              nameColumn={item.dbName}
              initWidth={columnWidth[item.dbName]}
              onResize={onResize}
              onSort={onSort}
              classNameList="z-[1]"
              styleBtn={
                item.up
                  ? {
                      textTransform: "uppercase",
                      width: "100%",
                    }
                  : { width: "100%" }
              }
            />
          )
      );
    } else if (isModal) {
      return HEADERS_COLUMN.slice(1).map(
        (item, index) =>
          currentSheetColumns[item.dbName] !== null &&
          item.dbName !== "imageStart" &&
          item.dbName !== "imageEnd" && (
            <SelectFilterButton
              key={item.name}
              name={item.name}
              dbName={item.dbName}
              isSort={filteredDBName(item.dbName)}
              nameColumn={item.dbName}
              initWidth={columnWidth[item.dbName]}
              onResize={onResize}
              onSort={onSort}
              classNameList="z-[1]"
              styleBtn={
                item.up
                  ? {
                      textTransform: "uppercase",
                      width: "100%",
                    }
                  : { width: "100%" }
              }
            />
          )
      );
    } else if (isPublished) {
      return HEADERS_COLUMN.slice(1).map(
        (item, index) =>
          currentSheetColumns?.[item.dbName] !== null && (
            <SelectFilterButton
              key={item.name}
              name={item.name}
              dbName={item.dbName}
              isSort={filteredDBName(item.dbName)}
              nameColumn={item.dbName}
              initWidth={columnWidth[item.dbName]}
              onResize={onResize}
              onSort={onSort}
              classNameList="z-[1]"
              styleBtn={
                item.up
                  ? {
                      textTransform: "uppercase",
                      width: "100%",
                    }
                  : { width: "100%" }
              }
            />
          )
      );
    } else {
      return HEADERS_COLUMN.slice(1).map((item, index) => (
        currentSheetColumns?.[item.dbName] && <SelectFilterButton
          key={item.name}
          name={item.name}
          dbName={item.dbName}
          isSort={filteredDBName(item.dbName)}
          nameColumn={item.dbName}
          initWidth={columnWidth[item.dbName]}
          onResize={onResize}
          onSort={onSort}
          classNameList="z-[1]"
          styleBtn={
            item.up
              ? {
                  textTransform: "uppercase",
                  width: "100%",
                }
              : { width: "100%" }
          }
        />
      ));
    }
  };

  return (
    <div
      className={cn(
        "flex items-center h-8 sticky left-0 top-8 z-[3]",
        "border-t border-b border-slate-300 bg-gray-50",
        className
      )}
    >
      {HEADERS_COLUMN.slice(0, 1).map((item) =>
        isPublished && currentSheetColumns?.[item.dbName] === null ? null : (
          <SelectFilterButton
            key={item.name}
            name={item.name}
            dbName={item.dbName}
            isSort={item.dbName}
            nameColumn={item.dbName}
            initWidth={columnWidth[item.dbName]}
            onResize={onResize}
            onSort={onSort}
            className="sticky left-0 z-[3]"
            classNameContent="pl-8 pr-2 bg-gray-50 border-l"
            classNameList="z-[2]"
            styleBtn={{ width: "100%" }}
          >
            <CheckboxOrNumber
              name="checkAll"
              checked={checkAll}
              onChange={onCheckAll}
              isAdmin={isAdmin}
              isModal={isModal}
              isPublished={isPublished}
              className="size-7 absolute top-1/2 left-[2px] -translate-y-1/2 bg-gray-50"
            />
          </SelectFilterButton>
        )
      )}

      {getContent({ isModal, isPublished, currentSheetColumns })}
    </div>
  );
}
