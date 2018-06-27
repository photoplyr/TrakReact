// @flow
import {Asset} from "expo";

const logo = require("../../assets/images/app.png");

export default class Images {

    static logo = logo;

    static downloadAsync(): Promise<*>[] {
        return [
            Asset.loadAsync(Images.logo)
        ];
    }
}
