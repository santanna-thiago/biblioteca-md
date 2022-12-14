const chalk = require ('chalk');
const fs = require('fs'); // biblioteca do próprio node usada para acessar arquivos, diretórios, ... // para usar fs.readFile(file, [encoding], [callback])
// file é uma string com o caminho do arquivo
// encoding
// callback

function extraiLinks(texto) {
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
    const arrayResultados = [];
    let temp;
    while((temp = regex.exec(texto)) !== null) {
      arrayResultados.push({ [temp[1]]: temp[2] })
    }
    return arrayResultados.length === 0 ? 'não há links' : arrayResultados; // operador ternário
  }
  
  function trataErro(erro) {
    throw new Error(chalk.red(erro.code, 'não há arquivo no caminho'));
  }
  
  async function pegaArquivo(caminhoDoArquivo) {
    const encoding = 'utf-8';
    try {
      const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
      return extraiLinks(texto);
    } catch(erro) {
      trataErro(erro);
    }
  }
  
  module.exports = pegaArquivo;


//pegaArquivo('./arquivos/texto1.md');

// function pegaArquivo(caminhoDoArquivo){
//     const encoding = 'utf-8';
//     fs.readFile(caminhoDoArquivo, encoding)
//     .then((texto) => console.log(chalk.green(texto)))
//     .catch ((erro) => trataErro(erro))
// }
// function pegaArquivo(caminhoDoArquivo){
//     const encoding = 'utf-8';
//     fs.readFile(caminhoDoArquivo, encoding, (erro, texto) =>{
//         if (erro){
//             trataErro(erro);
//         }
//         console.log(chalk.green(texto));
//     })
// }

