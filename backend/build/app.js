"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
//initializations
const app = express_1.default();
dotenv_1.default.config();
//config
app.set('port', process.env.PORT || 3666);
//middlewares
app.use(morgan_1.default('dev'));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
//routes
app.use(require('./routes/'));
//static files
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
exports.default = app;
//# sourceMappingURL=app.js.map