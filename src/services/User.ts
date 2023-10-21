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

const CheckUser = async (Data: any) => {
    try {
      const data = await fs.readFile(database, "utf-8");
      const jsonData = JSON.parse(data);
      const response = jsonData.some(
        (User: { username: string }) => User.username === Data
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };


  const FindTechnologies = async (Data: string) => {
    try {
      const data = await fs.readFile(database, "utf-8");
      const jsonData = JSON.parse(data);
      const user = jsonData.find(
        (user: { username: string }) => user.username === Data
      );
      return user.technologies;
    } catch (error) {
      console.log(error);
    }
  };

  const SaveTechonolgy = async (Data: {}, User: string) => {
    try {
      const data = await fs.readFile(database, "utf-8");
      const jsonData = JSON.parse(data);
      const user = jsonData.find(
        (user: { username: string }) => user.username === User
      );
      user.technologies.push(Data);
      fs.writeFile(database, JSON.stringify(jsonData));
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  
const UpdateTechnology = async (
    Data: { title: string; deadline: Date },
    Id: string,
    User: string
  ) => {
    try {
      const data = await fs.readFile(database, "utf-8");
      const jsonData = JSON.parse(data);
      const user = jsonData.find(
        (user: { username: string }) => user.username === User
      );
      const technology = user.technologies;
      technology.map((element: { id: string; title: string; deadline: Date }) => {
        if (element.id === Id) {
          element.title = Data.title;
          element.deadline = Data.deadline;
        }
      });
      await fs.writeFile(database, JSON.stringify(jsonData));
      return user;
    } catch (error) {
      console.log(error);
    }
  };

export default {
    SaveUser,
    CheckUser,
    FindTechnologies,
    SaveTechonolgy,
    UpdateTechnology,
}