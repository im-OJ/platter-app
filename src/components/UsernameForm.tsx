import * as React from "react";
import { Form, Input, Button, Typography, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Mutation, MutationUpdateUserArgs } from "../generated/graphql";
import { useMutation, gql } from "@apollo/client";
export const UsernameForm = (props: any) => {
  const [username, setUsername] = useState<string>();
  const [error, setError] = useState<string>();

  const [submitUsername] = useSetUsername();
  const onSubmit = () => {
    submitUsername({
      variables: {
        data: {
          username: username,
        },
      },
    })
      .then(() => {
        console.log("done");
      })
      .catch((e) => {
        setError(e.message);
      });
  };
  return (
    <Modal
      title={null}
      footer={null}
      visible={true}
      centered
      width={350}
      closable={false}
      afterClose={() => {}}
    >
      <Form
        name="normal_login"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => {
              onSubmit();
            }}
            style={{
              width: "100%",
            }}
          >
            Submit
          </Button>
        </Form.Item>
        <Typography style={{ color: "red" }}>{error}</Typography>
      </Form>
    </Modal>
  );
};

const mutation = gql`
  mutation SetUsername($data: UpdateUser) {
    updateUser(data: $data) {
      id
    }
  }
`;

const useSetUsername = () => {
  return useMutation<Mutation["updateUser"], MutationUpdateUserArgs>(mutation);
};
