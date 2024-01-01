import { Int } from "./Int";

export class FixedSizedQueue<T> {
    /**
     * Fixed size FIFO
     * Removes the oldest entry when a new value is added beyond its limit
     *
     * @remarks Removes the oldest entry when a new value is added
     * */
    private data: Array<T>;
    private maxSize: Int;

    constructor(maxSize: Int){
        this.maxSize = maxSize;
        this.data = new Array<T>(maxSize);
    }

    public enqueue(item: T): void {
        if (this.data.length >= this.maxSize) {
            this.dequeue();
        }

        this.data.push(item);
    }

    public size() : number {
        return this.data.length;
    }

    public getAll() : T[] {
        return this.data.slice();
    }

    public emptyQueue() {
        this.data = new Array<T>(this.maxSize);
    }

    private dequeue(): T | undefined {
        return this.data.shift();
    }
}
