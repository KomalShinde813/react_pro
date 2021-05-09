const config = {
    passwordValidateRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/,
    backendUrl: {
      prod: "https://devapi.fleet247.co.uk",
      dev: "https://devapi.fleet247.co.uk"
    }
  }
  
  window._ENV_ = config;