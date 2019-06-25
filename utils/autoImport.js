const path = require('path');
const fs = require('fs');

module.exports = (app) => {
  const relativePath = '../routes/api';
  // Lấy đường dẫn thư mục
  const directoryPath = path.join(__dirname, relativePath);

  fs.readdir(directoryPath, (err, fileNames) => {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    fileNames.forEach((fileName) => {
      const fileDir = path.join(__dirname, relativePath, fileName);

      require(fileDir)(app);
    });
});
}

