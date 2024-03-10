import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Table,
  Button,
  Typography,
  Divider,
  Modal,
  Popconfirm,
  Flex,
  message,
  Card,
  Tag,
  Space,
} from "antd";

import {
  headingStruct,
  headerStruct,
  addButtonStruct,
  editButtonStruct,
  deleteButtonStruct,
  getStaticColumns,
  popconfirmStruct,
  tableStruct,
} from "./struct";

import {
  getTrainers,
  setTrainerModifyAction,
} from "../../../actions/trainer.action";

import TrainerForm from "./components/TrainerForm";

import { SecurePost } from "../../../services/axiosCall";
import apis from "../../../services/Apis";

const { Title } = Typography;

const AllTrainer = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();

  const trainer = useSelector((state) => state.trainer);
  const {
    trainers,
    trainersLoading,
    trainerModalState,
    trainerModalMode,
  } = trainer;

  const openModal = (trainerId, mode) =>
    dispatch(setTrainerModifyAction(trainerId, true, mode));
  const closeModal = () =>
    dispatch(setTrainerModifyAction(null, false, "COMPLETE"));

  const setMessage = (message) => messageApi.open({ ...message });

  const deleteTrainer = (trainerId) => {
    SecurePost({
      url: `${apis.TRAINER}/delete`,
      data: { trainerId },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(getTrainers());
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
  };

  const getActions = (key) => (
    <Space>
      <Button
        {...editButtonStruct}
        icon={<EditOutlined />}
        onClick={() => openModal(key, "UPDATE")}
      />
      <Divider type="vertical" />
      <Popconfirm {...popconfirmStruct} onConfirm={() => deleteTrainer(key)}>
        <Button {...deleteButtonStruct} icon={<DeleteOutlined />} />
      </Popconfirm>
    </Space>
  );

  const columns = [...getStaticColumns(getActions)];

  useEffect(() => dispatch(getTrainers()), []);

  return (
    <>
      <Card>
        {contextHolder}
        <Flex {...headerStruct}>
          <Flex {...headingStruct.heading}>
            <Title {...headingStruct.title}>Instructors</Title>
            <div>
              {trainers && trainers.length && (
                <Tag {...headingStruct.tag}>{trainers.length}</Tag>
              )}
            </div>
          </Flex>
          <Button
            {...addButtonStruct}
            onClick={() => openModal(null, "CREATE")}
          >
            Add New
          </Button>
        </Flex>
        <Table
          {...tableStruct}
          columns={columns}
          dataSource={trainers}
          loading={trainersLoading}
        />
      </Card>
      <Modal
        open={trainerModalState}
        title={
          trainerModalMode === "CREATE"
            ? "Add New Instructor"
            : trainerModalMode === "UPDATE"
            ? "Update Instructor"
            : ""
        }
        onCancel={closeModal}
        destroyOnClose={true}
        footer={[]}
      >
        <TrainerForm setMessage={setMessage} />
      </Modal>
    </>
  );
};

export default AllTrainer;
