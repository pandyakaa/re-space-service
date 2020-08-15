import { UserRepository } from 'repositories/user';
import { sign as signJwt } from 'jsonwebtoken';
import { User } from '../entities/user';

export class UserService {
    /**
     * @description Create an instance of UserService
     */
    constructor(private userRepository: UserRepository) {
        // Create instance of Data Access layer using our desired model
    }

    /**
     * @description Attempt to create a user with the provided object
     * @param userToCreate {object} Object containing user credentials
     */
    async registerUser(userToCreate: Partial<User>): Promise<User> {
        let user = this.userRepository.create(userToCreate);
        user = await this.userRepository.insertUser(user);
        return user;
    }

    /**
     * @description Attempt to authenticate user and return JWT
     * @param authenticateUser {object} Object containing user credentials
     */
    async authenticateUser(userCredentials: Partial<User>): Promise<User[]> {
        // Check user credentials with database
        const user = await this.userRepository.findByQuery(userCredentials);
        return user;
    }

    generateAccessToken(credentials: string): string {
        // expires in 24 hours
        return signJwt(credentials, process.env.TOKEN_SECRET, { expiresIn: '24h' });
    }

    async getUserById(userId: string): Promise<User> {
        const user = await this.userRepository.findOne({
            id: userId
        });

        return user;
    }
}
