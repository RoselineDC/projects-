"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const Users_1 = __importDefault(require("./routes/Users"));
const auth_1 = __importDefault(require("./routes/auth"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
// connect to mongodb
mongoose_1.default.connect(process.env.MONGODB_CONNECTION_STRING);
// create express app	
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
// access frontend in the backend 
app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend/dist")));
// check user router
app.use("/api/auth", auth_1.default);
app.use("/api/users", Users_1.default);
// start the Express server
app.listen(8000, () => {
    console.log("Server is running on port: 8000");
});
