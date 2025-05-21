export type NotesType = {
  title: string;
  description: string;
  userId: string;
  tags: {
    id: string;
    name: string;
  }[];
};
