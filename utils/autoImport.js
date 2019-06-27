const path = require('path');
const fs = require('fs');

const autoImport = (app) => {
  const relativePath = '../routes/api';
  const routeDir = path.join(__dirname, relativePath);
  let routers = fs.readdirSync(routeDir);

  console.log(routers);

  routers.forEach(routePath => {
    if (routePath != path.join(__dirname, 'index.js')) {
      const absolutePath = path.join(__dirname, relativePath, routePath);
      console.log(absolutePath);
      require(absolutePath)(app);
      // const indexOfDot = routePath.lastIndexOf('.');
      // const module = require(absolutePath);
      // app.use('/api/' + routePath.slice(0, indexOfDot) + '/', module);
      // console.log('/api/' + routePath.slice(0, indexOfDot))
    }
  });
}

module.exports = autoImport;