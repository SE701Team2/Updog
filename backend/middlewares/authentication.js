import * as jwt from 'jsonwebtoken'

export class Authentication {

    //TODO: in ../config/config.js, readFileSync(file with privateKey) ?
    static privateKey() {
        return 'PRIVATE_KEY';
    }

    static generateAuthToken(user) {
        try {
            const authToken = jwt.sign({
                data: JSON.stringify(user)
            }, this.privateKey(), { expiresIn: '1d' });
            return authToken;
        } catch (error) {
            throw error
        }
    }

    static extractUser(authToken) {
        try {
            const decoded = jwt.verify(authToken, this.privateKey());
            return JSON.parse(decoded.data);
        } catch (error) {
            throw error
        }
    }
}