import { z } from "zod";
import formSchema from "./formSchema";
import { calculateEqualInstallment, calculateEqualPrincipal } from "@/components/calculate/calc";
import dayjs from "dayjs";

export function calcFun(form: z.infer<typeof formSchema>) {
  const totalLoanAmount = Number(form.remainTotalLoanAmount);
  const interestRate = Number(form.interestRate) / 100;
  const mortgageTerm = dayjs(form.loanMaturityDate.join("-")).add(1, "month").diff(dayjs(), "month");

  const newTotalLoanAmount = totalLoanAmount - Number(form.repaymentAmount);

  const oldEqualInstallment = calculateEqualInstallment( // 老等额本息
    totalLoanAmount,
    interestRate,
    mortgageTerm
  );
  const oldEqualPrincipal = calculateEqualPrincipal( // 老等额本金
    totalLoanAmount,
    interestRate,
    mortgageTerm
  );
  const newEqualInstallment = calculateEqualInstallment( // 新等额本息
    newTotalLoanAmount,
    interestRate,
    mortgageTerm
  );
  const newEqualPrincipal = calculateEqualPrincipal( // 新等额本金
    newTotalLoanAmount,
    interestRate,
    mortgageTerm
  );

  const diffEqualInstallment = {
    monthlyPayment: oldEqualInstallment.monthlyPayment - newEqualInstallment.monthlyPayment,
    firstMonthPayment: 0,
    totalPayment: oldEqualInstallment.totalPayment - newEqualInstallment.totalPayment,
    totalInterest: oldEqualInstallment.totalInterest - newEqualInstallment.totalInterest,
    loanAmount: oldEqualInstallment.loanAmount - newEqualInstallment.loanAmount,
  }
  const diffEqualPrincipal = {
    monthlyPayment: 0,
    firstMonthPayment: oldEqualPrincipal.firstMonthPayment - newEqualPrincipal.firstMonthPayment,
    totalPayment: oldEqualPrincipal.totalPayment - newEqualPrincipal.totalPayment,
    totalInterest: oldEqualPrincipal.totalInterest - newEqualPrincipal.totalInterest,
    loanAmount: oldEqualPrincipal.loanAmount - newEqualPrincipal.loanAmount,
  }

  oldEqualInstallment.totalPayment = Number((oldEqualInstallment.totalPayment / 10000).toFixed(2));
  oldEqualInstallment.loanAmount = Number((oldEqualInstallment.loanAmount / 10000).toFixed(2));
  oldEqualInstallment.totalInterest = Number((oldEqualInstallment.totalInterest / 10000).toFixed(2));
  oldEqualPrincipal.totalPayment = Number((oldEqualPrincipal.totalPayment / 10000).toFixed(2));
  oldEqualPrincipal.loanAmount = Number((oldEqualPrincipal.loanAmount / 10000).toFixed(2));
  oldEqualPrincipal.totalInterest = Number((oldEqualPrincipal.totalInterest / 10000).toFixed(2));
  newEqualInstallment.totalPayment = Number((newEqualInstallment.totalPayment / 10000).toFixed(2));
  newEqualInstallment.loanAmount = Number((newEqualInstallment.loanAmount / 10000).toFixed(2));
  newEqualInstallment.totalInterest = Number((newEqualInstallment.totalInterest / 10000).toFixed(2));
  newEqualPrincipal.totalPayment = Number((newEqualPrincipal.totalPayment / 10000).toFixed(2));
  newEqualPrincipal.loanAmount = Number((newEqualPrincipal.loanAmount / 10000).toFixed(2));
  newEqualPrincipal.totalInterest = Number((newEqualPrincipal.totalInterest / 10000).toFixed(2));

  diffEqualInstallment.totalPayment = Number((diffEqualInstallment.totalPayment / 10000).toFixed(2));
  diffEqualInstallment.loanAmount = Number((diffEqualInstallment.loanAmount / 10000).toFixed(2));
  diffEqualInstallment.totalInterest = Number((diffEqualInstallment.totalInterest / 10000).toFixed(2));
  diffEqualInstallment.monthlyPayment = Number((diffEqualInstallment.monthlyPayment).toFixed(2));
  diffEqualPrincipal.totalPayment = Number((diffEqualPrincipal.totalPayment / 10000).toFixed(2));
  diffEqualPrincipal.loanAmount = Number((diffEqualPrincipal.loanAmount / 10000).toFixed(2));
  diffEqualPrincipal.totalInterest = Number((diffEqualPrincipal.totalInterest / 10000).toFixed(2));
  diffEqualPrincipal.firstMonthPayment = Number((diffEqualPrincipal.firstMonthPayment).toFixed(2));

  return {
    oldEqualInstallment: oldEqualInstallment,
    oldEqualPrincipal: oldEqualPrincipal,
    newEqualInstallment: newEqualInstallment,
    newEqualPrincipal: newEqualPrincipal,
    diffEqualInstallment: diffEqualInstallment,
    diffEqualPrincipal: diffEqualPrincipal,
  }
}