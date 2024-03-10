import { QuestionDetails } from "../../common/QuestionDetails";

export const headerStruct = {
  gap: "middle",
  vertical: true,
  justify: "space-between",
  wrap: "wrap",
};

export const headingStruct = {
  heading: {
    gap: "middle",
    justify: "space-between",
    align: "center",
    wrap: "wrap",
  },

  title: {
    level: 2,
  },

  tag: { color: "processing" },
};

export const actionButtonStruct = {
  gap: "middle",
  justify: "space-between",
  wrap: "wrap",
};

export const filterStruct = {
  gap: "middle",
  align: "center",
  wrap: "wrap",
};

export const subjectFilterStruct = {
  mode: "multiple",
  placeholder: "Select one or more subjects",
  style: { width: "200px" },
  allowClear: true,
  optionFilterProp: "s",
};

export const tagFilterStruct = {
  mode: "multiple",
  placeholder: "Select one or more tags",
  style: { width: "200px" },
  allowClear: true,
  optionFilterProp: "s",
};

export const addButtonStruct = {
  type: "primary",
};

export const uploadButtonStruct = {
  type: "primary",
  ghost: true,
};

export const createTestButtonStruct = {};

export const deleteButtonStruct = {
  type: "primary",
  shape: "circle",
  danger: true,
};

export const getStaticColumns = (getActions) => [
  {
    title: "Question Description",
    dataIndex: "_id",
    key: "_id",

    render: (id, data) => (
      <QuestionDetails details={data} extra={getActions(id)} />
    ),
  },
];

export const popconfirmStruct = {
  title: "Are you sure？",
  cancelText: "No",
  okText: "Yes",
};

export const tableStruct = {
  rowKey: "_id",
  pagination: { pageSize: 5 },
};
