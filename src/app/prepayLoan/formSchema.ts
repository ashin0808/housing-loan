import { z } from "zod";

export default z.object({
  remainTotalLoanAmount: z.string().refine(
    (value) => {
      const numberValue = Number(value);
      return !isNaN(numberValue) && numberValue > 0;
    },
    {
      message: "剩余贷款总额必须大于0",
    }
  ),
  interestRate: z.string().refine(
    (value) => {
      const numberValue = Number(value);
      return !isNaN(numberValue) && numberValue > 0 && numberValue <= 100;
    },
    {
      message: "利率必须在0到100之间",
    }
  ),
  loanMaturityDate: z
    .string()
    .array()
    .length(2)
    .refine(
      ([year, month]) => {
        return year && month;
      },
      {
        message: "请选择贷款到期时间",
      }
    ),
  repaymentAmount: z.string().refine(
    (value) => {
      const numberValue = Number(value);
      return !isNaN(numberValue) && numberValue > 0;
    },
    {
      message: "还款金额必须大于0",
    }
  ),
  adjustmentPlan: z.enum(["reduceMonthlyPayment", "reduceLoanTerm"], {
    message: "请选择调整还款计划",
  }),
});