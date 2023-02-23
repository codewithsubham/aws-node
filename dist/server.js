import express from 'express';
import fs from "fs";
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let app = express();
app.use(bodyParser.raw({ type: 'application/octet-stream' }));
app.use(express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.send("asdasd");
});
app.post('/checkmetadata', (req, res) => {
    let { filename } = req.body;
    console.log(filename);
    fs.stat(filename, (error, stats) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log(`Created: ${stats.birthtime}`);
        console.log(`Modified: ${stats.mtime}`);
        console.log(`Permissions: ${stats.mode}`);
        res.json({
            success: true,
            size: stats.size
        });
    });
});
app.post("/upload", (req, res) => {
    let filename = req.headers.name;
    console.log({ filename });
    fs.appendFile(filename, req.body, (err) => {
        console.log(err);
    });
    //res.send('ArrayBuffer received');
    res.send("hi");
});
app.listen(8080, () => {
    console.log("starteds");
});
