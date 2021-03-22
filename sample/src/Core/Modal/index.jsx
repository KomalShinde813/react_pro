import { useContext } from "react";
import AppContext from "../../App/AppContext";
import PasswordChange from "./PasswordChange";
import AddUserModal from "./AddUser";
import DeleteModal from "./DeleteModal";
import TechWriteUp from "./TechWriteUp";
import ServiceAdvCust from "./ServiceAdvCust";

function getModalToShow(visibleModalId) {
    switch (visibleModalId) {
        case "PasswordChange":
            return PasswordChange;
        case "AddUser":
            return AddUserModal;
        case "DeleteModal":
            return DeleteModal;
        case "TechWriteUp":
            return TechWriteUp;
        case "ServiceAdvCust":
            return ServiceAdvCust;
    }
}
const ProfileModal = (props) => {
    const { visibleModalId } = useContext(AppContext);
    const ModalToShow = getModalToShow(visibleModalId);
    return <>{ModalToShow && <ModalToShow />}</>;
};
export { ProfileModal };
