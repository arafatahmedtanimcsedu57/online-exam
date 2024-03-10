import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  InputNumber,
  Input,
  Button,
  Select,
  Tooltip,
  Typography,
  Space,
  Alert,
  Divider,
} from "antd";

import { setTestAction } from "../../../actions/trainerTest.action";
import { getTags } from "../../../actions/tag.action";

import { SecurePost } from "../../../services/axiosCall";
import apis from "../../../services/Apis";

import {
  testFormStruct,
  testTypeFieldStruct,
  testTitleFieldStruct,
  subjectFieldStruct,
  testDurationFieldStruct,
  organisationFieldStruct,
  buttonSectionStruct,
  buttonStruct,
  numberOFQuestionsFieldStruct,
  tagFieldStruct,
} from "./struct";

import quizzTypes from "./const";

const { Option } = Select;

const TestForm = ({ setMessage, selectedQuestions, fetchTests }) => {
  const dispatch = useDispatch();

  const tag = useSelector((state) => state.tag);
  const { tags } = tag;
  const uniqueTags = tags.filter((item, index, array) => {
    return array.findIndex((obj) => obj.value === item.value) === index;
  });

  const trainerTest = useSelector((state) => state.trainerTest);
  const { trainerTestModalMode } = trainerTest;

  const trainerSubject = useSelector((state) => state.trainerSubject);
  const { trainerSubjects } = trainerSubject;
  const subjects = trainerSubjects.map((subject) => subject.subjectId);
  const uniqueSubjects = subjects.filter((item, index, array) => {
    return array.findIndex((obj) => obj._id === item._id) === index;
  });

  const handleSubmit = (values) => {
    if (trainerTestModalMode === "START AUTO GENERATION") {
      SecurePost({
        url: `${apis.TEST}/create-with-auto-generated-questions`,
        data: { ...values },
      })
        .then((response) => {
          if (response.data.success) {
            fetchTests && fetchTests();
            dispatch(setTestAction(false, "COMPLETE"));
            setMessage({
              type: "success",
              content: response.data.message,
              duration: 2,
            });
          } else
            setMessage({
              type: "warning",
              content: response.data.message,
              duration: 2,
            });
        })
        .catch(() =>
          setMessage({
            type: "error",
            content: "Server Error",
            duration: 2,
          })
        );
    } else {
      SecurePost({
        url: `${apis.TEST}/create`,
        data: { ...values, questions: selectedQuestions },
      })
        .then((response) => {
          if (response.data.success) {
            dispatch(setTestAction(false, "COMPLETE"));
            setMessage({
              type: "success",
              content: response.data.message,
              duration: 2,
            });
          } else
            setMessage({
              type: "warning",
              content: response.data.message,
              duration: 2,
            });
        })
        .catch(() =>
          setMessage({
            type: "error",
            content: "Server Error",
            duration: 2,
          })
        );
    }
  };

  useEffect(() => dispatch(getTags()), []);

  return (
    <>
      <Form {...testFormStruct} onFinish={handleSubmit}>
        {!!selectedQuestions && (
          <>
            <Alert
              message={`${selectedQuestions.length} questions are selected`}
            />

            <Divider />
          </>
        )}

        <Form.Item {...testTypeFieldStruct.testTypeField}>
          <Select {...testTypeFieldStruct.select}>
            {quizzTypes.map((quizzType) => {
              return <Option value={quizzType.value}>{quizzType.label}</Option>;
            })}
          </Select>
        </Form.Item>

        <Form.Item {...testTitleFieldStruct}>
          <Input />
        </Form.Item>

        {subjects && (
          <Form.Item {...subjectFieldStruct.subjectField}>
            <Select {...subjectFieldStruct.select}>
              {uniqueSubjects.map((subject) => (
                <Option key={subject._id} s={subject.topic} value={subject._id}>
                  {subject.topic}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

        {trainerTestModalMode === "START AUTO GENERATION" && (
          <Form.Item {...tagFieldStruct.tagField}>
            <Select {...tagFieldStruct.select}>
              {uniqueTags.map((tag) => (
                <Option key={tag.value} s={tag.label} value={tag.value}>
                  {tag.label.toUpperCase()}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

        <Form.Item {...testDurationFieldStruct}>
          <Space>
            <InputNumber min={1} max={180} />
            <Tooltip title="Useful information">
              <Typography.Text>Minute</Typography.Text>
            </Tooltip>
          </Space>
        </Form.Item>

        <Form.Item {...organisationFieldStruct}>
          <Input />
        </Form.Item>

        {trainerTestModalMode === "START AUTO GENERATION" && (
          <Form.Item {...numberOFQuestionsFieldStruct}>
            <Input />
          </Form.Item>
        )}

        <Form.Item {...buttonSectionStruct}>
          <Button {...buttonStruct}>{trainerTestModalMode}</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default TestForm;
