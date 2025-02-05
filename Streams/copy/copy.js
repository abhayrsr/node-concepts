import {open, readFile} from "node:fs/promises";

(async() => {
    const destFile = await open("text-copy.txt", "w");
    const result = await readFile("text.txt");

    await destFile.write(result)
})()