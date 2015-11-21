module Utils {
    export class Queue {
        public queue: QueueObject[] = [];
        private offset = 0;

        public getLenth(): number {
            return (this.queue.length - this.offset);
        }
        public isEmpty(): Boolean {
            return (this.queue.length == 0);
        }
        public enqueue(item: QueueObject) {
            console.log(item);
            this.queue.push(item);
        }
        public dequeue(): QueueObject {
            if (this.isEmpty) return undefined;

            var item = this.queue[this.offset];

            //Reclaim space if we are half way through the queue
            if (++this.offset * 2 >= this.queue.length) {
                this.queue = this.queue.slice(this.offset);
                this.offset = 0;
            }
            return item;
        }
        public peek(): QueueObject {
            if (this.isEmpty) return undefined;
            return this.queue[this.offset];
        }
        public remove(index: number) {
            if (this.getLenth() <= index) return;
            this.queue.splice(index, 1);
        }
    }
    export class QueueObject {
        constructor(body: string) {
            this.time = Date.now();
            this.body = body;
        }
        public time: number;
        public body: string;
    }
}
