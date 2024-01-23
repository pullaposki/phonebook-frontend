import { useState, useEffect } from "react";
import AddForm from "./components/AddForm.jsx";
import RenderPersons from "./components/RenderPersons.jsx";
import Search from "./components/Search.jsx";
import serverHandler from "./services/serverHandler.js";
import MessageArea from "./components/MessageArea.jsx";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    setIsLoading(true);
    serverHandler
      .getAll()
      .then((response) => {
        setPersons(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error getting data ", error);
        setIsLoading(false);
      });
  }, []);

  const renderContent = () => {
    if (isLoading || isCreating) {
      return <div>Loading...</div>;
    }

    if (!persons) {
      return <div>No Data...</div>;
    }

    return (
      <div>
        <MessageArea  />
        <Search
          handleSearchChange={handleSearchChange}
          searchValue={searchValue}
        />
        <AddForm
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          handleChange={handleNameChange}
          handleNumberChange={handleNumberChange}
          persons={persons}
          number={number}
          newName={newName}
          setPersons={setPersons}
          setNewName={setNewName}
          setNumber={setNumber}
        />
        <h2>Numbers</h2>
        <RenderPersons
          isLoading={isLoading}
          isCreating={isCreating}
          isDeleting={isDeleting}
          setIsDeleting={setIsDeleting}
          searchValue={searchValue}
          persons={persons}
          setPersons={setPersons}
        />
      </div>
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {renderContent()}
    </div>
  );
};

export default App;
