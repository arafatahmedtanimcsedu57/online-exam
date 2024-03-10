import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import moment from "moment";

import {
  Layout,
  Menu,
  Divider,
  ConfigProvider,
  theme,
  Flex,
  Button,
  Typography,
  Spin,
  Image,
  Space,
} from "antd";

import Trainee from "./components/User";
import ExamCenter from "./components/ExamCenter";

import {
  contentStruct,
  layoutStruct,
  siderStruct,
  siderMenuStruct,
  headerStruct,
  logoStruct,
} from "./struct";

import BannerImg from "./images/banner.png";
import IUBImg from "./images/iub.png";

const { Header, Sider, Content } = Layout;
const { Text, Title } = Typography;

const MainPortal = () => {
  let [searchParams, _] = useSearchParams();
  const [testId, __] = useState(searchParams.get("testId"));
  const [traineeId, ___] = useState(searchParams.get("traineeId"));

  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleClick = () => setIsDarkMode((previousValue) => !previousValue);
  const { defaultAlgorithm, darkAlgorithm } = theme;

  const trainee = useSelector((state) => state.trainee);
  const {
    traineeInfo: { data, loading },
  } = trainee;

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: "#5a5ab5",
          colorTextSecondary: "#812990",
          colorError: "#ff8399",
          colorWarning: "#f6941c",
          fontFamily: '"Roboto Slab", serif',
        },
      }}
    >
      <Layout {...layoutStruct}>
        <Sider {...siderStruct}>
          {/* TEMPORARY LOGO */}

          <div style={{ padding: "8px 4px" }}>
            <div
              style={{
                height: "100%",
                width: "100%",

                border: "1px solid #5a5ab5",
                borderRadius: "6px",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Space>
                <Image {...logoStruct} src={IUBImg} />
                <Text>Independent University, Bangladesh</Text>
              </Space>
            </div>
          </div>

          <Menu {...siderMenuStruct}>{/* <Operations /> */}</Menu>

          <Divider />

          <Trainee id={traineeId} />

          <Divider />

          <Space>
            {" "}
            <Text>Brought to you by CCDS.AI</Text>{" "}
            <Image {...logoStruct} src={BannerImg} />
          </Space>
        </Sider>
        <Layout>
          <Header>
            <Flex {...headerStruct.header}>
              {loading && <Spin />}
              {data && (
                <Flex {...headerStruct.userInfo.user}>
                  {data.name && (
                    <Title {...headerStruct.userInfo.userTitle}>
                      Welcome back,
                      {data.name.trim().split(" ")[0] || "..."}{" "}
                    </Title>
                  )}
                  <Text {...headerStruct.userInfo.userText}>
                    {moment(new Date()).format("MMMM - DD, YYYY")}
                  </Text>
                </Flex>
              )}

              <Flex {...headerStruct.actions}>
                <Button onClick={handleClick}>
                  Change Theme to {isDarkMode ? "Light" : "Dark"}
                </Button>
              </Flex>
            </Flex>
          </Header>

          <Content {...contentStruct}>
            <ExamCenter testId={testId} traineeId={traineeId} />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default MainPortal;
