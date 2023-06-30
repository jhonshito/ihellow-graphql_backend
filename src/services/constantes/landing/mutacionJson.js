
// function convertirToJson(parameter){
//     const linksArray = [];

//     // Recorre cada objeto en el array de datos
//     for (let i = 0; i < parameter.length; i++) {
//         const item = parameter[i];
  
//         // Si el objeto tiene las propiedades "name" y "url"
//         if (item.hasOwnProperty('name') && item.hasOwnProperty('url')) {
//             // Crea un nuevo objeto con las propiedades "nombre" y "url"
//             const linkObj = {
//               nombre: item.name,
//               url: item.url
//             };
  
//             // Agrega el nuevo objeto al array de links
//             linksArray.push(linkObj);
//         }
//     }
  
//     // Crea el objeto final con la propiedad "links" y el array de links
//     const result = {
//       links: linksArray
//     };
  
//     // Convierte el objeto a JSON
//     const jsonResult = result.links.length > 0 ? result: {};
  
//     return jsonResult;

// }

function convertirToJson(parameter) {
    const linksArray = [];

    // Recorre cada objeto en el array de datos
    for (let i = 0; i < parameter.length; i++) {
        const item = parameter[i];

        // Si el objeto tiene las propiedades "name" y "url" y la URL no está vacía
        if (item.hasOwnProperty('name') && item.hasOwnProperty('url') && item.url !== '') {
            // Crea un nuevo objeto con las propiedades "nombre" y "url"
            const linkObj = {
                nombre: item.name,
                url: item.url
            };

            // Agrega el nuevo objeto al array de links
            linksArray.push(linkObj);
        }
    }

    // Crea el objeto final con la propiedad "links" y el array de links
    const result = {
        links: linksArray
    };

    // Convierte el objeto a JSON
    const jsonResult = result.links.length > 0 ? result : {};

    return jsonResult;
}

module.exports = { convertirToJson };

// module.exports = { convertirToJson }