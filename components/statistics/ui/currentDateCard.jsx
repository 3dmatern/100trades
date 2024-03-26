import { cn } from "@/lib/utils";

export const CurrentDateCard = ({ className, children }) => {
  return (
    <CurrentDateCardWrapper className={className}>
      {children}
    </CurrentDateCardWrapper>
  );
};

const CurrentDateCardWrapper = ({ className, children }) => {
  return (
    <div
      className={cn(
        `max-w-[360px] w-full py-1 px-5  flex flex-row items-center justify-center`,
        className
      )}
    >
      {children}
    </div>
  );
};

CurrentDateCard.Item = function CurrentDateCardItem({ className, children }) {
  return (
    <div className={cn("basis-1/3 flex-col text-center", className)}>
      {children}
    </div>
  );
};

CurrentDateCard.ItemName = function CurrentDateCardItemName({
  className,
  name,
}) {
  return <div className={cn("", className)}>{name}</div>;
};

CurrentDateCard.ItemDescription = function CurrentDateCardItemDescription({
  className,
  description,
}) {
  return <div className={cn("", className)}>{description}</div>;
};
