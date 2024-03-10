import React from "react";
import { Typography, Card, Divider, List } from "antd";

const { Title, Text } = Typography;

export default function adminInstraction() {
  return (
    <Card>
      <Title level={2}>Admin Instructions</Title>
      <Divider />
      <List>
        <List.Item>
          <List.Item.Meta
            title={"All Instructors"}
            description={
              <>
                <Text>List of existing instructors.</Text>
                <ul>
                  <li>
                    Add New - <Text strong>Create new instructor account.</Text>
                  </li>
                  <li>
                    Action -
                    <ul>
                      <li>
                        <Text strong type="success">
                          Edit instructor details.
                        </Text>
                      </li>
                      <li>
                        <Text strong type="warning">
                          Delete instructor account.
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
            title={"All Courses"}
            description={
              <>
                <Text>List of existing courses.</Text>
                <ul>
                  <li>
                    Add New - <Text strong> Create new course. </Text>
                  </li>
                  <li>
                    Action -
                    <ul>
                      <li>
                        <Text strong type="success">
                          Edit course name.
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
            title={"All Semesters"}
            description={
              <>
                <Text>List of existing semesters.</Text>
                <ul>
                  <li>
                    Add New - <Text strong>Create new semester.</Text>
                  </li>
                  <li>
                    Action -
                    <ul>
                      <li>
                        <Text type="success" strong>
                          Edit semester name ans year.
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
            title={"All Sections"}
            description={
              <>
                <Text>List of existing sections.</Text>
                <ul>
                  <li>
                    Add New - <Text strong>Create new section.</Text>
                  </li>
                  <li>
                    Action -
                    <ul>
                      <li>
                        <Text type="success" strong>
                          Edit section name, trainer, semster, and student list.
                        </Text>
                      </li>
                      <li>
                        <Text type="warning" strong>
                          Delete semester.
                        </Text>
                      </li>
                    </ul>
                  </li>
                </ul>
              </>
            }
          />
        </List.Item>
      </List>
    </Card>
  );
}
