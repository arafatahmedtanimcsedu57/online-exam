import React, { useState } from "react";

import {
  message,
  Statistic,
  Card,
  Badge,
  Flex,
  Typography,
  Tag,
  Button,
} from "antd";
import { CSVLink } from "react-csv";

import apis from "../../../services/Apis";
import { SecurePost } from "../../../services/axiosCall";

import { resultStruct, resultCardStruct } from "./struct";

const { Title, Text } = Typography;

const CandidateResult = ({ result }) => {
  return (
    <Card {...resultCardStruct}>
      <Statistic
        title={
          result.user ? (
            <>
              <Title level={4}>{result.user.name || "..."}</Title>
              <Tag>{result.student.studentId}</Tag>
              <br></br>
              <Text>{result.user.emailId}</Text>
            </>
          ) : (
            <></>
          )
        }
        value={result.score}
        precision={2}
      />
    </Card>
  );
};

const CandidateResults = ({ testId, setCurrentTestDetails }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [_currentTestDetails, _setCurrentTestDetails] = useState(null);

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const fetchResult = () => {
    setLoading(true);
    SecurePost({
      url: `${apis.GET_RESULTS}`,
      data: { testId },
    })
      .then((response) => {
        if (response.data.success) {
          const { test, result } = response.data.data || {};

          setResults(result);
          setCurrentTestDetails(test);
          _setCurrentTestDetails(test);
        } else messageApi.error(response.data.message);

        setLoading(false);
      })
      .catch(() => {
        messageApi.error("Server Error");
        setLoading(false);
      });
  };

  useState(() => {
    fetchResult();
  }, []);

  return (
    <>
      {contextHolder}
      {results && results.length ? (
        <>
          {/* <Button onClick={() => console.log(results)}>Download</Button> */}
          {_currentTestDetails && (
            <CSVLink
              data={
                results.length
                  ? results.map((result) => ({
                      ID: result.student.studentId,
                      Name: result.user.name,
                      Email: result.user.emailId,
                      Score: result.score,
                    }))
                  : []
              }
              filename={`${_currentTestDetails.title}.csv`}
              className="btn btn-primary"
              target="_blank"
            >
              Download Result
            </CSVLink>
          )}
          <Flex {...resultStruct.resultSection}>
            {results.map((result, index) => {
              return index ? (
                <CandidateResult result={result} />
              ) : (
                <Badge.Ribbon {...resultStruct.topperBadge}>
                  <CandidateResult result={result} />
                </Badge.Ribbon>
              );
            })}
          </Flex>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default CandidateResults;
