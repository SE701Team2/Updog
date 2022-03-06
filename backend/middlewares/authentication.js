import models from '../database/models'
import * as crypto from 'crypto'

export class Authentication {

    static generateAuthToken(username, password) {
        try {
            const hashInput = username + password;
            const hash = crypto.createHash('sha256');
            hash.update(hashInput);
            const authToken = hash.digest('hex');
            return authToken;
        } catch (error) {
            throw new Error("Unexpected error generating auth token\n" + error)
        }
    }

    static async extractUser(authToken) {
        // const users = await models.users.findAll();
        // for (let user in users) {
        //     if (authToken === this.generateAuthToken(user)) {
        //         return user;
        //     }
        // }
        /** Instead, find by authToken field */
        try {
            const user =  await models.users.findOne({ where: { authToken: authToken } });
            return user;
        } catch (error) {
            throw new Error("Could not find user from this auth token\n" + error)
        }
    }
}