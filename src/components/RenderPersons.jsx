import {useEffect, useState} from "react";
import serverHandler from "../services/serverHandler.js";

const isPersonMatch = (person, searchValue) => {
    return person && person.name && person.name.toLowerCase().includes(searchValue.toLowerCase());
}
const isEmptyArray = (array) => {
    return !Array.isArray(array) || array.length < 1
}
const RenderPersons = ({persons = [], 
                           searchValue = "", 
                           isLoading = false, 
                           isCreating = false, 
                           setIsDeleting, 
                           isDeleting,
                           setPersons}) => {
    
    
    const [displayPersons, setDisplayPersons] = useState([]);

    useEffect(() => {
        if (!Array.isArray(persons)) {
            setDisplayPersons([]);
            return;
        }
        
        if (searchValue.length > 0) {
            setDisplayPersons(persons.filter((person) => isPersonMatch(person, searchValue)));
        } else {
            setDisplayPersons(persons);
        }
        
    }, [persons, searchValue, isLoading, isCreating, isDeleting]);

    const handleDelete = async (id) => {
        console.log("id to delete "+id)
        
        try {
            setIsDeleting(true);
            await serverHandler.deletePerson(id);
            setPersons(persons.filter((person) => person.id !== id));
            setIsDeleting(false);
        } catch (error) {
            setIsDeleting(false);
            console.error(`Error while deleting person with id ${id}`, error);
        }
    }

    const renderContent = () => {
        if (isCreating || isLoading || isDeleting) return <div>Loading...</div>;
        if (isEmptyArray(displayPersons)) return;

        return displayPersons
            .filter(person => Boolean(person)) // exclude null or undefined
            .map((person) => (<li key={person.id}><button onClick={()=>handleDelete(person.id)}>delete</button>
                {person.name} {person.number} </li>));
    }
    return renderContent();
}

export default RenderPersons;