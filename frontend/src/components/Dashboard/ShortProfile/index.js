import React from "react";
import { useSelector } from "react-redux";

import { Card, Typography, Flex, Badge } from "antd";

import {
  profileStruct,
  profileSectionStruct,
  textStruct,
  badgeStruct,
} from "./struct";

const { Text, Title } = Typography;

const userType = {
  STUDENT: "STUDENT",
  ADMIN: "ADMIN",
  TRAINER: "INSTRUCTION",
};

const ShortProfile = () => {
  const user = useSelector((state) => state.user);

  return user.userDetails.name ? (
    <Badge.Ribbon
      text={
        user.userDetails.type
          ? userType[user.userDetails.type.toUpperCase()]
          : ""
      }
      {...badgeStruct}
    >
      <Card {...profileStruct}>
        <Flex {...profileSectionStruct}>
          <Title {...textStruct.title}>
            {user.userDetails.name.toUpperCase()}
          </Title>

          <Text {...textStruct.text}>{user.userDetails.emailId}</Text>
          <Text {...textStruct.text}>{user.userDetails.contact}</Text>
        </Flex>
      </Card>
    </Badge.Ribbon>
  ) : (
    <></>
  );
};

export default ShortProfile;
