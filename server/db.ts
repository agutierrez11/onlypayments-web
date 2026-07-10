import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertGuide, InsertNews, InsertPaymentStack, InsertSubscriber, InsertUser, guides, news, paymentStacks, subscribers, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function insertNews(item: InsertNews) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot insert news: database not available");
    return;
  }
  await db.insert(news).values(item);
}

export async function getNews(limit: number = 10, offset: number = 0) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get news: database not available");
    return [];
  }
  return db.select().from(news).limit(limit).offset(offset).orderBy(desc(news.publishedAt));
}

export async function getNewsById(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get news: database not available");
    return undefined;
  }
  const result = await db.select().from(news).where(eq(news.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function insertPaymentStack(item: InsertPaymentStack) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot insert payment stack: database not available");
    return;
  }
  await db.insert(paymentStacks).values(item);
}

export async function getPaymentStacks(limit: number = 10, offset: number = 0) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get payment stacks: database not available");
    return [];
  }
  return db.select().from(paymentStacks).limit(limit).offset(offset).orderBy(desc(paymentStacks.createdAt));
}

export async function insertGuide(item: InsertGuide) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot insert guide: database not available");
    return;
  }
  await db.insert(guides).values(item);
}

export async function getGuides(limit: number = 10, offset: number = 0) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get guides: database not available");
    return [];
  }
  return db.select().from(guides).limit(limit).offset(offset).orderBy(desc(guides.createdAt));
}

export async function subscribeUser(email: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot subscribe user: database not available");
    return;
  }
  await db.insert(subscribers).values({ email });
}

export async function getSubscribers() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get subscribers: database not available");
    return [];
  }
  return db.select().from(subscribers).where(eq(subscribers.isActive, 1));
}

export async function unsubscribeUser(email: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot unsubscribe user: database not available");
    return;
  }
  await db.update(subscribers).set({ isActive: 0, unsubscribedAt: new Date() }).where(eq(subscribers.email, email));
}

export async function getSubscriberByEmail(email: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get subscriber: database not available");
    return undefined;
  }
  const result = await db.select().from(subscribers).where(eq(subscribers.email, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.
