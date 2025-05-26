"use client";
import { Tags } from "../tags";

interface NotesProps {
  data: {
    title: string;
    tags: {
      id: string;
      name: string;
    }[];
  };
  onclick?: () => void;
  handleSelectNote?: (event: React.MouseEvent<HTMLDivElement>) => void;
}
export default function Notes({ data, handleSelectNote }: NotesProps) {
  return (
    <div
      onClick={handleSelectNote}
      className="flex flex-col bg-[#3E3B47] rounded-[10px] p-[20px] mt-[30px] "
    >
      <h1 className="font-bold text-[24px] mb-[24px]">{data.title}</h1>
      <footer className="flex flex-row">
        {data.tags.map((tag) => (
          <Tags key={tag.id} title={tag.name} />
        ))}
      </footer>
    </div>
  );
}
