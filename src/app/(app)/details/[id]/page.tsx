"use client";
import { MyButton } from "@/components/button";
import { MyTextButton } from "@/components/buttonText/index ";
import { ConfirmationModal } from "@/components/confirmationModal";
import { DividerInline } from "@/components/dividerInline";
import { Header } from "@/components/header";
import { NotesDetails } from "@/components/notesDetails";
import { Section } from "@/components/section";
import { Tags } from "@/components/tags";
import { useDeleteNoteMutation } from "@/services/mutatios/notes";
import { useGetNotesById } from "@/services/queries/notes";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function Details() {
  const router = useRouter();
  const params = useParams();
  const noteId = params.id as string;
  //States
  const [message, setMessage] = useState<string>("");
  const [openValidateModal, setOpenValidateModal] = useState<boolean>(false);
  //hooks
  const { data: note } = useGetNotesById(noteId);

  //Mutations
  const { mutate: deleteNote, isError, error } = useDeleteNoteMutation();

  const handleClickBack = () => {
    router.back();
  };
  const handleOpenValidateModal = () => {
    setOpenValidateModal(true);
  };
  const handleDeleteNote = async () => {
    if (!noteId) {
      setMessage("ID da nota não encontrado.");
      return;
    }

    deleteNote(noteId, {
      onSuccess: () => {
        router.push("/home");
      },
    });
  };

  return (
    <div>
      <Header />
      <DividerInline />
      <main className="flex flex-col w-[600px] m-auto gap-[40px] py-[64px]">
        <MyTextButton
          title="Excluir Nota"
          direction="end"
          onClick={handleOpenValidateModal}
        />

        <NotesDetails
          title={note?.title || ""}
          content={note?.description || ""}
        />
        <Section title="Links úteis " direction="column">
          {note?.links?.map((link) => (
            <Link
              key={link.id}
              href={link.url}
              target="_blank"
              className="text-[#A8A8B3] text-[16px] font-normal hover:text-[#8257E5]"
            >
              {link.url}
            </Link>
          ))}
        </Section>
        <Section title="Marcadores " direction="row">
          {note?.tags?.map((tag) => (
            <Tags key={tag.id} title={tag.name} />
          ))}
        </Section>
        <MyButton message="Voltar" onClick={handleClickBack} />
        {message && (
          <div className="text-center text-red-500">
            {isError ? error.message : message}
          </div>
        )}
      </main>
      <ConfirmationModal
        isOpen={openValidateModal}
        title="Excluir Nota"
        messageConfirm="Excluir"
        messageCancel="Cancelar"
        onCancel={() => setOpenValidateModal(false)}
        onConfirm={handleDeleteNote}
      />
    </div>
  );
}
