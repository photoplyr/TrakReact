/**
 * Created by Nazimov Andrey.
 * Date: 7/9/18
 * Time: 3:39 PM
 */

export default class Auth {
    api = null;

    constructor(api) {
        this.api = api;
    }

    async signIn(email, password, uuid) {
        const response = await  this.api.post('/signin', {email, password, uuid})
        return response
    }


    async signUp(firstName, lastName, email, password, postal, type, uuid, trialId) {
        const response = await  this.api.post('/signup', {
            first_name: firstName,
            last_name: lastName,
            email,
            password,
            postal,
            type,
            uuid,
            trial_id: trialId
        })
        return response
    }

    /**
     * Reset password
     * @param email
     * @returns {Promise<ApiResponse<any>>}
     */
    async recoverPwd(email) {
        const response = await  this.api.post('/reset', {email})
        return response
    }

}