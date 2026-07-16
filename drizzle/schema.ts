import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// TODO: Add your tables here

export const news = mysqlTable("news", {
  id: int("id").autoincrement().primaryKey(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  content: text("content"),
  impactAndTools: text("impact_and_tools"),
  sourceUrl: varchar("source_url", { length: 512 }).notNull(),
  imageUrl: varchar("image_url", { length: 512 }),
  publishedAt: timestamp("published_at").notNull(),
  country: varchar("country", { length: 64 }).notNull(),
  category: mysqlEnum("category", ["A2A", "transfronterizo", "IA", "regulación"]).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type News = typeof news.$inferSelect;
export type InsertNews = typeof news.$inferInsert;

export const paymentStacks = mysqlTable("payment_stacks", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  country: varchar("country", { length: 64 }).notNull(),
  businessModel: mysqlEnum("business_model", ["e-commerce", "SaaS", "remesas"]).notNull(),
  components: text("components"), // JSON string or markdown
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type PaymentStack = typeof paymentStacks.$inferSelect;
export type InsertPaymentStack = typeof paymentStacks.$inferInsert;

export const guides = mysqlTable("guides", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  category: varchar("category", { length: 128 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type Guide = typeof guides.$inferSelect;
export type InsertGuide = typeof guides.$inferInsert;

export const subscribers = mysqlTable("subscribers", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
  isActive: int("is_active").default(1).notNull(),
  unsubscribedAt: timestamp("unsubscribed_at"),
});

export type Subscriber = typeof subscribers.$inferSelect;
export type InsertSubscriber = typeof subscribers.$inferInsert;

export const communityPosts = mysqlTable("community_posts", {
  id: varchar("id", { length: 64 }).primaryKey(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  author: varchar("author", { length: 255 }).default("Anónimo").notNull(),
  authorTitle: varchar("author_title", { length: 128 }).default("Miembro").notNull(),
  tag: varchar("tag", { length: 128 }).default("Opinión").notNull(),
  country: varchar("country", { length: 128 }),
  upvotes: int("upvotes").default(1).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type CommunityPost = typeof communityPosts.$inferSelect;
export type InsertCommunityPost = typeof communityPosts.$inferInsert;

export const communityComments = mysqlTable("community_comments", {
  id: varchar("id", { length: 64 }).primaryKey(),
  postId: varchar("post_id", { length: 64 }).notNull(),
  author: varchar("author", { length: 255 }).default("Anónimo").notNull(),
  body: text("body").notNull(),
  upvotes: int("upvotes").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type CommunityComment = typeof communityComments.$inferSelect;
export type InsertCommunityComment = typeof communityComments.$inferInsert;
