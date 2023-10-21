import { promises as fs } from "fs";
import path from "path";
const database = path.join(__dirname, "..", "database", "db.json");

const SaveUser = async (Data: {}) => {
  try {
    const data = await fs.readFile(database, "utf-8");
    const jsonData = JSON.parse(data);
    jsonData.push(Data);
    fs.writeFile(database, JSON.stringify(jsonData));
  } catch (error) {
    console.log(error);
  }
};

export default SaveUser;