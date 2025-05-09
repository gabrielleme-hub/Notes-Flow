interface NotesDetailsProps {
  title: string;
  content: string;
}
export function NotesDetails({ title, content }: NotesDetailsProps) {
  return (
    <div className="flex flex-col ">
      <h1 className="text-[36px] font-medium mb-8 ">{title}</h1>
      <div className="text-[16px] w-[600px] text-justify">{content}</div>
    </div>
  );
}
