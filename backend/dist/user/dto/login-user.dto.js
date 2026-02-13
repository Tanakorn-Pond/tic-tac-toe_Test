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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserDto = void 0;
const class_validator_1 = require("class-validator");
class LoginUserDto {
    username;
    password;
}
exports.LoginUserDto = LoginUserDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'ชื่อผู้ใช้ต้องเป็นข้อความ' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'กรุณากรอกชื่อผู้ใช้' }),
    (0, class_validator_1.MaxLength)(50, { message: 'ชื่อผู้ใช้ต้องไม่เกิน 50 ตัวอักษร' }),
    __metadata("design:type", String)
], LoginUserDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'รหัสผ่านต้องเป็นข้อความ' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'กรุณากรอกรหัสผ่าน' }),
    (0, class_validator_1.MinLength)(6, { message: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร' }),
    (0, class_validator_1.MaxLength)(100, { message: 'รหัสผ่านต้องไม่เกิน 100 ตัวอักษร' }),
    __metadata("design:type", String)
], LoginUserDto.prototype, "password", void 0);
//# sourceMappingURL=login-user.dto.js.map