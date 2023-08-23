import { Instance } from "../src";

async function second () {
    const broker = new Instance("amqp://guest:guest@localhost:5672/").createBroker<{summary: string}>("entities");
    await broker.init();
    const result = await broker.call("identify", { text: "I was with Taylor Swift the other day" });
    console.log(result)
}

async function main () {
    const broker = new Instance("amqp://guest:guest@localhost:5672/").createBroker<{summary: string}>("entities");
    await broker.init();
    const result = await broker.call("identify", { text: "I was with Taylor Swift the other day" });
    console.log(result)

    second()
}

main();