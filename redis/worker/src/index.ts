import { createClient } from "redis"

const client = createClient();

async function main(){
    await client.connect()
    while (true) {
        const response = await client.rPop("submissions")
    }
}

main();