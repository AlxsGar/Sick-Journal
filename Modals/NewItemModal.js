import { Modal } from "react-native";
import NewPatient from "../Forms/NewPatient";

function NewItemModal({ active, onExit, onRetrieveBundle }) {
  return <Modal visible={active} animationType="slide">
    <NewPatient onExit={onExit} onRetrieveBundle={onRetrieveBundle}/>
  </Modal>;
}

export default NewItemModal;
