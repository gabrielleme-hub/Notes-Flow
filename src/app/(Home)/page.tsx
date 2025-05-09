import { DividerInline } from "@/components/dividerInline";
import { Header } from "@/components/header";
import InputText from "@/components/inputText";
import { MenuNav } from "@/components/menuNav";
import Notes from "@/components/notes";
import { Section } from "@/components/section";

export default function Home() {
  return (
    <div className="flex h-screen bg-[#28262E]">
      <MenuNav />
      <div className="flex-1 flex flex-col">
        <Header />
        <DividerInline />
        <div className="px-16 mt-[40px] ">
          <InputText placeholder="Pesquisar pelo título" />
        </div>
        <main className="flex-1 overflow-auto px-16 pb-[30px] mt-[30px]">
          <Section title="Minhas notas" direction="column">
            <Notes
              key={1}
              data={{
                title: "React Modal",
                tags: [{ id: 1, name: "React" }],
              }}
            />
            <Notes
              key={2}
              data={{
                title: "Exemplo de Middleware",
                tags: [
                  { id: 1, name: "Express" },
                  { id: 2, name: "Nodejs" },
                ],
              }}
            />
          </Section>
        </main>
      </div>
    </div>
  );
}
