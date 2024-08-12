const express = require("express")
const path = require("path")

const app = express()
const port = 80

app.use(express.static(path.join(__dirname, "./build")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./build/index.html"))
})

app.listen(port, () => {
    console.log(`${port}번 포트에서 Client Page 실행`)
})

