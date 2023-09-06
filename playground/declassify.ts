import { Instance } from "../src";

const instance = new Instance("amqp://guest:guest@localhost:5672/")

async function reclassify(replaced: any) {
    const broker = instance.createBroker("declassifier")
    await broker.init();

    const r = await broker.call("reclassification", {
        text: "I saw Obama and Taylor Swift the other day",
        replaced_words: replaced
    });
    
    console.log(r)
}

async function main() {
    const broker = instance.createBroker("declassifier")
    await broker.init();

    const result = await broker.call<any>("declassification", {
        text: "I saw Obama and Taylor Swift the other day"
    })

    console.log(result)

    await reclassify(result.replaced_words)
    instance.teardown();
}

main()