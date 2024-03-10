import React from "react";
import { Typography, Alert, Card, Divider, List } from "antd";

const { Title, Text } = Typography;

export default function trainerInstraction() {
  return (
    <Card>
      <Title level={2}>Instructor Instructions</Title>
      <Divider />

      <List>
        <List.Item>
          <List.Item.Meta
            title={"All Questions"}
            description={
              <>
                <Text>List of existing questions.</Text>
                <ul>
                  <li>
                    Add New - <Text strong>Create new question.</Text>
                  </li>
                  <li>
                    Action -
                    <ul>
                      <li>
                        <Text strong type="warning">
                          Delete question.
                        </Text>
                      </li>
                    </ul>
                  </li>

                  <li>
                    Filter -
                    <ul>
                      <li>
                        <Text strong mark type="secondary">
                          By Subject.
                        </Text>
                      </li>
                      <li>
                        <Text strong mark type="secondary">
                          By Tag.
                        </Text>
                      </li>
                    </ul>
                  </li>

                  <br />
                  <li>
                    <Text showIcon type="info" message="">
                      Select questions to create a new test.
                    </Text>
                  </li>
                </ul>
              </>
            }
          />
        </List.Item>

        <List.Item>
          <List.Item.Meta
            title={"All Tests"}
            description={
              <>
                <Text>List of existing tests</Text>
                <ul>
                  <li>
                    Create Test -
                    <Text strong>
                      Create Test with auto generated question paper
                    </Text>
                  </li>

                  <li>
                    Create Test Menually -
                    <Text strong>
                      Redirect to All Questions page to select questions for new
                      test
                    </Text>
                  </li>

                  <li>
                    Action -
                    <ul>
                      <li>
                        <Text strong type="success">
                          Question details & body.
                        </Text>
                      </li>
                      <li>
                        <Text strong type="warning">
                          Delete question.
                        </Text>
                      </li>
                    </ul>
                  </li>
                </ul>
              </>
            }
          />
        </List.Item>

        <List.Item>
          <List.Item.Meta
            title={"Conduct Test"}
            description={
              <>
                {/* <Text>List of existing tests</Text> */}
                <ul>
                  <li>Write a TEST ID to conduct that Test.</li>
                </ul>
              </>
            }
          />
        </List.Item>
      </List>
    </Card>
  );
}
