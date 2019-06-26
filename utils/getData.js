const axios = require('axios');

const accessKey = require('../config/accessKey').accessKey;
const Exchange = require('../models/Exchange');
const deepEqual = require('../utils/deepEqual');

const baseUrl = 'http://data.fixer.io/api';
// const timeUpdated = 15 * 60 * 1000; // ms
const timeUpdated = 1 * 1000; // ms


const getOldData = () => {
  return new Promise((resolve, reject) => {
    // Lấy dữ liệu mới nhất từ DB
    Exchange.findOne()
      .sort({ _id: -1 })
      .exec((error, data) => {
        if (error) {
          console.log('Can not get data: ', error.message);
          reject(error);
        }

        if (data === null) {
          resolve(null);
          return;
        }

        let oldData = {
          date: data.date,
          rates: data.rates
        }

        resolve(oldData);
      });
  })
}

const getDataAndUpdate = (date = 'latest') => {
  // axios.get(`${baseUrl}/latest`, {
    axios.get(`${baseUrl}/${date}`, {
    params: {
      access_key: accessKey,
      base: 'EUR'
    }
  })
    .then(async (response) => {
      const result = response.data;

      if (result.success === false) {
        console.log('Fail to get data');
        return;
      }

      const newData = {
        date: result.date,
        rates: result.rates
      }

      const oldData = await getOldData();

      // Kiểm tra dữ liêu mới lấy về có trùng lặp với dữ liệu cũ hay không
      if (deepEqual(newData, oldData)) {
        console.log('Trùng lặp, không update');
      }
      else {
        console.log('Không trùng lặp')

        // Update dữ liệu
        const exchange = new Exchange({
          timestamp: result.timestamp,
          date: result.date,
          base: result.base,
          rates: result.rates
        });

        exchange.save()
          .then(() => console.log('Updated successfully'))
          .catch(error => console.log('Failed to update: ', err.message));
      }
    })
    .catch((error) => {
      console.log(error);
    })
}

// getDataAndUpdate();
// setInterval(getDataAndUpdate, timeUpdated);

for (let d = new Date('1999-01-01'); d <= Date.now(); d.setDate(d.getDate() + 1)) {
  const date = d.toISOString().slice(0, 10);
  console.log(date);

  getDataAndUpdate(date);
}

