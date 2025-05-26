export type NotesType = {
  id: string;
  title: string;
  description: string;
  links: {
    id: string;
    url: string;
  }[];
  tags: {
    id: string;
    name: string;
  }[];
};

export type Notes = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  links: string[];
};
