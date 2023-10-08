import {AuthApi} from "./auth.api";
import {InformationApi} from "./information.api";
import {ImageApi} from "./image.api";
import {GameApi} from "./game.api";
import {OrderApi} from "./order.api";
import {ProjectApi} from "./project.api";
import {UserApi} from "./user.api";
import {PropertyApi} from "./property.api";

export class Api {

    static auth = AuthApi;
    static game = GameApi;
    static image = ImageApi;
    static information = InformationApi;
    static order = OrderApi;
    static project = ProjectApi;
    static user = UserApi;
    static property = PropertyApi;
}