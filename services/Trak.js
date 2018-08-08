/**
 * Created by Nazimov Andrey.
 * Date: 8/8/18
 * Time: 10:16 AM
 */
import {AsyncStorage} from 'react-native'

export default class Trak {
    api = null;

    constructor(api) {
        this.api = api;
    }

    /**
     * Add Trak result
     * @param data
     * @returns {Promise.<*>}
     */
    async addResult(data) {
        // {
        //     date: String YYYY-MM-DD,
        //     type: 'device',
        //     value: double
        // }

        const userToken = await AsyncStorage.getItem('userToken');
        this.api.setHeader('Access-Token', userToken);

        return await  this.api.post('/trak', data);
    }

    async getResultList() {
        const userToken = await AsyncStorage.getItem('userToken');
        this.api.setHeader('Access-Token', userToken);

        return await  this.api.get('/trak');
    }

    async deleteResultItem(id) {
        const userToken = await AsyncStorage.getItem('userToken');
        this.api.setHeader('Access-Token', userToken);

        return await  this.api.delete('/trak', {id});
    }


}