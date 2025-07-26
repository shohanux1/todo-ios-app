import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const get = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    return await ctx.db
      .query("tasks")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .collect();
  },
});

export const toggle = mutation({
  args: { id: v.id("tasks"), isCompleted: v.boolean() },
  handler: async ({ db }, { id, isCompleted }) => {
    await db.patch(id, { isCompleted });
  },
});

export const remove = mutation({
  args: { id: v.id("tasks") },
  handler: async ({ db }, { id }) => {
    await db.delete(id);
  },
});


export const create = mutation({
  args: { text: v.string() },
  handler: async ({ db, auth }, { text }) => {
    const userId = await auth.getUserIdentity();
    if (!userId) {
      throw new Error("Not authenticated");
    }

    await db.insert("tasks", {
      text,
      isCompleted: false,
      userId: userId.subject,
    });
  },
});