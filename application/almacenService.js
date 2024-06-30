"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlmacenService = void 0;
class AlmacenService {
    constructor(almacenRepository) {
        this.almacenRepository = almacenRepository;
    }
    createAlmacen(almacen) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.almacenRepository.save(almacen);
        });
    }
    getAlmacen(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.almacenRepository.findById(id);
        });
    }
    updateAlmacen(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.almacenRepository.update(user);
        });
    }
    deleteAlmacen(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.almacenRepository.deleteById(id);
        });
    }
}
exports.AlmacenService = AlmacenService;
