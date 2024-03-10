import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import moment from "moment";

import {
  Layout,
  Menu,
  Button,
  message,
  Divider,
  Typography,
  Flex,
  Image,
  Space,
} from "antd";
import * as AntdIcons from "@ant-design/icons";

import Welcome from "./Welcome";
import ShortProfile from "./ShortProfile";
import TrainerSubject from "./TrainerSubject";
import AdminInstraction from "./adminInstraction.js";
import TrainerInstraction from "./trainerInstruction.js";

import AllTopics from "../admin/AllTopics";
import AllTrainer from "../admin/AllTrainer";
import AllSemester from "../admin/AllSemester";

import AllSection from "../admin/AllSection/index.js";
import AllQuestions from "../trainer/Allquestions";
import AllTests from "../trainer/Alltests";
import ConductTest from "../trainer/ConductTest";

import { PermissionError } from "../Errors";

import {
  layoutStruct,
  headerStruct,
  siderStruct,
  siderMenuIcon,
  siderMenuStruct,
  contentStruct,
  signOutButtonStruct,
  logoStruct,
} from "./struct.js";

import auth from "../../services/auth.services.js";

import { login } from "../../actions/login.action";

import BannerImg from "./images/banner.png";
import IUBImg from "./images/iub.png";

const { Header, Sider, Content } = Layout;
const { Text, Title } = Typography;

const Dashboard = ({ isDarkMode, handleTheme }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const subUrl = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { userOptions } = user;
  const userAccess = userOptions.map((option) => option.link);

  const [localIsLoggedIn, setLocalIsLoggedIn] = useState(user.isLoggedIn);

  const token = auth.retriveToken();

  const logOut = () => {
    auth.deleteToken();
    window.location.href = "/";
  };

  useEffect(() => {
    if (localIsLoggedIn) {
    } else if (token) {
      auth
        .FetchAuth(token)
        .then((response) => {
          dispatch(login(response.data.user));
          setLocalIsLoggedIn(true);
        })
        .catch((error) => {
          messageApi.warning("Server Error.");
          auth.deleteToken();
          window.location.href = "/";
        });
    } else window.location = "/";
  }, []);

  let torender = null;

  if (
    subUrl.options === "listtrainers" &&
    userAccess.includes("/user/listtrainers")
  )
    torender = <AllTrainer />;
  else if (
    subUrl.options === "semesters" &&
    userAccess.includes("/user/semesters")
  )
    torender = <AllSemester />;
  else if (
    subUrl.options === "sections" &&
    userAccess.includes("/user/sections")
  )
    torender = <AllSection />;
  else if (
    subUrl.options === "listsubjects" &&
    userAccess.includes("/user/listsubjects")
  )
    torender = <AllTopics />;
  else if (
    subUrl.options === "listquestions" &&
    userAccess.includes("/user/listquestions")
  )
    torender = <AllQuestions />;
  else if (
    subUrl.options === "listtests" &&
    userAccess.includes("/user/listtests")
  )
    torender = <AllTests />;
  else if (
    subUrl.options === "conducttest" &&
    userAccess.includes("/user/conducttest")
  )
    torender = <ConductTest />;
  else if (subUrl.options === "home" && userAccess.includes("/user/home"))
    torender = (
      <Welcome>
        {user.userDetails.type === "TRAINER" && <TrainerInstraction />}
        {user.userDetails.type === "ADMIN" && <AdminInstraction />}
      </Welcome>
    );
  else torender = <PermissionError />;

  return (
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

        <Menu {...siderMenuStruct} defaultSelectedKeys={[user.activeRoute]}>
          {user.userOptions.map((d, i) => {
            const AntdIcon = AntdIcons[siderMenuIcon[d.icon]];
            return (
              <Menu.Item key={i}>
                <AntdIcon />
                <Text>{d.display}</Text>
                <Link to={d.link}></Link>
              </Menu.Item>
            );
          })}
        </Menu>

        <Divider />

        <ShortProfile />

        {user.userDetails.type === "TRAINER" && (
          <>
            <Divider />
            <TrainerSubject />
          </>
        )}

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
            {user && user.userDetails && (
              <Flex {...headerStruct.userInfo.user}>
                {user.userDetails.name && (
                  <Title {...headerStruct.userInfo.userTitle}>
                    Welcome back,
                    {user.userDetails.name.trim().split(" ")[0] || "..."}{" "}
                  </Title>
                )}
                <Text {...headerStruct.userInfo.userText}>
                  {moment(new Date()).format("MMMM - DD, YYYY")}
                </Text>
              </Flex>
            )}

            <Flex {...headerStruct.actions}>
              <Button onClick={handleTheme}>
                Change Theme to {isDarkMode ? "Light" : "Dark"}
              </Button>
              <Button
                {...signOutButtonStruct}
                icon={<AntdIcons.PoweroffOutlined />}
                onClick={() => logOut()}
              >
                Sign Out
              </Button>
            </Flex>
          </Flex>
        </Header>
        <Content {...contentStruct}>
          {contextHolder}
          {torender}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
