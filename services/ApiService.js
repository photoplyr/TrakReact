/**
 * Created by Nazimov Andrey.
 * Date: 7/6/18
 * Time: 12:07 PM
 */

import {create} from 'apisauce'
import Auth from './Auth'
import Trak from './Trak'

export default class ApiService {
    api = null;

    constructor() {
        // define the api
        this.api = create({
            baseURL: 'https://trakfertility.tools/api',
            headers: {'Accept': 'application/json'}
        })
    }

    Auth() {
        return new Auth(this.api);
    }

    Trak() {
        return new Trak(this.api);
    }
}
