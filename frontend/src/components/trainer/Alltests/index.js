import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Table,
  Typography,
  Card,
  Flex,
  Modal,
  Button,
  message,
  Space,
  Tag,
  Alert,
} from "antd";

import { getTests } from "../../../actions/trainerTest.action";
import { setTestAction } from "../../../actions/trainerTest.action";
import { getSectionBySubject } from "../../../actions/section.action";

import TestForm from "../../common/TestForm";
import CandidateResults from "./../../common/Result";

import { SecurePost } from "../../../services/axiosCall";
import apis from "../../../services/Apis";

import {
  headingStruct,
  getStaticColumns,
  tableStruct,
  actionButtonStruct,
  autoCreateButtonStruct,
  menuallyCreateButtonStruct,
  headerStruct,
} from "./struct";

const { Title, Text } = Typography;

const AllTests = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [currentTest, setCurrentTest] = useState(null);
  const [currentTestDetails, setCurrentTestDetails] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const trainerTest = useSelector((state) => state.trainerTest);
  const {
    trainerTests,
    trainerTestModalState,
    trainerTestsLoading,
  } = trainerTest;

  const trainerSubject = useSelector((state) => state.trainerSubject);
  const { trainerSubjects } = trainerSubject;

  const subjects = trainerSubjects.map((subject) => subject.subjectId);
  const trainerSubjectIds = subjects.map((subject) => subject._id);

  const openTestModal = (mode) => dispatch(setTestAction(true, mode));
  const closTestModal = () => dispatch(setTestAction(false, "COMPLETE"));
  const closeModal = () => {
    setCurrentTest(null);
    setCurrentTestDetails(null);
  };

  const setMessage = (message) => messageApi.open({ ...message });

  const publishResult = (testId) =>
    SecurePost({
      url: `${apis.PUBLISH_RESULTS}`,
      data: { testId },
    }).then((response) => {
      if (response.data.success) {
        setCurrentTest(testId);
      }
    });

  const getActions = (key, test) => {
    return trainerTests && test.testConducted ? (
      test.isResultGenerated ? (
        <Button onClick={() => setCurrentTest(key)}>Result</Button>
      ) : (
        <Button onClick={() => publishResult(key)}>Publish Result</Button>
      )
    ) : (
      <></>
    );
  };

  const columns = [...getStaticColumns(getActions)];

  const fetchTests = () => {
    if (trainerSubjectIds && trainerSubjectIds.length) {
      dispatch(getTests(trainerSubjectIds));
      dispatch(getSectionBySubject(trainerSubjectIds)); // I dont know why i use it here
    }
  };

  useEffect(() => {
    fetchTests();
  }, [trainerSubjects]);

  return (
    <>
      <Card>
        {contextHolder}
        <Alert message="Copy any Test ID to conduct it" type="info" />
        <br />
        <Flex {...headerStruct}>
          <Flex {...headingStruct.heading}>
            <Space>
              <Title {...headingStruct.title}>Tests</Title>
              <div>
                {trainerTests && trainerTests.length && (
                  <Tag {...headingStruct.tag}>{trainerTests.length}</Tag>
                )}
              </div>
            </Space>

            <Flex {...actionButtonStruct}>
              <Button
                {...autoCreateButtonStruct}
                onClick={() => openTestModal("START AUTO GENERATION")}
              >
                Create Test
              </Button>

              <Button
                {...menuallyCreateButtonStruct}
                onClick={() => navigate("/user/listquestions")}
              >
                Create Test Menually
              </Button>
            </Flex>
          </Flex>
        </Flex>

        <Table
          {...tableStruct}
          columns={columns}
          dataSource={trainerTests}
          loading={trainerTestsLoading}
        />
      </Card>

      <Modal
        open={trainerTestModalState}
        title="Create Test"
        onCancel={closTestModal}
        destroyOnClose={true}
        footer={[]}
      >
        <TestForm setMessage={setMessage} fetchTests={fetchTests} />
      </Modal>

      <Modal
        open={currentTest}
        title={
          currentTestDetails ? (
            <Flex vertical gap="middle">
              <Flex gap="middle">
                <Title level={5}>{currentTestDetails.title}</Title>
                <Text>~</Text>
                <Text type="secondary"> {currentTestDetails.type}</Text>
              </Flex>

              <Flex vertical>
                <Text>{currentTestDetails.subject.topic}</Text>
                <Text>Total Marks: {currentTestDetails.totalMarks}</Text>
              </Flex>
            </Flex>
          ) : (
            <></>
          )
        }
        onCancel={closeModal}
        destroyOnClose={true}
        footer={[]}
        width={1000}
      >
        <CandidateResults
          testId={currentTest}
          setCurrentTestDetails={setCurrentTestDetails}
        />
      </Modal>
    </>
  );
};

export default AllTests;
