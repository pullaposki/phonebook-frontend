import serverHandler from "../services/serverHandler.js";


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
   
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isCreating) return;
        
        setIsCreating(true);

        let objectToAdd = serverHandler.createPersonObject(newName, number, persons);

        for (const person of persons) {
            if (person.name.toLowerCase() === objectToAdd.name.toLowerCase()){
                if (confirm("Name exists. Update number?")) {
                    console.log("should update nmbr", person.id);
                    const updatedPerson = await serverHandler.update(person.id, objectToAdd);
                    const index = persons.findIndex(p => p.id === person.id);
                    if (index !== -1) {
                        const updatedPersons = [...persons];
                        updatedPersons[index] = updatedPerson;
                        setPersons(updatedPersons);
                    }
                    setNewName('');
                    setNumber('');
                    setIsCreating(false);
                    return;  // stop further execution of the loop once desired condition met, it also returns from the enclosing function
                }
                setNewName('');
                setNumber('');
                setIsCreating(false);
                return;
            }
        }
        
        try {
            const response = await serverHandler.create(objectToAdd);
            setPersons(prevPersons => [...prevPersons, response]);
            setNewName('');
            setNumber('');
            setIsCreating(false);
        } catch (error) {
            console.error("Error during create: ", error);
            setIsCreating(false);
        }
    };

    return (
        <div>
            <h3>add person</h3>
            {isCreating ? <div>Loading...</div> :
                <form onSubmit={handleSubmit}>
                    <div>
                        name: <input onChange={handleChange} value={newName}/>
                    </div>
                    <div>
                        number: <input onChange={handleNumberChange} value={number}/>
                    </div>
                    <div>
                        <button type="submit">add</button>
                    </div>
                </form>
            }
        </div>
    );
}

export default AddForm;