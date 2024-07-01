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
exports.MongoProductosRepository = void 0;
const productos_1 = require("../../domain/productos");
const mongoose_1 = __importStar(require("mongoose"));
const productosSchema = new mongoose_1.Schema({
    nombre: { type: String, required: true },
    precio: { type: String, required: true },
    cantidad: { type: String, required: true },
});
const ProductosModel = mongoose_1.default.model('Producto', productosSchema);
class MongoProductosRepository {
    constructor() {
        this.productosModel = ProductosModel;
    }
    save(producto) {
        return __awaiter(this, void 0, void 0, function* () {
            const productosModel = new this.productosModel(producto);
            const savedProducto = yield productosModel.save();
            return new productos_1.Productos(savedProducto._id.toString(), savedProducto.nombre, savedProducto.precio, savedProducto.cantidad);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const producto = yield this.productosModel.findById(id);
            if (!producto)
                return null;
            return new productos_1.Productos(producto._id.toString(), producto.nombre, producto.precio, producto.cantidad);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const productos = yield this.productosModel.find();
            return productos.map(producto => new productos_1.Productos(producto._id.toString(), producto.nombre, producto.precio, producto.cantidad));
        });
    }
    update(producto) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedProducto = yield this.productosModel.findByIdAndUpdate(producto.id, producto, { new: true });
            if (!updatedProducto)
                return null;
            return new productos_1.Productos(updatedProducto._id.toString(), updatedProducto.nombre, updatedProducto.precio, updatedProducto.cantidad);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productosModel.findByIdAndDelete(id);
        });
    }
}
exports.MongoProductosRepository = MongoProductosRepository;
