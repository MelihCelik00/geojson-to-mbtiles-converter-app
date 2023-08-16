const converter = require('./converter');
const azureBlob = require('./azure-blob');

async function main() {
    try {
        // Provide input GeoJSON name, output MBTiles name, and Azure Blob GeoJSON name
        const inputGeoJsonName = 'your_input_geojson_name';
        const outputMBTilesName = 'output';
        const azureBlobGeoJsonName = 'example.geojson';

        // Download GeoJSON from Azure Blob Storage
        const geojsonContent = await azureBlob.downloadBlob(azureBlobGeoJsonName);

        // Convert GeoJSON to MBTiles using Tippecanoe
        await converter.convertToMbtiles(geojsonContent, outputMBTilesName);

        // Upload MBTiles to Azure Blob Storage
        const mbtilesUrl = await azureBlob.createBlob(geojsonContent, `${outputMBTilesName}.mbtiles`);
        console.log('MBTiles uploaded to Azure Blob Storage:', mbtilesUrl);
    } catch (error) {
        console.error('Error:', error);
    }
}

main();