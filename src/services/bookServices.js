function bookServices() {
  function getBookById() {
    return new Promise((resolve, reject) => {
      resolve({ description: '<h1>Our description<h1>', imageUrl: 'https://images.ctfassets.net/usf1vwtuqyxm/7CHjPxbrigms8C2CMuYEaC/b85cd83c3b37a34cfd892594a08863ef/NarcissaMalfoy_WB_F6_NarcissaAtSpinnersEndLookingOverShoulder_Still_080615_Land.jpg?w=914' });
    });
  }

  return {
    getBookById,
  };
}

module.exports = bookServices();

// Limited by API
// Below code is consume data from a third party API that produces output in xml
// const axios = require('axios');
// const xml2js = require('xml2js');
// const debug = require('debug')('app:bookServices');

// // explicitArray (default: true): Always put child nodes in an array if true;
// //  otherwise an array is created only if there is more than one.
// const parser = xml2js.Parser({ explicitArray: false });

// function service() {
//   function getBookById(id) {
//     return new Promise((resolve, reject) => {
//       axios
//         .get('<insert third party api url here>')
//         .then((response) => {
//           parser.parseString(response.data, (err, result) => {
//             if (err) {
//               debug(err);
//             } else {
//               debug(result);
//               resolve(result.response.book);
//             }
//           });
//         })
//         .catch((err) => {
//           debug(err);
//           reject(err);
//         });
//     });
//   }

//   return { getBookById };
// }
