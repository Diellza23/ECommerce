import { json } from "body-parser";
import fs from "fs";

export default {
  collection: (collectionName) => {
    const dbDirname = `${__dirname}/../dbdocuments/${collectionName}/`;
    return {
      findOne: (id) => {
        const filenames = fs.readdirSync(dbDirname, "utf-8");
        const filename = filenames.find(
          (filename) => filename === `${id}.json`
        );
        const content = fs.readFileSync(dbDirname + filename, "utf-8");
        return JSON.parse(content);
      },

      list: () => {
        const filenames = fs.readdirSync(dbDirname, "utf-8");

        return filenames.map((filename) => {
          try {
            const content = fs.readFileSync(dbDirname + filename, "utf-8");
            return JSON.parse(content);
          } catch (err) {
            return json.toString("fail");
            // .status(500)
            // .json({ error: err, message: "Failed to list users" });
          }
        });
      },
      create: (vueshop) => {
        const filenames = fs.readdirSync(dbDirname, "utf-8");

        const ids = filenames.map((filename) => {
          const idAsStr = filename.replace(".json", "");

          return parseInt(idAsStr, 10);
        });

        const nextId = Math.max(...ids) + 1;
        const newVueshop = { ...vueshop, id: nextId };

        fs.writeFileSync(`${dbDirname}/${nextId}`, JSON.stringify(newVueshop));
        return newVueshop;
      },
      update: (updatedVueshop) => {
        const oldVersionFilename = `${updatedVueshop.id}.json`;

        const filepath = dbDirname + oldVersionFilename;

        const contentAsString = fs.readFileSync(filepath);

        const oldVueshop = JSON.parse(contentAsString);

        const updatedVersion = { ...oldVueshop, ...updatedVueshop };

        fs.writeFileSync(filepath, JSON.stringify(updatedVersion));

        return updatedVersion;
      },
    };
  },
};
