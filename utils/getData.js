const axios = require('axios');
const assert = require('assert').strict;

const accessKey = require('../config/accessKey').accessKey;
const Exchange = require('../models/Exchange');

const baseUrl = 'http://data.fixer.io/api';
// const timeUpdated = 15 * 60 * 1000; // ms
const timeUpdated = 1 * 1000; // ms

const getData = () => {
  axios.get(`${baseUrl}/latest`, {
    params: {
      access_key: accessKey,
      base: 'EUR'
    }
  })
    .then((response) => {
      const result = response.data;
      // console.log(result);

      if (result.success === false) {
        return;
      }

      const newData = {
        date: result.date,
        rates: result.rates
      }

      checkDataChange(newData);

      const exchange = new Exchange({
        timestamp: result.timestamp,
        date: result.date,
        base: result.base,
        rates: result.rates
      });

      exchange.save()
        .then(() => console.log('Updated successfully'))
        .catch(error => console.log('Failed to update: ', err.message));
    })
    .catch((error) => {
      console.log(error);
    })
}

const checkDataChange = (newData) => {
  console.log('new Data: ', newData)

  // Lấy dữ liệu mới nhất trong MongoDB
  Exchange.findOne()
    .sort({_id: -1})
    .exec((error, data) => {
      if (error) {
        console.log('Can not get data: ', error.message);
        return;
      }
      const oldData = {
        date: data.date,
        rates: data.rates
      }

      console.log('Old Data: ', oldData)

      assert.notDeepStrictEqual(oldData, newData);
    });

}
// getData();
// checkDataChange();

setInterval(getData, timeUpdated);

