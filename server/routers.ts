import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getNews, getNewsById, getPaymentStacks, getGuides, subscribeUser, getSubscriberByEmail } from "./db";

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
  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
