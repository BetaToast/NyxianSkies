module NyxianSkies {
    export class BGDetail {
        x: number;
        y: number;
        asset: string;

        clone(deDetail): BGDetail {
            var ret = new BGDetail();

            ret.x = deDetail.X;
            ret.y = deDetail.Y;
            ret.asset = deDetail.Asset;

            return ret;
        }
    }
}    