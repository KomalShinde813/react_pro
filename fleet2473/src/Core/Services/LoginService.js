import { post, postWithAuth } from "../Basic/HttpService";
import { AppStorage } from "../Basic/storage-service";

export let tryLogin = async formState => {
  let res = await post( '/login', {
    loginName: formState.name,
    password: formState.password
  } );
  if ( res.success ) {
    AppStorage.performLogin( res.data );    
  }
  return res;
}

export const resetPasswordWithToken = async (id, token, password, confirm) => {   
  let res = await post(`/setNewPassword/${id}`, {
      newPassword: password,
      confirmPassword: confirm,
      passwordResetToken: token
  });
  return res;
};

export const changePassword = async ({currentPassword, password, confirmPassword}) => {
  let res = await postWithAuth(`/changePassword`, {
      currentPassword: currentPassword,
      newPassword: password,
      confirmPassword: confirmPassword,
  });
  return res;
};

export const forgotPasswordRequest = async email =>{
  let res = await post('/resetPassword', {
      "email": email,
    });
  return res;
}
