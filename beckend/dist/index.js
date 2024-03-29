import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
//connections and listeners
const port = process.env.PORT || 5000;
connectToDatabase()
    .then(() => {
    app.listen(5000, () => console.log("server initiated & connected to database"));
})
    .catch((error) => {
    console.log(error);
});
//# sourceMappingURL=index.js.map