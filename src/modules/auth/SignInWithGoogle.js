import config from '../../config/config';

export const signinWithGoogle = async () => {
  window.location.href = `${config.apiURL}/auth/google`;
};
