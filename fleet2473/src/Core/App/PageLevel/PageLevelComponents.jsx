import React, { useContext, useEffect, useState } from 'react';
import LoaderSpinner from '../../Loader/Loader';
import Toaster from '../../Toaster/Toaster';
import ChangePasswordComp from '../../Auth/ChangePasswordComp';
import ResetPasswordComp from '../../../Components/_shared/ResetPassword/ResetPasswordComp';
import DialogComp from '../../Dialog/DialogComp';
import ForgotPasswordComp from '../../Auth/ForgotPasswordComp';
import { getHashPathParts } from '../../Basic/StaticService';
import { useLoginInfo } from '../../Hooks/useLoginInfo';
import { CommonModals } from './AppContextProvider';
import { useLoader } from '../../Hooks/useLoader';
import { useToast } from '../../Hooks/useToast';
import { useDialog } from '../../Hooks/useDialog';

let PageLevelComponents = () => {

  const loaderState = useLoader();
  const toastState = useToast();
  const { dialogState, showDialog, hideDialog } = useDialog();
  const { isLoggedIn } = useLoginInfo()

  useEffect(() => {
    let hashPaths = getHashPathParts();
    if (hashPaths.length > 0) {
      if (isLoggedIn) {
        if (hashPaths[0].toLowerCase() === 'ChangePassword'.toLowerCase()) {
          showDialog(CommonModals.ChangePassword);
        }
      }
      else {
        if (hashPaths[0].toLowerCase() === 'ForgotPassword'.toLowerCase()) {
          showDialog(CommonModals.ForgotPassword);
        }
        else if (hashPaths[0].toLowerCase() === 'ResetPassword'.toLowerCase()) {
          if (hashPaths[1]) {
            showDialog(CommonModals.ResetPassword, { token: hashPaths[1] })
          } else {
            toastState.showToastError('Something went wrong, Cannot find the Password Reset Token');
          }
        }
      }
    }
  }, [window.location.hash]);


  const closeDialog = () => {
    hideDialog();
    dialogState.args?.onDialogClose && dialogState.args?.onDialogClose();
  }
  return <>
    <LoaderSpinner state={loaderState}></LoaderSpinner>
    <Toaster state={toastState}></Toaster>

    {isLoggedIn && dialogState.name === CommonModals.ChangePassword && <DialogComp title="Change Password" onClose={closeDialog}>
      <ChangePasswordComp />
    </DialogComp>}

    {!isLoggedIn && dialogState.name === CommonModals.ForgotPassword && <DialogComp title="Forgot Password" onClose={closeDialog}>
      <ForgotPasswordComp />
    </DialogComp>}

    {!isLoggedIn && dialogState.name === CommonModals.ResetPassword && <DialogComp title="Reset Password" onClose={closeDialog}>
      <ResetPasswordComp {...dialogState.args} />
    </DialogComp>}

    {dialogState.name === CommonModals.GenericModal && <DialogComp title={dialogState.args.title || "Info"} onClose={closeDialog}>
      {dialogState.args.component}
    </DialogComp>}
  </>;
}

export default PageLevelComponents;