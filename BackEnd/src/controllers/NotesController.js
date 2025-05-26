const knex = require("../database/knex")

class NotesController {
  async create(request, response) {
    const { title, description, tags, links } = request.body
    const  user_id  = request.user.id

    const [note_id] = await knex("notes").insert({
      title,
      description,
      user_id
    })

    const linksInsert = links.map(link => {
      return {
        note_id,
        url: link
      }
    })

    await knex("links").insert(linksInsert)

    const tagsInsert = tags.map(name => {
      return {
        note_id,
        name,
        user_id
      }
    })

    await knex("tags").insert(tagsInsert)

    response.json()
  }

  async show(request, response) {
  // id da nota
  const { id } = request.params;

  // Busca a nota pelo id
  const note = await knex("notes").where({ id }).first();

  // Usa o id da nota para buscar tags e links relacionados
  const tags = await knex("tags").where({ note_id: id }).orderBy("name");
  const links = await knex("links").where({ note_id: id }).orderBy("created_at");

  // Retorna a nota com suas tags e links
  return response.json({ ...note, tags, links });
  }
  
  async delete(request, response) {
    try {
      const { id } = request.params;
      const userId = request.user?.id;
      console.log("ID da nota:", id);
      console.log("ID do usuário:", userId);

      if (!userId) {
        return response.status(401).json({ error: "Usuário não autenticado." });
      }

      // Verifica se a nota existe e pertence ao usuário
      const note = await knex("notes").where({ id, user_id: userId }).first();
      if (!note) {
        return response.status(404).json({ error: "Nota não encontrada." });
      }

      // Deleta a nota, suas tags e links
      await knex("tags").where({ note_id: id }).delete();
      await knex("links").where({ note_id: id }).delete();
      await knex("notes").where({ id }).delete();

      return response.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar nota:", error);
      return response.status(500).json({ error: "Erro interno do servidor." });
    }
  }

  async index(request, response) {
    try {
      const userId = request.user?.id;
      if (!userId) {
        return response.status(401).json({ error: "Usuário não autenticado." });
      }
  
      const { search:title = '', tags } = request.query;

      console.log(request.query);
      
  
      let notesQuery = knex("notes")
        .select(["notes.id", "notes.title", "notes.user_id"])
        .where("notes.user_id", userId)
        .whereLike("notes.title", `%${title}%`)
        .orderBy("notes.title");
  
      if (tags) {
        const filterTags = tags.split(',').map(tag => tag.trim());
  
        notesQuery = knex("tags")
          .select(["notes.id", "notes.title", "notes.user_id"])
          .innerJoin("notes", "notes.id", "tags.note_id")
          .where("notes.user_id", userId)
          .whereLike("notes.title", `%${title}%`)
          .andWhere(function () {
            for (const tag of filterTags) {
              this.orWhere("tags.name", "like", `%${tag}%`);
            }
          })
          .orderBy("notes.title");
      }
  
      const notes = await notesQuery;
      const userTags = await knex("tags").where({ user_id: userId });
  
      const notesWithTags = notes.map(note => {
        const noteTags = userTags.filter(tag => tag.note_id === note.id);
        return {
          ...note,
          tags: noteTags
        };
      });
  
      return response.json(notesWithTags);
    } catch (error) {
      console.error("Erro ao listar notas:", error);
      return response.status(500).json({ error: "Erro interno do servidor." });
    }
  }
  
}
module.exports = NotesController