import { DividerInline } from "../dividerInline";

interface SectionProps {
  title: string;
  children?: React.ReactNode;
  direction: "row" | "column";
}
export function Section({ title, children, direction }: SectionProps) {
  const className = `flex ${direction === "row" ? "flex-row" : "flex-col"} `;
  return (
    <div className="flex flex-col ">
      <div className="mb-[20px]">
        <h2 className="mb-[20px] text-[#999591] text-[20px] ">{title}</h2>
        <DividerInline />
      </div>
      <div className={className}>{children}</div>
    </div>
  );
}
