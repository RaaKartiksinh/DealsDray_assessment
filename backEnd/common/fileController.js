const generateRandomString = require("./randomStringSenerate");

// module.exports = FileUpload;
const path = require("path");
const fs = require("fs");

const FileUpload = (File) => {
  let extantion = File.name.split(".").pop();
  let fileName = generateRandomString(10);
  let dir = File.mimetype.split("/")[0];
  dir =
    dir === "image" || dir === "video" || dir === "audio" ? dir : "document";
  fileName += `.${extantion}`;
  // let fullPath = path.join(__dirname, "Uploads", dir, fileName);
  let fullPath = `./Uploads/${dir}/${fileName}`;

  if (!fs.existsSync(path.dirname(fullPath))) {
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  }

  File.mv(fullPath);
  return {
    name: fileName,
    extantion,
    fullPath: fullPath.substring(1),
    mimetype: dir,
    fileSize: File.size,
  };
};

module.exports = FileUpload;
