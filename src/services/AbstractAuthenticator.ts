interface IAbstractAuthenticator {
  getCredentials: () => Promise<any>;
  revokeCredentials: () => void;
  goToLogin: () => void; // window.location.href = PATH_LOGIN;
}

export default IAbstractAuthenticator;
