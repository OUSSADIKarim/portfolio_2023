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
const userRoutes_1 = require("./routes/userRoutes");
const helmet_1 = __importDefault(require("helmet"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
db_1.default.dbOnDisconnect();
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
app.use("/users", userRoutes_1.userRouter);
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
