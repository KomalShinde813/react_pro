import { useEffect } from "react";
import { CommonModals } from "../../../Core/App/PageLevel/AppContextProvider";
import { useDialog } from "../../../Core/Hooks/useDialog";

const ResetPassword = props => {
    const { showDialog } = useDialog();
    const onDialogClose = () => {
        props.history.push("/");
    }
    useEffect(() => {
        const args = {
            id: props.match.params.id,
            token: window.location.search.substring(1),
            onDialogClose
        }

        showDialog(CommonModals.ResetPassword, args);
    }, []);
    return <></>;
}

export default ResetPassword;