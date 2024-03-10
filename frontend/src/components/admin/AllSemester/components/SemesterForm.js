import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Form, Input, Button } from "antd";

import { SecurePost } from "../../../../services/axiosCall";
import apis from "../../../../services/Apis";

import {
  getSemester,
  getSemesters,
  setSemesterModifyAction,
} from "../../../../actions/semester.action";

import {
  newTopicsFormStruct,
  buttonSectionStruct,
  buttonStruct,
  semesterNameFieldStruct,
  yearFieldStruct,
} from "./struct";

const SemesterForm = ({ setMessage }) => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const semester = useSelector((state) => state.semester);
  const { semesterId, semesterModalMode, semesterDetails } = semester;

  const handleSubmit = (values) => {
    SecurePost({
      url: `${apis.SEMESTER}`,
      data: {
        _id: semesterId,
        name: values.name,
        year: values.year,
      },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(getSemesters());
          setMessage({
            type: "success",
            content: response.data.message,
            duration: 2,
          });
        } else {
          setMessage({
            type: "warning",
            content: response.data.message,
            duration: 2,
          });
        }

        dispatch(setSemesterModifyAction(null, false, "COMPLETE"));
      })
      .catch(() => {
        dispatch(setSemesterModifyAction(null, false, "COMPLETE"));
        setMessage({
          type: "error",
          content: "Server Error",
          duration: 2,
        });
      });
  };

  useEffect(() => {
    if (semesterId) {
      dispatch(getSemester(semesterId));
    }
  }, [semesterId]);

  useEffect(() => form.resetFields(), [form, semesterDetails]);

  return (
    <>
      <Form
        {...newTopicsFormStruct}
        form={form}
        onFinish={handleSubmit}
        initialValues={{ ...semesterDetails }}
      >
        <Form.Item {...semesterNameFieldStruct}>
          <Input />
        </Form.Item>

        <Form.Item {...yearFieldStruct}>
          <Input />
        </Form.Item>

        <Form.Item {...buttonSectionStruct}>
          <Button {...buttonStruct}>{semesterModalMode}</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SemesterForm;
