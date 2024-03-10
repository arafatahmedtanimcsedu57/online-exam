import React from "react";
import { Typography, Flex, Divider } from "antd";

const { Text } = Typography;


const Question = ({question, index}) => {
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
    <p>
      {index + 1}) 
      {codeBlocks.map((block, _index) => (
        <div key={_index}>
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
    </p>
  )
}


const AnswerSheet = ({ answerSheet }) => {
  const {
    test: { questions },
  } = answerSheet;

  return (
    <Flex vertical>
      {questions.map((question, index) => (
        <>
          <Flex vertical>
            {/* <Text>{`${index + 1}). ${question.body}`}</Text> */}
            <Question index={index} question={question}/>
            <Text>{`Given Answer:: ${
              question.chosenOption ? question.chosenOption.optBody : "N/A"
            }`}</Text>
            {question.options.map((option) =>
              option.isAnswer ? (
                <Text>{`Correct Answer:: ${option.optBody}`}</Text>
              ) : (
                <></>
              )
            )}
          </Flex>
          <Divider />
        </>
      ))}
    </Flex>
  );
};

export default AnswerSheet;
