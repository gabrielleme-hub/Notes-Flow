"use client";
import { MyButton } from "@/components/button";
import { MyTextButton } from "@/components/buttonText/index ";
import { DividerInline } from "@/components/dividerInline";
import { Header } from "@/components/header";
import InputText from "@/components/inputText";
import { NotesItem } from "@/components/notesItem";
import { Section } from "@/components/section";

export default function Create() {
  return (
    <div>
      <Header />
      <DividerInline />
      <main className="flex flex-col px-100 py-10">
        <form>
          <div className="flex flex-row items-center justify-between mb-10">
            <h1 className="text-[36px] text-[#F4EDE8] font-medium">
              Criar Nota
            </h1>
            <MyTextButton title="voltar" />
          </div>
          <div className="flex flex-col gap-5">
            <InputText placeholder="Título" type="text" />
            <textarea
              placeholder="Observações"
              className="w-full text-[#999591] bg-[#232129] rounded-[10px] px-4 cursor-pointer text-[14px] font-bold h-[150px] mb-[34px] pl-10 pt-4"
            />
          </div>
          <div className="mb-[20px]	">
            <Section title="Links úteis" direction="column">
              <NotesItem
                isNew={false}
                value="https://rocketseat.com.br"
                onClick={() => {}}
              />
              <NotesItem isNew={true} value="" onClick={() => {}} />
            </Section>
          </div>
          <Section title="Marcadores" direction="column">
            <div className="flex flex-row justify-between gap-5">
              <NotesItem isNew={false} value="React" onClick={() => {}} />
              <NotesItem isNew={true} value="" onClick={() => {}} />
            </div>
          </Section>
          <div className="mt-[20px]">
            <MyButton title="Salvar" />
          </div>
        </form>
      </main>
    </div>
  );
}
