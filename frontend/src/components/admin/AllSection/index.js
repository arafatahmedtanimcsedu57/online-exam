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
  headerStruct,
  headingStruct,
  addButtonStruct,
  editButtonStruct,
  deleteButtonStruct,
  getStaticColumns,
  popconfirmStruct,
  tableStruct,
} from "./struct";

import {
  getSections,
  setSectionModifyAction,
} from "../../../actions/section.action";

import SectionForm from "./components/SectionForm";

import { SecurePost } from "../../../services/axiosCall";
import apis from "../../../services/Apis";

const { Title } = Typography;

const AllSection = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();

  const section = useSelector((state) => state.section);
  const {
    sections,
    sectionsLoading,
    sectionModalState,
    sectionModalMode,
  } = section;

  const openModal = (sectionId, mode) =>
    dispatch(setSectionModifyAction(sectionId, true, mode));
  const closeModal = () =>
    dispatch(setSectionModifyAction(null, false, "COMPLETE"));

  const setMessage = (message) => messageApi.open({ ...message });

  const deleteSection = (sectionId) => {
    SecurePost({
      url: `${apis.SECTION}/delete`,
      data: { sectionId },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(getSections());
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
      <Popconfirm {...popconfirmStruct} onConfirm={() => deleteSection(key)}>
        <Button {...deleteButtonStruct} icon={<DeleteOutlined />} />
      </Popconfirm>
    </Space>
  );

  const columns = [...getStaticColumns(getActions)];

  useEffect(() => dispatch(getSections()), []);

  return (
    <>
      <Card>
        {contextHolder}
        <Flex {...headerStruct}>
          <Flex {...headingStruct.heading}>
            <Title {...headingStruct.title}>Sections</Title>

            <div>
              {sections && sections.length && (
                <Tag {...headingStruct.tag}>{sections.length}</Tag>
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
          dataSource={sections}
          loading={sectionsLoading}
        />
      </Card>
      <Modal
        open={sectionModalState}
        title={
          sectionModalMode === "CREATE"
            ? "Add New Section"
            : sectionModalMode === "UPDATE"
            ? "Update New Section"
            : ""
        }
        onCancel={closeModal}
        destroyOnClose={true}
        footer={[]}
      >
        <SectionForm setMessage={setMessage} />
      </Modal>
    </>
  );
};

export default AllSection;
