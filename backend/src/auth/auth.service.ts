import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { User } from 'src/entities/user.entity';
import { SignInDto } from 'src/common/dto/sign-in.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async validateUser({ username, password }: SignInDto): Promise<User | null> {
    const user = await this.userRepository.findOne({ username });

    if (!user) {
      return null;
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  signUser(user: User) {
    const { username, uuid } = user;

    const payload = { username, sub: uuid };

    return {
      username,
      token: this.jwtService.sign(payload),
    };
  }
}
