import {open} from "node:fs/promises";

(async () => {
    const fileHandleRead = await open("src.txt", "r");
    const fileHandleWrite = await open("dest.txt", "w");

    const streamRead = fileHandleRead.createReadStream({highWaterMark: 64 * 1024});
    const streamWrite = fileHandleWrite.createWriteStream();

    let split = "";

    streamRead.on("data", (chunk) => {
        const numbers = chunk.toString("utf-8").split(" ");

        if(Number(numbers[0]) !== Number(numbers[1]) - 1){
            if(split){
                numbers[0] = split.trim() + numbers[0].trim();
            }
        }

        if(Number(numbers[numbers.length - 2]) + 1 !== Number(numbers[numbers.length - 1])){
            split = numbers.pop();
        }

        numbers.forEach((number) => {
            let n = Number(number);

            if(n % 10 === 0){
                if(!streamWrite.write(" " + n + " ")){
                    streamRead.pause();
                }
            }
        })
    })

    streamWrite.on("drain", () => {
        streamRead.resume();
    })
})();