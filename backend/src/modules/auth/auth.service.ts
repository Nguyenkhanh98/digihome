import { Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { UserEntity } from '@common/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AppException } from '@common/exceptions/app-exception';
import { USER_EXIST, WRONG_EMAIL_OR_PASSWORD } from '@common/exceptions/error';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async login(loginData: LoginDto) {
    const findUser: UserEntity = await this.validateUser(
      loginData.email,
      loginData.password,
    );
    return this.generateToken(findUser);
  }

  async register(registerData: RegisterDto) {
    const findUser = await this.userRepository.findOne({
      where: { email: registerData.email },
    });

    if (findUser) throw new AppException(USER_EXIST);

    const saveUser: UserEntity = this.userRepository.create({
      password: registerData.password,
      firstName: registerData.firstName,
      lastName: registerData.lastName,
      email: registerData.email,
    });

    return saveUser.save();
  }

  private async generateToken(user: UserEntity) {
    const payload = {
      sub: user.id,
      user,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      ),
    });

    return {
      accessToken,
      user,
    };
  }

  private async validateUser(email: string, password: string) {
    const findUser = await this.userRepository.findOne({
      where: { email: email },
    });
    if (!findUser || !(await bcrypt.compare(password, findUser.password)))
      throw new AppException(WRONG_EMAIL_OR_PASSWORD);
    return findUser;
  }
}
