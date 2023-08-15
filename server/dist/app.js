"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const erroHandler_1 = require("./middlewares/erroHandler");
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = __importDefault(require("./config/config"));
const v1_1 = require("./api/v1/v1");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = config_1.default.PORT;
db_1.default.dbOnDisconnect();
if (config_1.default.ENABLE_MORGAN === "true") {
    app.use((0, morgan_1.default)("dev"));
}
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        const whiteList = ["http://localhost:5173"];
        if (whiteList.indexOf(`${origin}`) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS."));
        }
    },
    optionsSuccessStatus: 204,
    credentials: true,
}));
// app.use(csurf({ cookie: { httpOnly: true } }))
app.use("/api/v1", v1_1.v1Router);
app.use(erroHandler_1.erroHandler);
app.listen(PORT, () => {
    try {
        db_1.default.dbConnection();
        console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    }
    catch (error) {
        console.error(`Error starting the server: ${error}`);
    }
});
