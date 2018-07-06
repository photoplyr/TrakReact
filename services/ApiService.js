/**
 * Created by Nazimov Andrey.
 * Date: 7/6/18
 * Time: 12:07 PM
 */
import {create} from 'apisauce'

export default class ApiService {

    api = null;

    constructor() {
        // define the api
        this.api = create({
            baseURL: 'http://13.57.223.188/api',
            headers: {'Accept': 'application/vnd.github.v3+json'}
        })
    }

    async signIn(email, password, uuid) {
        const response = await  this.api.post('/signin', {email, password, uuid})
        console.log(response)
        return response
    }

}