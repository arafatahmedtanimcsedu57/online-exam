import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Form, Input, Button } from "antd";

import { SecurePost } from "../../../../services/axiosCall";
import apis from "../../../../services/Apis";

import {
  getSubject,
  getSubjects,
  setSubjectModifyAction,
} from "../../../../actions/subject.action";

import {
  newTopicsFormStruct,
  topicFieldStruct,
  buttonSectionStruct,
  buttonStruct,
} from "./struct";

const TopicForm = ({ setMessage }) => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const subject = useSelector((state) => state.subject);
  const { subjectId, subjectModalMode, subjectDetails } = subject;

  const handleSubmit = (values) => {
    SecurePost({
      url: `${apis.SUBJECT}`,
      data: {
        _id: subjectId,
        topic: values.topic,
      },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(getSubjects());
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

        dispatch(setSubjectModifyAction(null, false, "COMPLETE"));
      })
      .catch(() => {
        dispatch(setSubjectModifyAction(null, false, "COMPLETE"));
        setMessage({
          type: "error",
          content: "Server Error",
          duration: 2,
        });
      });
  };

  useEffect(() => {
    if (subjectId) dispatch(getSubject(subjectId));
  }, [subjectId]);

  useEffect(() => form.resetFields(), [form, subjectDetails]);

  return (
    <>
      <Form
        {...newTopicsFormStruct}
        form={form}
        onFinish={handleSubmit}
        initialValues={{ ...subjectDetails }}
      >
        <Form.Item {...topicFieldStruct}>
          <Input />
        </Form.Item>
        <Form.Item {...buttonSectionStruct}>
          <Button {...buttonStruct}>{subjectModalMode}</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default TopicForm;
