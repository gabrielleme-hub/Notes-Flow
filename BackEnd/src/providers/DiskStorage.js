// fs é um modulo nativo para manipular arquivos
const fs = require("fs");
const path = require("path");
const uploadConfig = require("../configs/upload");

class DiskStorage {
  async saveFile(file) {
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    );

    return file;
  }

  async deleteFile(file) {
    // resolve retorna o caminho completo
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);

    try {
      // stat verifica se o arquivo existe
      await fs.promises.stat(filePath);
    } catch {
      return;
    }
    // unlink remove um arquivo
    await fs.promises.unlink(filePath);
  }
}

module.exports = DiskStorage;