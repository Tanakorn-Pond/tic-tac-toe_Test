"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UserService = class UserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async register(registerUserDto) {
        const { username, password, confirmPassword } = registerUserDto;
        if (password !== confirmPassword) {
            throw new common_1.BadRequestException('รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน');
        }
        const existingUser = await this.userRepository.findOne({
            where: { userName: username },
        });
        if (existingUser) {
            throw new common_1.ConflictException('ชื่อผู้ใช้นี้ถูกใช้งานแล้ว');
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
    async login(loginUserDto) {
        const { username, password } = loginUserDto;
        const user = await this.userRepository.findOne({
            where: { userName: username },
        });
        if (!user || user.userPassword !== password) {
            throw new common_1.UnauthorizedException('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        }
        return {
            message: 'เข้าสู่ระบบสำเร็จ',
            user: {
                userId: user.userId,
                username: user.userName,
            },
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map