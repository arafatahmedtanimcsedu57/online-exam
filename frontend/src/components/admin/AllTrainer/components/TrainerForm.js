import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Form, Input, Button, Select } from "antd";

import { SecurePost } from "../../../../services/axiosCall";
import apis from "../../../../services/Apis";

import {
  setTrainerModifyAction,
  getTrainer,
  getTrainers,
} from "../../../../actions/trainer.action";

import {
  newTrainerFormStruct,
  nameFieldStruct,
  emailFieldStruct,
  contactFieldStruct,
  passwordFieldStruct,
  confirmPasswordFieldStruct,
  prefixFieldStruct,
  buttonSectionStruct,
  buttonStruct,
} from "./struct";

const { Option } = Select;

const TrainerForm = ({ setMessage }) => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const trainer = useSelector((state) => state.trainer);
  const { trainerId, trainerModalMode, trainerDetails } = trainer;

  const handleSubmit = (values) => {
    SecurePost({
      url: `${apis.TRAINER}`,
      data: {
        _id: trainerId,
        name: values.name,
        password: values.password,
        emailId: values.emailId,
        contact: values.prefix + values.contact,
      },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(getTrainers());

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

        dispatch(setTrainerModifyAction(null, false, "COMPLETE"));
      })
      .catch(() => {
        dispatch(setTrainerModifyAction(null, false, "COMPLETE"));
        setMessage({
          type: "error",
          content: "Server Error",
          duration: 2,
        });
      });
  };

  useEffect(() => {
    if (trainerId) {
      dispatch(getTrainer(trainerId));
    }
  }, [trainerId]);

  useEffect(() => form.resetFields(), [form, trainerDetails]);

  const PrefixSelector = (
    <Form.Item
      {...prefixFieldStruct.prefix}
      initialValue={
        trainer.trainerDetails ? trainer.trainerDetails.prefix : "+880"
      }
    >
      <Select {...prefixFieldStruct.select}>
        <Option value="+880">+880</Option>
      </Select>
    </Form.Item>
  );

  return (
    <>
      <Form
        {...newTrainerFormStruct}
        form={form}
        onFinish={handleSubmit}
        initialValues={{ ...trainerDetails }}
      >
        <Form.Item {...nameFieldStruct}>
          <Input />
        </Form.Item>

        {!trainerId ? (
          <Form.Item {...emailFieldStruct}>
            <Input />
          </Form.Item>
        ) : (
          <></>
        )}

        <Form.Item {...contactFieldStruct}>
          <Input addonBefore={PrefixSelector} min={10} max={10} />
        </Form.Item>

        {!trainerId ? (
          <>
            <Form.Item {...passwordFieldStruct}>
              <Input.Password />
            </Form.Item>
            <Form.Item {...confirmPasswordFieldStruct}>
              <Input.Password />
            </Form.Item>
          </>
        ) : (
          <></>
        )}
        <Form.Item {...buttonSectionStruct}>
          <Button {...buttonStruct}>{trainerModalMode}</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default TrainerForm;
