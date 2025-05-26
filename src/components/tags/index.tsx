interface TagsProps {
  title: string;
}
export function Tags({ title, ...rest }: TagsProps) {
  return (
    <div
      {...rest}
      className="flex flex-row items-center justify-center text-[#232129] text-[12px] bg-[#FF9000] rounded-[5px] p-[5px] w-[64px] h-[24px] mr-[6px]"
    >
      {title}
    </div>
  );
}
