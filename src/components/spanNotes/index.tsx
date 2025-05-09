interface SpanNotesProps {
  children: React.ReactNode;
}
export default function SpanNotes({ children }: SpanNotesProps) {
  return (
    <span className="bg-[#FF9000] rounded-[5px] p-[5px] text-[#232129] text-[12px] px-[14px] ">
      {children}
    </span>
  );
}
