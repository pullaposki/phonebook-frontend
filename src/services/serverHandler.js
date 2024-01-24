import axios from "axios";
import ErrorContext from "../context/ErrorContext";

const baseUrl = "/api/persons";

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error("Error getting all persons:", error);
    //setMessage(error.response.data.error, "error");
  }
};

function createPersonObject(newName, number, persons) {
  return { name: newName, number: number, id: persons.length + 1 };
}

const checkPersonExists = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);

    if (response.status === 200) {
      console.log("Person Exists!");
      return true;
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log("Person doesn't exist!");
    } else {
      console.error("An error occurred while checking:", error);
      throw error;
    }
    return false;
  }
  return false;
};

const create = async (objectToAdd) => {  
    const response = await axios.post(baseUrl, objectToAdd);
    if (response.status !== 200 && response.status !== 201) {
      throw new Error("Error creating person");
    }
    
    return response.data;
}

const update = async (id, newObject) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newObject);
    return response.data;
  } catch (error) {
    console.error("Error updating person:", error.response.data);
    //setMessage(error.response.data.error, "error");
  }
};

const deletePerson = async (id) => {
  await personExists(id);

  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting person:", error);
    throw error;
  }
};

export default {
  getAll,
  create,
  update,
  createPersonObject,
  deletePerson,
  checkPersonExists,
};

// Helper functions
async function personExists(id) {
  try {
    const personExists = await checkPersonExists(id);

    if (!personExists) {
      console.error(`Person with id ${id} does not exist`);
    }
  } catch (error) {
    console.error("Error while checking if person exists:", error);
    throw error;
  }
}
