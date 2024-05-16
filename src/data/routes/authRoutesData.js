import Module from "../../modules";
const authRoutesData = [
  {
    title: "",
    path: "/",
    element: Module.Auth.SignIn,
  },
  {
    title: "",
    path: "sign-up",
    element: Module.Auth.SignUp,
  },
  {
    title: "",
    path: "sign-up",
    element: Module.Auth.SignUp,
  },
  {
    title: "",
    path: "set-password",
    element: Module.Auth.SetPassword,
  },
  {
    title: "",
    path: "verify-email",
    element: Module.Auth.VerifyEmail,
  },
];

export default authRoutesData;
