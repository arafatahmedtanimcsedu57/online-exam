export const registrationSectionStruct = {
  registrationSection: {
    align: "center",
    justify: "center",

    style: {
      height: "100vh",
    },
  },

  registrationFormSection: {
    style: {
      maxWidth: "500px",
    },
  },
};

export const formStruct = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },

  autoComplete: "on",
  labelAlign: "left",
};

export const nameFieldStruct = {
  label: "Name",
  name: "name",
  rules: [
    {
      required: true,
      message: "Please input your name!",
      whitespace: true,
    },
  ],
  hasFeedback: true,
};

export const emailFieldStruct = {
  label: "Email",
  name: "email",
  rules: [
    {
      type: "email",
      message: "The input is not valid E-mail!",
    },
    {
      required: true,
      message: "Please input your E-mail!",
    },
  ],
  hasFeedback: true,
};

export const contactFieldStruct = {
  contactField: {
    label: "Phone Number",
    name: "contact",
    rules: [
      {
        required: true,
        message: "Please input your phone number!",
      },
      {
        len: 10,
        message: "Contact number must be 10 digit long",
      },
    ],
  },

  prefixFieldStruct: {
    prefixField: {
      name: "prefix",
      rules: [{ required: true, message: "Please enter contact no prefix" }],
      noStyle: true,
    },
    select: {
      style: { width: 100 },
    },
  },
};

export const organisationFieldStruct = {
  label: "Organisation",
  name: "organisation",
  rules: [
    {
      required: true,
      message: "Please input your organisation name",
    },
  ],
};

export const locationFieldStruct = {
  label: "Location",
  name: "location",
  rules: [
    {
      required: true,
      message: "Please input your location",
    },
  ],
};

export const passwordFieldStruct = {
  label: "Password",
  name: "password",
  rules: [
    {
      required: true,
      message: "Please input your phone password!",
    },
  ],
  hasFeedback: true,
};

export const confirmPasswordFieldStruct = {
  name: "confirm",
  label: "Confirm Password",
  dependencies: ["password"],
  hasFeedback: true,
  rules: [
    {
      required: true,
      message: "Please confirm your password!",
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        }
        return Promise.reject(
          new Error("The new password that you entered do not match!")
        );
      },
    }),
  ],
};

export const buttonSectionStruct = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 8 },
    textAlign: "start",
  },
};

export const buttonStruct = {
  type: "primary",
  htmlType: "submit",
  block: true,
};
