"use client";
import { DividerInline } from "@/components/dividerInline";
import { Header } from "@/components/header";
import InputText from "@/components/inputText";
import { MenuNav } from "@/components/menuNav";
import Notes from "@/components/notes";
import { Section } from "@/components/section";
import { useGetNotes } from "@/services/queries/notes";
import { useGetTags } from "@/services/queries/tags";
import { Tags } from "@/types/tagsType";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const router = useRouter();
  //states
  const [search, setSearch] = useState("");
  const [tagsSelected, setTagsSelected] = useState<string[]>([]);

  //hooks
  const { data: notes } = useGetNotes(search, tagsSelected);
  const { data: tagsData } = useGetTags();

  //effects
  const uniqueTagsNames = useMemo(() => {
    if (!tagsData) return [];
    const names = tagsData.map((tag: Tags) => tag.name.toLowerCase());
    return Array.from(new Set(names));
  }, [tagsData]);

  useEffect(() => {
    console.log("tagsSelected", tagsSelected);
  }, [tagsSelected, search]);

  //functions
  const handleSelectTag = (tagName: string) => {
    if (tagName === "") {
      setTagsSelected([]);
    } else if (tagsSelected.includes(tagName)) {
      setTagsSelected(tagsSelected.filter((tag) => tag !== tagName));
    } else {
      setTagsSelected([...tagsSelected, tagName]);
    }
  };
  const handleSelectNote = (noteId: string) => {
    router.push(`/details/${noteId}`);
  };

  return (
    <div className="flex h-screen">
      <MenuNav
        tags={uniqueTagsNames}
        onSelectTag={handleSelectTag}
        selectedTags={tagsSelected}
      />
      <div className="flex-1 flex flex-col">
        <Header />
        <DividerInline />
        <div className="px-16 mt-[40px] ">
          <InputText
            placeholder="Pesquisar pelo título"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <main className="flex-1 overflow-auto px-16 pb-[30px] mt-[30px]">
          <Section title="Minhas notas" direction="column">
            {notes?.map((note) => (
              <Notes
                key={note.id}
                data={note}
                handleSelectNote={() => handleSelectNote(note.id)}
              />
            ))}
          </Section>
        </main>
      </div>
    </div>
  );
}
