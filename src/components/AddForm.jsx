import serverHandler from "../services/serverHandler.js";
import PropTypes from "prop-types";
import useErrorContext from "../context/useErrorContext.jsx";

const AddForm = ({
  isCreating,
  setIsCreating,
  newName,
  setNewName,
  number,
  setNumber,
  persons,
  setPersons,
  handleChange,
  handleNumberChange,
}) => {
  const { errorMessage, setErrorMessage } = useErrorContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isCreating) return;
    setIsCreating(true);

    let objectToAdd = serverHandler.createPersonObject(
      newName,
      number,
      persons
    );

    for (const person of persons) {
      if (person.name.toLowerCase() === objectToAdd.name.toLowerCase()) {
        if (confirm("Name exists. Update number?")) {
          try {
            const response = await serverHandler.update(person.id, objectToAdd);
            debugger;
            console.log("server handler update run, ", response);
            updatePerson(response);
            return;
          } catch (error) {
            handleUpdateError(error);
            return;
          }
        }
        cancelUpdate();
        return;
      }
    }
    try {
      const response = await serverHandler.create(objectToAdd);
      createPerson(response);
      return;
    } catch (error) {
      handleCreateError(error);
      return;
    }

    function handleCreateError(error) {
      console.error("Error during create: ", error);
      setErrorMessage(errorMessage);
      setIsCreating(false);
    }

    function createPerson(response) {
      setPersons((prevPersons) => [...prevPersons, response]);
      setNewName("");
      setNumber("");
      setIsCreating(false);
    }

    function handleUpdateError(error) {
      console.log("Error updating person", error);
      setErrorMessage("Error  updating person", error);
      setIsCreating(false);
    }

    function cancelUpdate() {
      setNewName("");
      setNumber("");
      setIsCreating(false);
      console.log("Cancelled update");
    }

    function updatePerson(updatedPerson) {
      debugger;
      const index = persons.findIndex((p) => p.id === updatedPerson.id);
      if (index !== -1) {
        const updatedPersons = [...persons];
        updatedPersons[index] = updatedPerson;
        setPersons(updatedPersons);
      }
      setNewName("");
      setNumber("");
      setIsCreating(false);
      console.log("Updated person: ", updatedPerson);
    }
  };

  return (
    <div>
      <h3>add person</h3>
      {isCreating ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            name: <input onChange={handleChange} value={newName} />
          </div>
          <div>
            number: <input onChange={handleNumberChange} value={number} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      )}
    </div>
  );
};

AddForm.propTypes = {
  isCreating: PropTypes.bool.isRequired,
  setIsCreating: PropTypes.func.isRequired,
  newName: PropTypes.string.isRequired,
  setNewName: PropTypes.func.isRequired,
  number: PropTypes.string.isRequired,
  setNumber: PropTypes.func.isRequired,
  persons: PropTypes.array.isRequired,
  setPersons: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleNumberChange: PropTypes.func.isRequired,
};

export default AddForm;
