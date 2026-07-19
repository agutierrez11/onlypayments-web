import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getNews, getNewsById, getPaymentStacks, getGuides, subscribeUser, getSubscriberByEmail, getCommunityPosts, insertCommunityPost, getCommentsByPostId, insertCommunityComment, upvotePost, upvoteComment, getFintechGlobeData } from "./db";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  news: router({
    list: publicProcedure.query(async ({ input }) => {
      // TODO: Implement filtering and pagination based on input
      return getNews();
    }),
    byId: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
      return getNewsById(input.id);
    }),
  }),
  paymentStacks: router({
    list: publicProcedure.query(async ({ input }) => {
      // TODO: Implement filtering and pagination based on input
      return getPaymentStacks();
    }),
  }),
  guides: router({
    list: publicProcedure.query(async ({ input }) => {
      // TODO: Implement filtering and pagination based on input
      return getGuides();
    }),
  }),
  subscribers: router({
    subscribe: publicProcedure.input(z.object({ email: z.string().email() })).mutation(async ({ input }) => {
      await subscribeUser(input.email);
      return { success: true };
    }),
    getByEmail: publicProcedure.input(z.object({ email: z.string().email() })).query(async ({ input }) => {
      return getSubscriberByEmail(input.email);
    }),
  }),
  community: router({
    listPosts: publicProcedure.input(z.object({
      sort: z.enum(['hot', 'new', 'top']).default('hot')
    })).query(async ({ input }) => {
      return getCommunityPosts(input.sort);
    }),
    createPost: publicProcedure.input(z.object({
      id: z.string(),
      title: z.string().min(3),
      body: z.string(),
      author: z.string(),
      authorTitle: z.string().default("Miembro"),
      tag: z.string().default("Opinión"),
      country: z.string().nullable()
    })).mutation(async ({ input }) => {
      await insertCommunityPost({
        id: input.id,
        title: input.title,
        body: input.body,
        author: input.author || "Anónimo",
        authorTitle: input.authorTitle,
        tag: input.tag,
        country: input.country
      });
      return { success: true };
    }),
    getComments: publicProcedure.input(z.object({
      postId: z.string()
    })).query(async ({ input }) => {
      return getCommentsByPostId(input.postId);
    }),
    addComment: publicProcedure.input(z.object({
      id: z.string(),
      postId: z.string(),
      author: z.string(),
      body: z.string().min(1)
    })).mutation(async ({ input }) => {
      await insertCommunityComment({
        id: input.id,
        postId: input.postId,
        author: input.author || "Anónimo",
        body: input.body
      });
      return { success: true };
    }),
    upvotePost: publicProcedure.input(z.object({
      postId: z.string()
    })).mutation(async ({ input }) => {
      await upvotePost(input.postId);
      return { success: true };
    }),
    upvoteComment: publicProcedure.input(z.object({
      commentId: z.string()
    })).mutation(async ({ input }) => {
      await upvoteComment(input.commentId);
      return { success: true };
    })
  }),
  fintechs: router({
    globeData: publicProcedure.query(async () => {
      return getFintechGlobeData();
    }),
  }),
});

export type AppRouter = typeof appRouter;
