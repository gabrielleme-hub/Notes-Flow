"use client";
import { MyButton } from "@/components/button";
import { MyTextButton } from "@/components/buttonText/index ";
import { DividerInline } from "@/components/dividerInline";
import { Header } from "@/components/header";
import { NotesDetails } from "@/components/notesDetails";
import { Section } from "@/components/section";
import { Tags } from "@/components/tags";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Details() {
  const router = useRouter();
  const handleClickBack = () => {
    router.back();
  };
  return (
    <div>
      <Header />
      <DividerInline />
      <main className="flex flex-col w-[600px] m-auto gap-[40px] py-[64px]">
        <MyTextButton title="Excluir Nota" direction="end" />

        <NotesDetails
          title="React Modal"
          content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
"
        />
        <Section title="Links úteis " direction="column">
          <Link href="https://www.rocketseat.com.br">
            https://www.rocketseat.com.br
          </Link>
        </Section>
        <Section title="Marcadores " direction="row">
          <Tags title="express" />
          <Tags title="nodejs" />
        </Section>
        <MyButton title="Voltar" onClick={handleClickBack} />
      </main>
    </div>
  );
}
