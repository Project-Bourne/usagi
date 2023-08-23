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
        this.timeout(15000);
        const broker = instance.createBroker<EntitiesResult>("entities");
        await broker.init();
        const result = await broker.call("identify", { text: "I was with Taylor Swift the other day" });
        expect(result).toBeDefined();
    });

    it("returns entities", async function () {
        this.timeout(15000);
        const broker = instance.createBroker<EntitiesResult>("entities");
        await broker.init();
        const result = await broker.call("identify", { text: "I was with Taylor Swift the other day" });
        expect(result).toBeDefined();
        expect(result.entities).toBeDefined();
        expect(result.entities["Taylor Swift"]).toBeDefined();
        expect(result.entities["Taylor Swift"].image.image_src).toBeDefined();
    })

    after(() => {
        instance.teardown();
    })
})