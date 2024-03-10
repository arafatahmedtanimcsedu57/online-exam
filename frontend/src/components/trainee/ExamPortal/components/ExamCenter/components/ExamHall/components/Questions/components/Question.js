import React, { useState, useEffect } from "react";
import { Button, Typography, Flex, Card } from "antd";

import { Post } from "../../../../../../../../../../services/axiosCall.js";
import apis from "../../../../../../../../../../services/Apis";

import {
  questionInfoSectionStruct,
  questionSectionStruct,
  questionOptions,
  optionsSectionStruct,
  optionSectionStruct,
  optionNoStruct,
} from "./struct.js";

const {  Text } = Typography;


const CodeBlocks = ({question, index}) => {
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
      {index}) 
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

const Question = ({
  id,
  userId,
  selectedOptions,
  handleOptionSelection,
  resetOptionSelection,
  initialOptionSelection,
  questionIndex
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);

  useEffect(() => {
    if (id) {
      Post({
        url: `${apis.FETCH_SINGLE_QUESTION_BY_TRAINEE}`,
        data: {
          questionId: id,
          userId,
        },
      }).then((response) => {
        const {
          data: { success, data },
        } = response;
        if (success) {
          resetOptionSelection();
          setCurrentQuestion(data);
          initialOptionSelection(data.chosenOption);
        }
      });
    }
  }, [id]);

  return (
    <Card>
      {currentQuestion ? (
        <Flex {...questionInfoSectionStruct}>
          <Flex {...questionSectionStruct}>
            {/* <Text>{currentQuestion.body}</Text> */}
            <CodeBlocks index={questionIndex} question={currentQuestion}/>

            <Text>Marks: {currentQuestion.weightAge}</Text>
          </Flex>

          <Flex {...optionsSectionStruct}>
            {currentQuestion.options.map((option, i) => {
              return (
                <React.Fragment key={i}>
                  {selectedOptions.includes(option._id) ? (
                    <Flex {...optionSectionStruct}>
                      <Button
                        onClick={() => handleOptionSelection(option._id)}
                        type="primary"
                        {...optionNoStruct}
                      >
                        {questionOptions[i]}
                      </Button>
                      {option.optBody}
                    </Flex>
                  ) : (
                    <Flex {...optionSectionStruct}>
                      <Button
                        onClick={() => handleOptionSelection(option._id)}
                        {...optionNoStruct}
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
        </Flex>
      ) : (
        <></>
      )}
    </Card>
  );
};

export { Question };
