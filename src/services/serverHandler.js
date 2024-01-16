import axios from "axios"
const baseUrl = "/api/persons"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

function createPersonObject(newName, number, persons) {
    return {name: newName, number: number, id: persons.length+1};
}

const checkPersonExists = async (id) => {
    try {
        const response = await axios.get(`${baseUrl}/${id}`);

        if(response.status === 200) {
            console.log("Person Exists!");
            return true;
        }
        
        
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.log("Person doesn't exist!");
        } else {
            console.error("An error occurred while checking:", error);
        }
        
        return false;
    }
    return false;
}

const create = objectToAdd => {
    const request = axios.post(baseUrl, objectToAdd)
    return request.then(response => response.data)

}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const deletePerson = async (id) => {
    const personExists= await checkPersonExists(id);

    if (!personExists) {
        throw new Error(`Person with id ${id} does not exist`);
    }

    try {
        const response = await axios.delete(`${baseUrl}/${id}`);
        return response;
    } catch (error) {
        console.error('Error deleting person:', error);
        throw error;
    }
}

export default { getAll, create, update, createPersonObject, deletePerson, checkPersonExists }