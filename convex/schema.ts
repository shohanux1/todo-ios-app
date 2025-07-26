import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,

  tasks: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
    userId: v.string(), // from `identity.subject`
  }),
});

export default schema;
