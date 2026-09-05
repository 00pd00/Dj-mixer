import { connectDB } from "./db/db.js";
import { deployPipeline } from "./utils/pipelineStatusUpdate.js";

connectDB()

deployPipeline(123,"68f0e258f8c2f230a7e24525",456,"success");