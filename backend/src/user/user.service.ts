import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const { username, password, confirmPassword } = registerUserDto;

    if (password !== confirmPassword) {
      throw new BadRequestException('รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน');
    }

    const existingUser = await this.userRepository.findOne({
      where: { userName: username },
    });

    if (existingUser) {
      throw new ConflictException('ชื่อผู้ใช้นี้ถูกใช้งานแล้ว');
    }

    const user = this.userRepository.create({
      userName: username,
      userPassword: password,
    });

    const savedUser = await this.userRepository.save(user);

    return {
      message: 'สมัครสมาชิกสำเร็จ',
      user: {
        userId: savedUser.userId,
        username: savedUser.userName,
      },
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { userName: username },
    });

    if (!user || user.userPassword !== password) {
      throw new UnauthorizedException('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }

    return {
      message: 'เข้าสู่ระบบสำเร็จ',
      user: {
        userId: user.userId,
        username: user.userName,
      },
    };
  }
}
