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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const multer_1 = __importDefault(require("multer"));
const database_1 = require("./config/database");
const database_2 = require("./config/database");
const userController_1 = require("./adapters/http/userController");
const vendedorController_1 = require("./adapters/http/vendedorController");
const appointmentController_1 = require("./adapters/http/appointmentController");
const ImageController_1 = require("./adapters/http/ImageController");
const mongoUserRepository_1 = require("./adapters/persistence/mongoUserRepository");
const mysqlUserRepository_1 = require("./adapters/persistence/mysqlUserRepository");
const mongoVendedorRepository_1 = require("./adapters/persistence/mongoVendedorRepository");
const mysqlVendedorRepository_1 = require("./adapters/persistence/mysqlVendedorRepository");
const mongoAppointmentRepository_1 = require("./adapters/persistence/mongoAppointmentRepository");
const mysqlAppointmentRepository_1 = require("./adapters/persistence/mysqlAppointmentRepository");
const S3StorageRepository_1 = require("./adapters/persistence/S3StorageRepository");
const userService_1 = require("./application/userService");
const vendedorService_1 = require("./application/vendedorService");
const appointmentService_1 = require("./application/appointmentService");
const ImageService_1 = require("./application/ImageService");
const mongoProductosRepository_1 = require("./adapters/persistence/mongoProductosRepository");
const mongoAlmacenRepository_1 = require("./adapters/persistence/mongoAlmacenRepository");
const mysqlProductosRepository_1 = require("./adapters/persistence/mysqlProductosRepository");
const mysqlAlmacenRepository_1 = require("./adapters/persistence/mysqlAlmacenRepository");
const productosService_1 = require("./application/productosService");
const almacenService_1 = require("./application/almacenService");
const productosController_1 = require("./adapters/http/productosController");
const almacenController_1 = require("./adapters/http/almacenController");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const upload = (0, multer_1.default)();
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        // Conectar a MongoDB
        yield (0, database_1.connectToMongo)();
        const mongoUserRepository = new mongoUserRepository_1.MongoUserRepository();
        const mongoUserService = new userService_1.UserService(mongoUserRepository);
        const mongoUserController = new userController_1.UserController(mongoUserService);
        const mongoVendedorRepository = new mongoVendedorRepository_1.MongoVendedorRepository();
        const mongoVendedorService = new vendedorService_1.VendedorService(mongoVendedorRepository);
        const mongoVendedorController = new vendedorController_1.VendedorController(mongoVendedorService);
        const mongoAppointmentRepository = new mongoAppointmentRepository_1.MongoAppointmentRepository();
        const mongoAppointmentService = new appointmentService_1.AppointmentService(mongoAppointmentRepository);
        const mongoAppointmentController = new appointmentController_1.AppointmentController(mongoAppointmentService);
        const mongoProductosRepository = new mongoProductosRepository_1.MongoProductosRepository();
        const mongoProductosService = new productosService_1.ProductosService(mongoProductosRepository);
        const mongoProductosController = new productosController_1.ProductosController(mongoProductosService);
        const mongoAlmacenRepository = new mongoAlmacenRepository_1.MongoAlmacenRepository();
        const mongoAlmacenService = new almacenService_1.AlmacenService(mongoAlmacenRepository);
        const mongoAlmacenController = new almacenController_1.AlmacenController(mongoAlmacenService);
        // Conectar a MySQL
        const mysqlConnection = yield (0, database_2.connectToMySQL)();
        const mysqlUserRepository = new mysqlUserRepository_1.MysqlUserRepository(mysqlConnection);
        const mysqlUserService = new userService_1.UserService(mysqlUserRepository);
        const mysqlUserController = new userController_1.UserController(mysqlUserService);
        const mysqlVendedorRepository = new mysqlVendedorRepository_1.MysqlVendedorRepository(mysqlConnection);
        const mysqlVendedorService = new vendedorService_1.VendedorService(mysqlVendedorRepository);
        const mysqlVendedorController = new vendedorController_1.VendedorController(mysqlVendedorService);
        const mysqlAppointmentRepository = new mysqlAppointmentRepository_1.MysqlAppointmentRepository(mysqlConnection);
        const mysqlAppointmentService = new appointmentService_1.AppointmentService(mysqlAppointmentRepository);
        const mysqlAppointmentController = new appointmentController_1.AppointmentController(mysqlAppointmentService);
        const mysqlProductosRepository = new mysqlProductosRepository_1.MysqlProductosRepository(mysqlConnection);
        const mysqlProductosService = new productosService_1.ProductosService(mysqlProductosRepository);
        const mysqlProductosController = new productosController_1.ProductosController(mysqlProductosService);
        const mysqlAlmacenRepository = new mysqlAlmacenRepository_1.MysqlAlmacenRepository(mysqlConnection);
        const mysqlAlmacenService = new almacenService_1.AlmacenService(mysqlAlmacenRepository);
        const mysqlAlmacenController = new almacenController_1.AlmacenController(mysqlAlmacenService);
        // Repositorio de almacenamiento S3
        const s3StorageRepository = new S3StorageRepository_1.S3StorageRepository();
        const imageService = new ImageService_1.ImageService(s3StorageRepository);
        const imageController = new ImageController_1.ImageController(imageService);
        // Rutas para Usuarios (MongoDB y MySQL)
        app.post('/users/mongo', (req, res) => mongoUserController.createUser(req, res));
        app.get('/users/mongo/:id', (req, res) => mongoUserController.getUser(req, res));
        app.put('/users/mongo/:id', (req, res) => mongoUserController.updateUser(req, res));
        app.delete('/users/mongo/:id', (req, res) => mongoUserController.deleteUser(req, res));
        app.post('/users/mysql', (req, res) => mysqlUserController.createUser(req, res));
        app.get('/users/mysql/:id', (req, res) => mysqlUserController.getUser(req, res));
        app.put('/users/mysql/:id', (req, res) => mysqlUserController.updateUser(req, res));
        app.delete('/users/mysql/:id', (req, res) => mysqlUserController.deleteUser(req, res));
        // Rutas para Vendedores (MongoDB y MySQL)
        app.post('/vendedores/mongo', (req, res) => mongoVendedorController.createVendedor(req, res));
        app.get('/vendedores/mongo/:id', (req, res) => mongoVendedorController.getVendedor(req, res));
        app.put('/vendedores/mongo/:id', (req, res) => mongoVendedorController.updateVendedor(req, res));
        app.delete('/vendedores/mongo/:id', (req, res) => mongoVendedorController.deleteVendedor(req, res));
        app.post('/vendedores/mysql', (req, res) => mysqlVendedorController.createVendedor(req, res));
        app.get('/vendedores/mysql/:id', (req, res) => mysqlVendedorController.getVendedor(req, res));
        app.put('/vendedores/mysql/:id', (req, res) => mysqlVendedorController.updateVendedor(req, res));
        app.delete('/vendedores/mysql/:id', (req, res) => mysqlVendedorController.deleteVendedor(req, res));
        // Rutas para Citas (MongoDB y MySQL)
        app.post('/appointments/mongo', (req, res) => mongoAppointmentController.createAppointment(req, res));
        app.get('/appointments/mongo/:id', (req, res) => mongoAppointmentController.getAppointment(req, res));
        app.put('/appointments/mongo/:id', (req, res) => mongoAppointmentController.updateAppointment(req, res));
        app.delete('/appointments/mongo/:id', (req, res) => mongoAppointmentController.deleteAppointment(req, res));
        app.post('/appointments/mysql', (req, res) => mysqlAppointmentController.createAppointment(req, res));
        app.get('/appointments/mysql/:id', (req, res) => mysqlAppointmentController.getAppointment(req, res));
        app.put('/appointments/mysql/:id', (req, res) => mysqlAppointmentController.updateAppointment(req, res));
        app.delete('/appointments/mysql/:id', (req, res) => mysqlAppointmentController.deleteAppointment(req, res));
        // Rutas para Productos (MongoDB y MySQL)
        app.post('/productos/mongo', (req, res) => mongoProductosController.createProductos(req, res));
        app.get('/productos/mongo/:id', (req, res) => mongoProductosController.getProductos(req, res));
        app.put('/productos/mongo/:id', (req, res) => mongoProductosController.updateProductos(req, res));
        app.delete('/productos/mongo/:id', (req, res) => mongoProductosController.deleteProductos(req, res));
        app.post('/productos/mysql', (req, res) => mysqlProductosController.createProductos(req, res));
        app.get('/productos/mysql/:id', (req, res) => mysqlProductosController.getProductos(req, res));
        app.put('/productos/mysql/:id', (req, res) => mysqlProductosController.updateProductos(req, res));
        app.delete('/productos/mysql/:id', (req, res) => mysqlProductosController.deleteProductos(req, res));
        // Rutas para Almacen (MongoDB y MySQL)
        app.post('/almacen/mongo', (req, res) => mongoAlmacenController.createAlmacen(req, res));
        app.get('/almacen/mongo/:id', (req, res) => mongoAlmacenController.getAlmacen(req, res));
        app.put('/almacen/mongo/:id', (req, res) => mongoAlmacenController.updateAlmacen(req, res));
        app.delete('/almacen/mongo/:id', (req, res) => mongoAlmacenController.deleteAlmacen(req, res));
        app.post('/almacen/mysql', (req, res) => mysqlAlmacenController.createAlmacen(req, res));
        app.get('/almacen/mysql/:id', (req, res) => mysqlAlmacenController.getAlmacen(req, res));
        app.put('/almacen/mysql/:id', (req, res) => mysqlAlmacenController.updateAlmacen(req, res));
        app.delete('/almacen/mysql/:id', (req, res) => mysqlAlmacenController.deleteAlmacen(req, res));
        // Rutas para Imágenes
        app.post('/images/upload', upload.single('file'), (req, res) => imageController.uploadImage(req, res));
        app.delete('/images/:key', (req, res) => imageController.deleteImage(req, res));
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    });
}
startServer().catch(err => console.error(err));
