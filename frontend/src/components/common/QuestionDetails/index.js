import React from "react";
import moment from "moment";
import { Flex, Typography, Button, Tag, Divider, Badge, Space } from "antd";

import { getDifficulty } from "../../../utilities/difficulty.js";

import { questionInfoSectionStruct, questionOptions } from "./struct.js";

const { Text } = Typography;

export const QuestionDetails = (props) => {
  const question = props.details;
  const showMeta = !(props.showMeta === undefined || null)
    ? props.showMeta
    : true;
  const extra = props.extra ? props.extra : null;
  const difficultyInfo = getDifficulty(question.difficulty);

  const separateCode = (text) => {
    const codeBlocks = [];
    let currentStart = text.indexOf("```");

    while (currentStart !== -1) {
      const currentEnd = text.indexOf("```", currentStart + 3);
      if (currentEnd !== -1) {
        const code = text.substring(currentStart + 3, currentEnd).trim();
        const nonCodeBefore = text.substring(0, currentStart).trim();
        codeBlocks.push({ code, nonCodeBefore });
        text = text.substring(currentEnd + 3).trim();
        currentStart = text.indexOf("```");
      } else {
        break;
      }
    }

    // Handle the remaining non-code part after the last code block
    if (text.length > 0) {
      codeBlocks.push({ code: null, nonCodeBefore: text });
    }

    return codeBlocks;
  };

  const codeBlocks = separateCode(question.body);

  return (
    <>
      <Flex {...questionInfoSectionStruct.questionInfo}>
        <Flex {...questionInfoSectionStruct.question}>
          {codeBlocks.map((block, index) => (
            <div key={index}>
              {block.nonCodeBefore && (
                <>
                  <p>{block.nonCodeBefore}</p>
                </>
              )}
              {block.code && (
                <>
                  <pre>{block.code}</pre>
                </>
              )}
            </div>
          ))}

          <Text>{question.weightAge}</Text>
        </Flex>

        <Flex {...questionInfoSectionStruct.optionsStruct.options}>
          {question.options.map((option, i) => {
            return (
              <React.Fragment key={i}>
                {option.isAnswer ? (
                  <Flex
                    {...questionInfoSectionStruct.optionsStruct.optionStruct
                      .option}
                  >
                    <Button
                      type="primary"
                      success
                      {...questionInfoSectionStruct.optionsStruct.optionStruct
                        .optionNo}
                    >
                      {questionOptions[i]}
                    </Button>
                    {option.optBody}
                  </Flex>
                ) : (
                  <Flex
                    {...questionInfoSectionStruct.optionsStruct.optionStruct
                      .option}
                  >
                    <Button
                      {...questionInfoSectionStruct.optionsStruct.optionStruct
                        .optionNo}
                    >
                      {questionOptions[i]}
                    </Button>
                    {option.optBody}
                  </Flex>
                )}
              </React.Fragment>
            );
          })}
        </Flex>

        {showMeta ? (
          <Flex {...questionInfoSectionStruct.metaSectionStruct.metaSection}>
            <Text {...questionInfoSectionStruct.metaSectionStruct.creatorText}>
              {question.createdBy?.name || "..."}
            </Text>

            <Space>
              <Divider
                {...questionInfoSectionStruct.metaSectionStruct.divider}
              />

              <Text {...questionInfoSectionStruct.metaSectionStruct.dateText}>
                {moment(question.createdAt).format("DD/MM/YYYY")}
              </Text>
            </Space>

            <Space>
              <Divider
                {...questionInfoSectionStruct.metaSectionStruct.divider}
              />

              <Tag {...questionInfoSectionStruct.metaSectionStruct.subjectTag}>
                {question.subject?.topic || "..."}
              </Tag>
            </Space>

            <Space>
              <Divider
                {...questionInfoSectionStruct.metaSectionStruct.divider}
              />

              <Tag color={difficultyInfo.color}>
                {difficultyInfo.label || "..."}
              </Tag>
            </Space>

            <Space>
              <Divider
                {...questionInfoSectionStruct.metaSectionStruct.divider}
              />

              <Flex {...questionInfoSectionStruct.metaSectionStruct.tags}>
                {question.tags.map((tag, i) => {
                  return (
                    <Badge
                      color="rgb(45, 183, 245)"
                      count={tag.trim().toUpperCase().replaceAll("_", " ")}
                      style={{ padding: "0 8px" }}
                    />
                  );
                })}
              </Flex>
            </Space>
            {extra && (
              <Space>
                <Divider
                  {...questionInfoSectionStruct.metaSectionStruct.divider}
                />
                {extra}
              </Space>
            )}
          </Flex>
        ) : (
          <></>
        )}
      </Flex>
    </>
  );
};
