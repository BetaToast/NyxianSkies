module NyxianSkies {
    export class Sequence {
        static value: number = 0;
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