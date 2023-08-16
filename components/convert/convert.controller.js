const tippecanoe = require("tippecanoe");
const azureBlob = require('../../utils/azure-blob');


const convert = async (req, res, next) => {
    try {
        const geoJsonName = req.body.name; // Provide input GeoJSON name

        await azureBlob.downloadBlob(`${geoJsonName}`); // Download GeoJSON from Azure Blob Storage

        await convertToMbtiles(); // Convert GeoJSON to MBTiles
        
        const mbtilesUrl = await azureBlob.createBlob(`${geoJsonName.split('.')[0]}.mbtiles`); // Upload MBTiles to Azure Blob Storage
        return res.status(200).json(mbtilesUrl);        
    } catch (error) {
        next(error);
    }
}

const convertToMbtiles = async function () { 
    try {
        tippecanoe(
            [`./output/sample.geojson`],
            {
              z: 22,
              readParallel: true,
              simplification: 10,
              layer: "buildings",
              output: `./output/sample.mbtiles`,
              description: "Building footprints in the municipality of Hobbiton.",
              force: true,
              "drop-densest-as-needed": true,
              "extend-zooms-if-still-dropping": true,
              pk: true,
              pf: true,
            },
            { echo: true }
          );
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    convert,
    convertToMbtiles
}