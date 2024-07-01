"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.MongoAlmacenRepository = void 0;
const almacen_1 = require("../../domain/almacen");
const mongoose_1 = __importStar(require("mongoose"));
const almacenSchema = new mongoose_1.Schema({
    nombre: { type: String, required: true },
    piezas: { type: String, required: true },
});
const AlmacenModel = mongoose_1.default.model('Almacen', almacenSchema);
class MongoAlmacenRepository {
    constructor() {
        this.almacenModel = AlmacenModel;
    }
    save(almacen) {
        return __awaiter(this, void 0, void 0, function* () {
            const almacenModel = new this.almacenModel(almacen);
            const savedAlmacen = yield almacenModel.save();
            return new almacen_1.Almacen(savedAlmacen._id.toString(), savedAlmacen.nombre, savedAlmacen.piezas);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const almacen = yield this.almacenModel.findById(id);
            if (!almacen)
                return null;
            return new almacen_1.Almacen(almacen._id.toString(), almacen.nombre, almacen.piezas);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const almacenes = yield this.almacenModel.find();
            return almacenes.map(almacen => new almacen_1.Almacen(almacen._id.toString(), almacen.nombre, almacen.piezas));
        });
    }
    update(almacen) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedAlmacen = yield this.almacenModel.findByIdAndUpdate(almacen.id, almacen, { new: true });
            if (!updatedAlmacen)
                return null;
            return new almacen_1.Almacen(updatedAlmacen._id.toString(), updatedAlmacen.nombre, updatedAlmacen.piezas);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.almacenModel.findByIdAndDelete(id);
        });
    }
}
exports.MongoAlmacenRepository = MongoAlmacenRepository;
