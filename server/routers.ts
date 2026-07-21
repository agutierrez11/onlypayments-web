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
  b2b: router({
    searchIntros: publicProcedure
      .input(z.object({
        query: z.string().optional(),
        country: z.string().optional(),
        category: z.string().optional()
      }))
      .query(async ({ input }) => {
        // En producción ejecuta consulta HNSW + Cosine Distance en pgvector
        return [
          {
            id: "CONN-8941",
            company: "Rappi",
            companyCategory: "SuperApp / Marketplace",
            role: "Head of Payments & Fraud Strategy",
            normalizedRole: "ROLE_PAYMENTS_HEAD",
            country: "México",
            connectorName: "Carlos M. (Fintech Bar CDMX)",
            reputation: 4.95,
            community: "Fintech Bar MX",
            techStack: ["Adyen", "Cybersource", "Kount"],
            dataTrustWeight: 0.95,
            privacyHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
            matchingScore: 0.98,
            status: "VERIFIED"
          },
          {
            id: "CONN-7210",
            company: "Nu México (Nubank)",
            companyCategory: "Neobanco / Credit",
            role: "VP of Treasury & Merchant Acquiring",
            normalizedRole: "ROLE_FINANCE_CFO",
            country: "México",
            connectorName: "Valeria S. (PayTech Circle)",
            reputation: 4.90,
            community: "PayTech Latam",
            techStack: ["Local Acquiring", "Mastercard Send"],
            dataTrustWeight: 0.92,
            privacyHash: "8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4",
            matchingScore: 0.94,
            status: "VERIFIED"
          },
          {
            id: "CONN-6302",
            company: "Kavak",
            companyCategory: "E-Commerce / Retail",
            role: "Lead Payments Engineer & Orchestration",
            normalizedRole: "ROLE_TECH_CTO",
            country: "México",
            connectorName: "Alejandro R.",
            reputation: 4.88,
            community: "Engineering Leads MX",
            techStack: ["Stripe", "Spreedly", "ClearSale"],
            dataTrustWeight: 0.89,
            privacyHash: "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
            matchingScore: 0.91,
            status: "VERIFIED"
          }
        ];
      }),
    dataCrossing: publicProcedure
      .input(z.object({
        rawCsvText: z.string()
      }))
      .mutation(async ({ input }) => {
        const lines = input.rawCsvText.trim().split("\n").filter(l => l.trim().length > 0);
        const dataLines = lines[0]?.toLowerCase().includes("company") ? lines.slice(1) : lines;
        
        const results = dataLines.map((line, idx) => {
          const parts = line.split(",");
          const company = parts[0]?.trim() || "Empresa";
          const role = parts[1]?.trim() || "Decisor";
          const country = parts[2]?.trim() || "Latam";

          const isFinance = role.toLowerCase().includes("cfo") || role.toLowerCase().includes("finance");
          const hasConnector = idx % 2 === 0;

          return {
            id: `CROSS-${2000 + idx}`,
            company,
            role,
            country,
            normalizedRole: isFinance ? "ROLE_FINANCE_CFO" : "ROLE_PAYMENTS_HEAD",
            hasConnector,
            matchStatus: hasConnector ? "MATCH_DIRECTO" : "ENJAMBRE_OSINT",
            trustScore: 0.90 + (idx % 5) * 0.02
          };
        });

        return { success: true, count: results.length, matches: results };
      }),
    processStripeSplit: publicProcedure
      .input(z.object({
        introId: z.string(),
        amountUsd: z.number().default(150.00)
      }))
      .mutation(async ({ input }) => {
        // En producción ejecuta: Stripe PaymentIntent ($150) + Transfers (70% conector / 15% comunidad / 15% software)
        return {
          success: true,
          chargeId: `ch_simulated_${Date.now()}`,
          splitBreakdown: {
            total: input.amountUsd,
            connectorPayoutUsd: input.amountUsd * 0.70, // $105.00
            communityFundUsd: input.amountUsd * 0.15,   // $22.50
            softwareFeeUsd: input.amountUsd * 0.15      // $22.50
          }
        };
      })
  }),
});

export type AppRouter = typeof appRouter;
