import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsString({ message: 'ชื่อผู้ใช้ต้องเป็นข้อความ' })
  @IsNotEmpty({ message: 'กรุณากรอกชื่อผู้ใช้' })
  @MaxLength(50, { message: 'ชื่อผู้ใช้ต้องไม่เกิน 50 ตัวอักษร' })
  username: string;

  @IsString({ message: 'รหัสผ่านต้องเป็นข้อความ' })
  @IsNotEmpty({ message: 'กรุณากรอกรหัสผ่าน' })
  @MinLength(6, { message: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร' })
  @MaxLength(100, { message: 'รหัสผ่านต้องไม่เกิน 100 ตัวอักษร' })
  password: string;
}
