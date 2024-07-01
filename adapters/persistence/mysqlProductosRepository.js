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
exports.MysqlProductosRepository = void 0;
const productos_1 = require("../../domain/productos");
class MysqlProductosRepository {
    constructor(connection) {
        this.connection = connection;
    }
    save(producto) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield this.connection.execute('INSERT INTO productos (nombre, precio, cantidad) VALUES (?, ?, ?)', [producto.nombre, producto.precio, producto.cantidad]);
            const insertId = result.insertId;
            return new productos_1.Productos(insertId.toString(), producto.nombre, producto.precio, producto.cantidad);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield this.connection.execute('SELECT * FROM productos WHERE id = ?', [id]);
            const productos = rows;
            if (productos.length === 0)
                return null;
            const producto = productos[0];
            return new productos_1.Productos(producto.id.toString(), producto.nombre, producto.precio, producto.cantidad);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield this.connection.execute('SELECT * FROM productos');
            const productos = rows;
            return productos.map(producto => new productos_1.Productos(producto.id.toString(), producto.nombre, producto.precio, producto.cantidad));
        });
    }
    update(producto) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.execute('UPDATE productos SET nombre = ?, precio = ?, cantidad = ? WHERE id = ?', [producto.nombre, producto.precio, producto.cantidad, producto.id]);
            return producto;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.execute('DELETE FROM productos WHERE id = ?', [id]);
        });
    }
}
exports.MysqlProductosRepository = MysqlProductosRepository;
