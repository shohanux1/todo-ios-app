import { Auth } from "convex/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const getUserId = async (ctx: { auth: Auth }) => {
  return (await ctx.auth.getUserIdentity())?.subject;
};

export const get = query({
  args: {},
  handler: async ({ db, auth }) => {
    const user = await auth.getUserIdentity();

    if (!user) {
      throw new Error("Not authenticated");
    }

    const userId = user.subject.split("|")[0];

    return await db
      .query("tasks")
      .filter((q) => q.eq(q.field("userId"), userId))
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
    const user = await auth.getUserIdentity();
    if (!user) {
      throw new Error("Not authenticated");
    }

    const userId = user.subject.split("|")[0];

    await db.insert("tasks", {
      text,
      isCompleted: false,
      userId, 
    });
  },
});


export const getUser = query({
  handler: async ({ auth, db }) => {
    const identity = await auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const rawUserId = identity.subject.split("|")[0];
    const userId = db.normalizeId("users", rawUserId);
    if (!userId) throw new Error("Invalid user ID");

    return await db.get(userId); // much faster than querying
  },
});