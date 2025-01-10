import { z } from "zod";

export default z
  .object({
    category: z.enum(["accumulation", "commerce", "combination"], {
      message: "请选择一个贷款类别",
    }),
    totalLoanAmount: z.string().refine(
      (value) => {
        const numberValue = Number(value);
        return (
          !isNaN(numberValue) && numberValue > 0
        )
      },
      {
        message: "贷款总额必须大于0",
      }
    ),
    accumulationAmount: z.string().optional(),
    commerceAmount: z.string().optional(),
    combinationAccumulationAmount: z.string().optional(),
    combinationCommerceAmount: z.string().optional(),
    mortgageTerm: z.string().refine(
      (value) => {
        const numberValue = Number(value);
        return (
          Number.isInteger(numberValue) && numberValue >= 1 && numberValue <= 30
        );
      },
      {
        message:
          "抵押贷款期限必须在1至30年之间，且为整数",
      }
    ),
    interestRate: z.string().refine(
      (value) => {
        const numberValue = Number(value);
        return !isNaN(numberValue) && numberValue >= 0 && numberValue <= 100;
      },
      {
        message: "利率必须在0到100之间",
      }
    ),
  })
  .superRefine((data, ctx) => {
    // 当 category 为 combination 时，combinationAccumulationAmount 和 combinationCommerceAmount 必填且为数字
    if (
      data.category === "combination" &&
      !data.combinationAccumulationAmount
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Combination accumulation amount is required.",
        path: ["combinationAccumulationAmount"],
      });
    } else if (
      data.category === "combination" &&
      isNaN(Number(data.combinationAccumulationAmount))
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Combination accumulation amount must be a number.",
        path: ["combinationAccumulationAmount"],
      });
    }

    if (data.category === "combination" && !data.combinationCommerceAmount) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Combination commerce amount is required.",
        path: ["combinationCommerceAmount"],
      });
    } else if (
      data.category === "combination" &&
      isNaN(Number(data.combinationCommerceAmount))
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Combination commerce amount must be a number.",
        path: ["combinationCommerceAmount"],
      });
    }
  });