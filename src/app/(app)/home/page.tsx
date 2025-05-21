"use client";
import { DividerInline } from "@/components/dividerInline";
import { Header } from "@/components/header";
import InputText from "@/components/inputText";
import { MenuNav } from "@/components/menuNav";
import Notes from "@/components/notes";
import { Section } from "@/components/section";
import { useAuth } from "@/context/auth";
import { useGetNotes } from "@/services/queries/notes";

export default function Home() {
  const { data: user } = useAuth();
  const userId = user?.id;
  const { data: notes } = useGetNotes(userId);

  return (
    <>
      <MenuNav />
      <div className="flex-1 flex flex-col">
        <Header />
        <DividerInline />
        <div className="px-16 mt-[40px] ">
          <InputText placeholder="Pesquisar pelo título" />
        </div>
        <main className="flex-1 overflow-auto px-16 pb-[30px] mt-[30px]">
          <Section title="Minhas notas" direction="column">
            {notes?.map((note) => (
              <Notes key={note.userId} data={note.tags} />
            ))}
          </Section>
        </main>
      </div>
    </>
  );
}
