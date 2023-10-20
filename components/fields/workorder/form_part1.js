import React, { useEffect, useState } from "react";
import {
  Box,
  NumberInput,
  Select,
  SimpleGrid,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { FieldsArray } from "./fields_form1";
import DatePicker from "@/components/DatePicker";
import CustomDataTable from "@/components/cutterListModal";
import OrderDataTable from "@/components/OrderListModal";
import styles from "./add_workorder.module.css";
import { UserManagement } from "@/utils/UserManagement";
export default function FormPart1(props) {
  const [showModal, setShowModal] = useState(false);
  const [showOrderModal, setOrderShowModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const {form,isEditing} = props;
  const fields = FieldsArray();
  useEffect(() => {
    const profile_data = JSON.parse(
      UserManagement.getItem("profile_data") || "{}"
    );
    const client_id = profile_data?.client === 1;
    setVisible(client_id);
  }, []);

  return (
    <SimpleGrid cols={3}>
      <CustomDataTable
        setShowModal={setShowModal}
        showModal={showModal}
        form={form}
      />
      <OrderDataTable
        form={form}
        setOrderShowModal={setOrderShowModal}
        showOrderModal={showOrderModal}
      />
      {fields.map((field, i) => {
        const { name, type, ...props } = field;

        if (type === "select") {
          return (
            <Select
              key={i}
              placeholder="Pick one"
              value={form.values[field.name]}
              {...form.getInputProps(name)}
              {...props}
            />
          );
        }
        if (type === "label") {
          return (
            <div key={i}>
              <TextInput {...props} />
            </div>
          );
        }

        if (type === "date") {
          return (
            <div key={i}>
              <DatePicker name={name} form={form} {...props} id={name + i} />
            </div>
          );
        }
        if (type === "number") {
          return (
            <div key={i}>
              <NumberInput
                min={0}
                {...props}
                removeTrailingZeros
                {...form.getInputProps(name)}
              />
            </div>
          );
        }

        if (name == "order_no") {
          return (
            <Box key={i}>
              <Select
                {...form.getInputProps(name)}
                {...props}
                onClick={() => setOrderShowModal(true)}
              />
              {visible == 1 &&
                name == "order_no" &&
                (!isEditing ||
                  (isEditing && form.values.workorder_status == "PENDING")) && (
                  <UnstyledButton
                    onClick={() => setOrderShowModal(true)}
                    className={styles.selectbutton}
                  >
                    select
                  </UnstyledButton>
                )}
            </Box>
          );
        }
        // Default to TextInput for other types
        return <TextInput key={i} {...form.getInputProps(name)} {...props} />;
      })}
    </SimpleGrid>
  );
}
