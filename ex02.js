const axios = require('./axios-1.x/dist/node/axios.cjs');

const baseUrl = "http://localhost:6767";

const id = 212198766; 
const year = 2000; 

//GET
const getRequest = async (id, year) => {
    const response = await axios.get(`${baseUrl}/test_get_method?id=${id}&year=${year}`);
    return response.data;
};

//POST
const postRequest = async (id, year, requestId) => {
    const response = await axios.post(`${baseUrl}/test_post_method`, { id, year, requestId });
    return response.data.message;
};

//PUT
const putRequest = async (id, year, postMessage) => {
    const response = await axios.put(`${baseUrl}/test_put_method`, { id, year }, { params: { id: postMessage } });
    return response.data.message;
};

//DELETE
const deleteRequest = async (putMessage) => {
    await axios.delete(`${baseUrl}/test_delete_method`, { params: { id: putMessage } });
};

const showRequests = async () => {
    try {
        //GET request
        const requestId = await getRequest(id, year);
        console.log('GET response:', requestId);

        //POST request
        const postMessage = await postRequest(id, year, requestId);
        console.log('POST response:', postMessage);

        //PUT request
        const putId = (id - 123503) % 92;
        const putYear = (year + 123) % 45;
        const putMessage = await putRequest(putId, putYear, postMessage);
        console.log('PUT response:', putMessage);

        //DELETE request
        await deleteRequest(putMessage);
        console.log('DELETE response: Resource deleted successfully');
    } catch (error) {
        console.error('Error during HTTP requests:', error.response ? error.response.data : error.message);
    }
};

showRequests();
