"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Serve static files from the 'public' directory
app.use(express_1.default.static(path_1.default.resolve(__dirname, '../public')));
const port = process.env.PORT || 3030;
// API route
app.use('/api/msg', (req, res) => {
    res.json({ message: "Server is up! ✨" });
});
// Serve index.html for all other routes
app.get('/*', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, '../public/index.html'));
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
