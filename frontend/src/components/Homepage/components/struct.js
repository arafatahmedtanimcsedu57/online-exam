export const loginSectionStruct = {
  align: "center",
  wrap: "wrap",
  justify: "center",
  vertical: true,
  gap: "middle",

  style: {
    background: "white",
    position: "relative",
    zIndex: 1,
    height: "600px",

    padding: "32px",

    borderRadius: "16px",
    boxShadow: "rgb(9 5 41) 0px 0px 1px",
  },
};

export const loginBannerStruct = {
  style: {
    minWidth: "100px",
    maxWidth: "100px",
    background: "white",
    borderRadius: "500px",
    boxShadow: "black 0px 0px 1px",
  },
};

export const loginFormStruct = {
  // labelCol: {
  //   xs: { span: 24 },
  //   sm: { span: 8 },
  // },
  // wrapperCol: {
  //   xs: { span: 24 },
  //   sm: { span: 16 },
  // },

  labelAlign: "left",

  autoComplete: "on",
  style: {
    padding: "32px",
  },
};

export const emailFieldStruct = {
  // label: "Email",
  name: "email",
  rules: [
    {
      type: "email",
      required: true,
      message: "Please input your email!",
    },
  ],
};

export const passwordFieldStruct = {
  // label: "Password",
  name: "password",
  rules: [
    {
      required: true,
      message: "Please input your password!",
    },
  ],
};

export const buttonSectionStruct = {
  wrapperCol: {
    // xs: { span: 24, offset: 0 },
    // sm: { span: 16, offset: 8 },
  },
};

export const buttonStruct = {
  type: "primary",
  htmlType: "submit",
  block: true,
};

export const homeSectionTitle = {
  style: {
    fontSize: "32px",
    fontWeight: "800",
    letterSpacing: "3px",
    color: "#1c1f7f",
    align: "center",
    whiteSpace: "wrap",
    textAlign: "center",
  },
};
