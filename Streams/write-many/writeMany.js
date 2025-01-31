import { open, mkdir, writeFile } from "node:fs/promises";
import { Buffer } from "node:buffer";


const createAFile = async() => {
    let filehandle;
    try{
        const projectFolder = new URL('./text.txt', import.meta.url);
        const createDir = await mkdir(projectFolder, {recursive: true});
         filehandle = await open('./temp.txt', 'w');

        let content = ""

        for(let i = 0; i < 1000000; i++){
            content += i + " "
        }

        const data = new Uint8Array(Buffer.from(content));
        const promise = writeFile('./temp.txt', data);
        await promise;
        console.log("projectFolder created");
    } catch(err) {
        console.log(err.message);
    } finally {
        filehandle.close();
    }


}

createAFile();