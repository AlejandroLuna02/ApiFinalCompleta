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
exports.AlmacenController = void 0;
class AlmacenController {
    constructor(almacenService) {
        this.almacenService = almacenService;
    }
    createAlmacen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const almacen = req.body;
            const createdAlmacen = yield this.almacenService.createAlmacen(almacen);
            return res.status(201).json(createdAlmacen);
        });
    }
    getAlmacen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const almacen = yield this.almacenService.getAlmacen(id);
            return res.status(200).json(almacen);
        });
    }
    updateAlmacen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const almacen = req.body;
            const updatedAlmacen = yield this.almacenService.updateAlmacen(id, almacen);
            return res.status(200).json(updatedAlmacen);
        });
    }
    deleteAlmacen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield this.almacenService.deleteAlmacen(id);
            return res.status(204).send();
        });
    }
}
exports.AlmacenController = AlmacenController;
