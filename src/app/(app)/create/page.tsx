"use client";
import { MyButton } from "@/components/button";
import { MyTextButton } from "@/components/buttonText/index ";
import { ConfirmationModal } from "@/components/confirmationModal";
import { DividerInline } from "@/components/dividerInline";
import { Header } from "@/components/header";
import InputText from "@/components/inputText";
import { NotesItem } from "@/components/notesItem";
import { Section } from "@/components/section";
import { useCreateNote } from "@/services/mutatios/notes";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Create() {
  //states
  const [links, setLinks] = useState<string[]>([]);
  const [newLink, setNewLink] = useState("");

  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [formError, setFormError] = useState("");
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const router = useRouter();

  //mutation
  const { mutateAsync: createNote, isPending } = useCreateNote();

  //functions
  const handleAddLink = () => {
    setFormError("");
    if (!newLink) {
      setFormError("Erro: esse campo não pode estar vazio.");
      return;
    }
    setLinks((prevstate) => [...prevstate, newLink]);
    setNewLink("");
  };
  const handleRemoveLink = (linkToRemove: string) => {
    setLinks((prevstate) => prevstate.filter((item) => item !== linkToRemove));
  };
  const handleAddTag = () => {
    setFormError("");
    if (!newTag) {
      setFormError("Erro: esse campo não pode estar vazio.");
      return;
    }
    setTags((prevstate) => [...prevstate, newTag]);
    setNewTag("");
  };
  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prevstate) => prevstate.filter((item) => item !== tagToRemove));
  };

  const handleCreateAnotherNote = () => {
    setOpenConfirmationModal(false);
    setTitle("");
    setDescription("");
    setTags([]);
    setLinks([]);
  };
  const handleGoToHome = () => {
    setOpenConfirmationModal(false);
    router.push("/home");
  };
  const handleSaveNote = (event: React.FormEvent) => {
    event.preventDefault();
    setFormError("");

    if (!title) {
      setFormError("Erro: esse campo não pode estar vazio.");
      return;
    }

    const payLoad = {
      title,
      description,
      tags,
      links,
    };

    createNote(payLoad)
      .then(() => {
        setTitle("");
        setDescription("");
        setTags([]);
        setLinks([]);
      })
      .then(() => {
        setOpenConfirmationModal(true);
      })
      .catch((error) => {
        console.error("Error creating note:", error);
        setFormError("Erro: não foi possível criar a nota.");
      });
  };
  return (
    <>
      <Header />
      <DividerInline />
      <main className="flex flex-col px-100 py-10">
        <form onSubmit={handleSaveNote}>
          <div className="flex flex-row items-center justify-between mb-10">
            <h1 className="text-[36px] text-[#F4EDE8] font-medium">
              Criar Nota
            </h1>
            <MyTextButton title="voltar" />
          </div>
          <div className="flex flex-col gap-5">
            <InputText
              placeholder="Título"
              type="text"
              onChange={(event) => setTitle(event.target.value)}
            />
            <textarea
              placeholder="Observações"
              onChange={(event) => setDescription(event.target.value)}
              className="w-full text-[#999591] bg-[#232129] rounded-[10px] px-4 cursor-pointer text-[14px] font-bold h-[150px] mb-[34px] pl-10 pt-4"
            />
          </div>
          <div className="mb-[20px]	">
            <Section title="Links úteis" direction="column">
              {links.map((link, index) => (
                <NotesItem
                  key={String(index)}
                  isNew={false}
                  value={link}
                  onClick={() => handleRemoveLink(link)}
                />
              ))}

              <NotesItem
                isNew={true}
                value={newLink}
                onClick={handleAddLink}
                onChange={(event) => setNewLink(event.target.value)}
                placeholder="Adicionar link"
              />
              {formError && (
                <span className="text-red-500 text-[14px]">{formError}</span>
              )}
            </Section>
          </div>
          <Section title="Marcadores" direction="column">
            <div className="flex flex-col ">
              <div className="flex flex-row justify-between gap-5">
                {tags.map((tag, index) => (
                  <NotesItem
                    key={String(index)}
                    isNew={false}
                    value={tag}
                    onClick={() => {
                      handleRemoveTag(tag);
                    }}
                  />
                ))}
                <NotesItem
                  isNew={true}
                  value={newTag}
                  onClick={handleAddTag}
                  onChange={(event) => setNewTag(event.target.value)}
                  placeholder="Adicionar marcador"
                />
              </div>
              {formError && (
                <span className="text-red-500 text-[14px]">{formError}</span>
              )}
            </div>
          </Section>
          <div className="mt-[20px]">
            <MyButton
              message={isPending ? "Salvando..." : "Salvar"}
              type="submit"
              disabled={isPending}
            />
          </div>
        </form>
        <ConfirmationModal
          isOpen={openConfirmationModal}
          title="Deseja criar outra nota?"
          messageConfirm="Sim"
          messageCancel="Não, voltar para home"
          onConfirm={handleCreateAnotherNote}
          onCancel={handleGoToHome}
        />
      </main>
    </>
  );
}
