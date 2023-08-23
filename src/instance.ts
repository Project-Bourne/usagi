import { Broker } from "./broker";

export class Instance {
    private brokers: Broker<any>[] = [];

    constructor(private connectionString: string) {}

    createBroker<T>(module: string): Broker<T> {
        const broker = new Broker<T>(this.connectionString, module);
        this.brokers.push(broker);
        return broker
    }

    teardown() {
        this.brokers.forEach(broker => broker.teardown());
    }
}