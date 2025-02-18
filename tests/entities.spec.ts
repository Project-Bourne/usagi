import { Instance } from "../src";
import expect from "expect";

type EntitiesResult = {
    entities: {[key: string]: {
        image: {
            image_src: string
            image_page_url: string
            filename: string
        },
        summary: string
    }}
}

describe("Entities", () => {
    let instance = new Instance("amqp://guest:guest@localhost:5672/")

    it("can create broker", () => {
        const broker = instance.createBroker("entities");
        expect(broker).toBeDefined();
    });

    it("can call broker", async function() {
        const broker = instance.createBroker<EntitiesResult>("entities");
        await broker.init();
        const result = await broker.call("identify", { text: "I was with Taylor Swift the other day" });
        expect(result).toBeDefined();
    });

    it("returns entities", async function () {
        const broker = instance.createBroker("entities");
        await broker.init();
        const result = await broker.call<EntitiesResult>("identify", { text: "I was with Barack Obama and Taylor Swift the other day" });
        expect(result).toBeDefined();
        expect(result.entities).toBeDefined();
        expect(result.entities["Barack Obama"]).toBeDefined();
        expect(result.entities["Taylor Swift"]).toBeDefined();
    })

    after(() => {
        instance.teardown();
    })
})
