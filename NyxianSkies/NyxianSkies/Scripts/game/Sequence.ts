module NyxianSkies {
    export class Sequence {
        static value: number;
        static increment: number = 1;

        static Next() {
            this.value += this.increment;
            return this.value;
        }

        static Reset() {
            this.value = 0;
        }
    }
} 