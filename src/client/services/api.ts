const axios = require('axios');

export const generatePromotions =  async () => {
  return await axios.get(`api/promotion/generatePromotions`)
  .then(function (result: any) {
    if (result.status === 200) {
      return result.data;
    }
  })
  .catch(function (err: any) {
    console.log(err);
    return null;
  });
}

export const deletePromotion =  async (data: any) => {
  return await axios.delete(`api/promotion/deletePromotion` , {data})
  .then(function (result: any) {
    if (result.status === 200) {
      return result.data;
    }
  })
  .catch(function (err: any) {
    console.log(err);
    return null;
  });
}

export const editPromotion =  async (data: any) => {
  return await axios.post(`api/promotion/editPromotion` , {data})
  .then(function (result: any) {
    if (result.status === 200) {
      return result.data;
    }
  })
  .catch(function (err: any) {
    console.log(err);
    return null;
  });
}

export const duplicatePromotion =  async (data: any) => {
  return await axios.post(`api/promotion/duplicatePromotion` , {data})
  .then(function (result: any) {
    if (result.status === 200) {
      return result.data;
    }
  })
  .catch(function (err: any) {
    console.log(err);
    return null;
  });
}