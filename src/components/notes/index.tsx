"use client";
import { useRouter } from "next/navigation";
import { Tags } from "../tags";

interface NotesProps {
  data: {
    title: string;
    tags: {
      id: number;
      name: string;
    }[];
  };
}
export default function Notes({ data }: NotesProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/details");
  };
  return (
    <div
      onClick={handleClick}
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
