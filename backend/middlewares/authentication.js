const jwt = require('jsonwebtoken');

export class Authentication {

    //TODO: in ../config/config.js, readFileSync(file with privateKey) ?
    static privateKey() {
        return 'PRIVATE_KEY';
    }

    static generateAuthToken(user) {
        try {
            const authToken = jwt.sign({"data": JSON.stringify(user)}, this.privateKey(), { 
                expiresIn: '1d',
                algorithm: 'HS256'
            });
            return authToken;
        } catch (error) {
            throw error
        }
    }

    static extractUser(authToken) {
        try {
            // sent by frontend as 'Bearer <token>'
            if (authToken.startsWith("Bearer ")) {
                const splitToken = authToken.split(" ");
                const decoded = jwt.verify(splitToken[1], this.privateKey());
                return JSON.parse(decoded.data);
            } else {
                throw new Error("Authorization header was not Bearer")
            }
            
        } catch (error) {
            throw error
        }
    }
}
