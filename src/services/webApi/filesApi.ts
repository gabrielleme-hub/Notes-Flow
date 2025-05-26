import { GetFetchFile } from "@/config/api";
import { urls } from "@/constants/api";

export async function GetFile(url: string) {
  try {
    // AGORA SIM: Pedindo explicitamente que GetFetch retorne um BLOB
    const response = await GetFetchFile(
      urls.FILES.GET_FILE.concat(`/${url}`),
      {}, // Sem parâmetros de URL extra aqui, se não precisar
      "blob" // <--- ESSA É A CHAVE! Passando 'blob' como responseType
    );

    if (!response) {
      console.error("Nenhum dado retornado de GetFetch.");
      throw new Error("Nenhum dado retornado");
    }

    // Se tudo correr bem, 'response' agora será um Blob
    console.log(
      "GetFile: Response is type:",
      response instanceof Blob ? "Blob" : typeof response
    );
    return response; // Retorna o Blob para useGetFile
  } catch (error) {
    console.error("Erro ao buscar arquivo em GetFile:", error);
    // É importante lançar o erro para que o useQuery possa pegar o estado de erro
    throw error;
  }
}
