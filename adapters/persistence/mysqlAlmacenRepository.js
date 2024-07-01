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
exports.MysqlAlmacenRepository = void 0;
const almacen_1 = require("../../domain/almacen");
class MysqlAlmacenRepository {
    constructor(connection) {
        this.connection = connection;
    }
    save(almacen) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield this.connection.execute('INSERT INTO almacenes (nombre, piezas) VALUES (?, ?)', [almacen.nombre, almacen.piezas]);
            const insertId = result.insertId;
            return new almacen_1.Almacen(insertId.toString(), almacen.nombre, almacen.piezas);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield this.connection.execute('SELECT * FROM almacenes WHERE id = ?', [id]);
            const almacenes = rows;
            if (almacenes.length === 0)
                return null;
            const almacen = almacenes[0];
            return new almacen_1.Almacen(almacen.id.toString(), almacen.nombre, almacen.piezas);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield this.connection.execute('SELECT * FROM almacenes');
            const almacenes = rows;
            return almacenes.map(almacen => new almacen_1.Almacen(almacen.id.toString(), almacen.nombre, almacen.piezas));
        });
    }
    update(almacen) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.execute('UPDATE almacenes SET nombre = ?, piezas = ? WHERE id = ?', [almacen.nombre, almacen.piezas, almacen.id]);
            return almacen;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.execute('DELETE FROM almacenes WHERE id = ?', [id]);
        });
    }
}
exports.MysqlAlmacenRepository = MysqlAlmacenRepository;
