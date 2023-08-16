const azureBlob = require('azure-storage');
const util = require('util');

const { AZURE_BLOB_STORAGE_CONNECTION_STRING,
        AZURE_BLOB_STORAGE_CONTAINER_NAME,
        AZURE_BLOB_STORAGE_URL } = process.env;

const connectionString = AZURE_BLOB_STORAGE_CONNECTION_STRING;
const containerName = AZURE_BLOB_STORAGE_CONTAINER_NAME;
const containerUrl = AZURE_BLOB_STORAGE_URL;

const blobService = azureBlob.createBlobService(connectionString);
const blobCreateAsync = util.promisify(blobService.createBlockBlobFromLocalFile);
const blobGetAsync = util.promisify(blobService.getBlobToLocalFile);

const createBlob = async (blobName) => {
    try {
        await blobCreateAsync.call(blobService, containerName , `mbtiles/${blobName}`, `./output/sample.mbtiles`);
        let mbtilesUrl = `${containerUrl}/mbtiles/` + `${blobName}`;
        return mbtilesUrl
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const downloadBlob = async (blobName) => {
    try {
        const blobResult = await blobGetAsync.call(blobService, containerName, `GeoJSONs/${blobName}`, `./output/sample.geojson`);
        return blobResult;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    createBlob,
    downloadBlob
}