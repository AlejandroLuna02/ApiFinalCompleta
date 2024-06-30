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
exports.ProductosController = void 0;
class ProductosController {
    constructor(productosService) {
        this.productosService = productosService;
    }
    createProductos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const productos = req.body;
            const createdProductos = yield this.productosService.createProductos(productos);
            return res.status(201).json(createdProductos);
        });
    }
    getProductos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const productos = yield this.productosService.getProductos(id);
            return res.status(200).json(productos);
        });
    }
    updateProductos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const productos = req.body;
            const updatedProductos = yield this.productosService.updateProductos(id, productos);
            return res.status(200).json(updatedProductos);
        });
    }
    deleteProductos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield this.productosService.deleteProductos(id);
            return res.status(204).send();
        });
    }
}
exports.ProductosController = ProductosController;
