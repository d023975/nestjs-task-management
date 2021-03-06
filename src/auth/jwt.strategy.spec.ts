import {JwtStrategy} from './jwt.strategy';
import {Test} from '@nestjs/testing';
import {UserRepository} from './user.repository';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';

const mockUserRepository = () => ({
    findOne: jest.fn(),
}); 

describe('JwtStrategy',()=>{ 
    let jwtStrategy: JwtStrategy; 
    let userRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                JwtStrategy,
                {provide: UserRepository, useFactory: mockUserRepository },
            ]
        }).compile();




      jwtStrategy = await  module.get<JwtStrategy>(JwtStrategy);
      userRepository = await module.get<UserRepository>(UserRepository);



    });

    describe('validate', () => {
        it ('validate and returns user based on JWT payload', async () => {
            const user = new User();
            user.username = 'TestUser';

            userRepository.findOne.mockResolvedValue(user);
            const result = await jwtStrategy.validate({ username: 'TestUser'})

            expect(userRepository.findOne).toHaveBeenCalledWith({username: 'TestUser'});
            expect(result).toEqual(user);
        });
    });





});