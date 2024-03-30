import exppress from "express"
import { readFileSync } from "fs"
import path, {dirname} from "path"
import { fileURLToPath } from "url"

const port = 3000
const app = exppress()
const root_dir = dirname(fileURLToPath(import.meta.url))



app.use(exppress.static(root_dir))


app.get("*", (req, res) => {
    res.sendFile(path.join(root_dir, "index.html"))
})


app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})