import classes from "./AddGuestForm.module.css";
import React, { useContext } from "react";
import UserContext from "../../../Store/user-context";

import { useForm } from "@mantine/form";
import {
  TextInput,
  Button,
  Group,
  Box,
  Select,
  NumberInput,
} from "@mantine/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastConfig } from "../../../Utils/Constants/toastConfig";

const AddGuestForm = ({ onClose }) => {
  const { addGuest } = useContext(UserContext);

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      side: "",
      group: "",
      attending: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = async () => {
    const guest = form.values;
    if (guest.attending > 0) {
      guest.status = "attending";
    } else {
      guest.status = "notAttending";
    }

    try {
      guest.invitation = false;
      await addGuest(guest);
      toast.success("Add guest successfully!", toastConfig);
    } catch (err) {
      toast.error("Add guest failed!", toastConfig);
    }
    onClose();
  };

  const nameInput = (
    <TextInput
      label="Name"
      required
      placeholder="Name"
      {...form.getInputProps("name")}
      onChange={(event) =>
        form.setFieldValue(`name`, event.currentTarget.value)
      }
    />
  );

  const emailInput = (
    <TextInput
      mt="md"
      required
      label="Email"
      placeholder="Email"
      {...form.getInputProps("email")}
      onChange={(event) =>
        form.setFieldValue(`email`, event.currentTarget.value)
      }
    />
  );
  const phoneInput = (
    <TextInput
      mt="md"
      required
      label="Phone"
      placeholder="Phone"
      {...form.getInputProps("phone")}
      onChange={(event) =>
        form.setFieldValue(`phone`, event.currentTarget.value)
      }
    />
  );

  const sideInput = (
    <Select
      label="Side"
      placeholder="Select Side"
      mt="10px"
      size="sm"
      required
      w="100%"
      onChange={(value) => form.setFieldValue("side", value)}
      data={[
        { label: "Bride and Groom", value: "brideAndGroom" },
        { label: "Bride", value: "bride" },
        { label: "Groom", value: "groom" },
      ]}
    />
  );

  const groupInput = (
    <Select
      label="Group"
      placeholder="Select Group"
      mt="10px"
      size="sm"
      required
      w="100%"
      onChange={(value) => form.setFieldValue("group", value)}
      data={[
        { label: "Family", value: "family" },
        { label: "Friends", value: "friends" },
        { label: "Work", value: "work" },
        { label: "Military", value: "military" },
      ]}
    />
  );

  const attendingInput = (
    <NumberInput
      mt="sm"
      required
      label="Attending"
      placeholder="Attending"
      min={0}
      max={7}
      {...form.getInputProps("attending")}
    />
  );

  const submitButton = (
    <Group position="center" mt="xl">
      <Button
        type="submit"
        mt="md"
        color="grape"
        radius="xl"
        styles={(theme) => ({
          root: {
            backgroundColor: "#5f41d9",
            border: 0,
            "&:not([data-disabled])": theme.fn.hover({
              backgroundColor: theme.fn.darken("#8069db", 0.05),
            }),
          },

          leftIcon: {
            marginRight: theme.spacing.md,
          },
        })}
      >
        Add guest
      </Button>
    </Group>
  );

  return (
    <div className={classes.addGuest}>
      <div className={classes.title}> Add Guest</div>
      <form className={classes.form} onSubmit={form.onSubmit(handleSubmit)}>
        <Box maw={500} mx="auto" bg="#F5F7FA" p="25px 30px" mt="10px">
          {nameInput}
          {emailInput}
          {phoneInput}
          {sideInput}
          {groupInput}
          {attendingInput}
          {submitButton}
        </Box>
      </form>
    </div>
  );
};

export default AddGuestForm;
