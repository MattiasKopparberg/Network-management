import type { CrudConfig } from "@/app/types/CRUD";
import type { PublicUser } from "@/app/types/user";

export const userConfig: CrudConfig<PublicUser> = {
  title: "Users",
  entityName: "User",
  endpoint: "http://localhost:5000/users",

  columns: [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "fname",
      label: "First Name",
    },
    {
      key: "lname",
      label: "Last Name",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "user_group",
      label: "Group",
    },
  ],

  fields: [
    {
      name: "fname",
      label: "First Name",
      type: "text",
    },
    {
      name: "lname",
      label: "Last Name",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      required: true,
    },
    {
      name: "user_group",
      label: "User Group",
      type: "text",
      required: true,
    },
  ],

  getId: (user) => user.id,
};