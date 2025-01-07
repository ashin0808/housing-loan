import formSchema from "./formSchema";
import { z } from "zod";
import type { ICalcResult, IPayment } from "./types";

/**
 * 计算等额本息的每月还款额和总利息
 * @param loanAmount 贷款总额（元）
 * @param annualInterestRate 年利率（例如 5% 输入 0.05）
 * @param loanTermYears 贷款期限（年）
 */
function calculateEqualInstallment(
  loanAmount: number,
  annualInterestRate: number,
  loanTermYears: number
): ICalcResult {
  const monthlyInterestRate = annualInterestRate / 12; // 月利率
  const loanTermMonths = loanTermYears * 12; // 贷款期限（月数）

  // 计算每月还款额
  const monthlyPayment =
    (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths)) /
    (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1);

  const totalPayment = monthlyPayment * loanTermMonths; // 还款总额
  const totalInterest = monthlyPayment * loanTermMonths - loanAmount; // 计算总利息
  const loanRatio = loanAmount / totalPayment * 100; // 贷款比例
  const interestRatio = totalInterest / totalPayment * 100; // 利息比例

  let remainingLoan = loanAmount; // 剩余本金
  const paymentList: IPayment[] = []; // 每月还款额列表
  for (let i = 0; i < loanTermMonths; i++) {
    const monthlyInterest = remainingLoan * monthlyInterestRate; // 月供利息
    const monthlyPrincipal = monthlyPayment - monthlyInterest; // 月供本金
    remainingLoan -= monthlyPrincipal; // 更新剩余本金
    paymentList.push({
      issueNumber: i + 1,
      monthlyTotalPayment: Number(monthlyPayment.toFixed(2)),
      monthlyPrincipal: Number(monthlyPrincipal.toFixed(2)),
      monthlyInterest: Number(monthlyInterest.toFixed(2)),
    });
  }

  return {
    monthlyPayment: Number(monthlyPayment.toFixed(2)),
    firstMonthPayment: 0,
    decreasingAmount: 0,
    totalPayment: Number(totalPayment.toFixed(2)),
    loanAmount: loanAmount,
    totalInterest: Number(totalInterest.toFixed(2)),
    loanTermYears: loanTermYears,
    loanTermMonths: loanTermMonths,
    loanRatio: Number(loanRatio.toFixed(2)),
    interestRatio: Number(interestRatio.toFixed(2)),
    paymentList: paymentList
  };
}

/**
 * 计算等额本金的每月还款额和总利息
 * @param loanAmount 贷款总额（元）
 * @param annualInterestRate 年利率（例如 5% 输入 0.05）
 * @param loanTermYears 贷款期限（年）
 */
function calculateEqualPrincipal(
  loanAmount: number,
  annualInterestRate: number,
  loanTermYears: number
): ICalcResult {
  const monthlyInterestRate = annualInterestRate / 12; // 月利率
  const loanTermMonths = loanTermYears * 12; // 贷款期限（月数）
  const monthlyPrincipal = loanAmount / loanTermMonths; // 每月本金

  let remainingLoan = loanAmount; // 剩余贷款
  let totalInterest = 0; // 总利息
  const paymentList: IPayment[] = []; // 每月还款额列表

  for (let i = 0; i < loanTermMonths; i++) {
    const monthlyInterest = remainingLoan * monthlyInterestRate; // 月供利息
    const monthlyTotalPayment = monthlyPrincipal + monthlyInterest; // 月供总额
    paymentList.push({
      issueNumber: i + 1,
      monthlyTotalPayment: Number(monthlyTotalPayment.toFixed(2)),
      monthlyPrincipal: Number(monthlyPrincipal.toFixed(2)),
      monthlyInterest: Number(monthlyInterest.toFixed(2)),
    });
    totalInterest += monthlyInterest; // 累加总利息
    remainingLoan -= monthlyPrincipal; // 更新剩余贷款
  }

  const totalPayment = loanAmount + totalInterest; // 总还款额
  const loanRatio = loanAmount / totalPayment * 100; // 贷款比例
  const interestRatio = totalInterest / totalPayment * 100; // 利息比例
  const decreasingAmount = loanAmount * monthlyInterestRate / loanTermMonths

  return {
    monthlyPayment: 0,
    firstMonthPayment: paymentList[0].monthlyTotalPayment,
    decreasingAmount: Number(decreasingAmount.toFixed(2)),
    totalPayment: Number(totalPayment.toFixed(2)),
    loanAmount: loanAmount,
    totalInterest: Number(totalInterest.toFixed(2)),
    loanTermYears: loanTermYears,
    loanTermMonths: loanTermMonths,
    loanRatio: Number(loanRatio.toFixed(2)),
    interestRatio: Number(interestRatio.toFixed(2)),
    paymentList: paymentList
  };
}

export function calcFun(form: z.infer<typeof formSchema>) {
  const totalLoanAmount = Number(form.totalLoanAmount) * 10000;
  const mortgageTerm = Number(form.mortgageTerm);
  const interestRate = Number(form.interestRate) / 100;
  if (form.category === "accumulation" || form.category === "commerce") {
    const equalInstallment = calculateEqualInstallment(
      totalLoanAmount,
      interestRate,
      mortgageTerm
    );
    const equalPrincipal = calculateEqualPrincipal(
      totalLoanAmount,
      interestRate,
      mortgageTerm
    );
    equalInstallment.totalPayment = Number((equalInstallment.totalPayment / 10000).toFixed(2));
    equalInstallment.loanAmount = Number((equalInstallment.loanAmount / 10000).toFixed(2));
    equalInstallment.totalInterest = Number((equalInstallment.totalInterest / 10000).toFixed(2));
    equalPrincipal.totalPayment = Number((equalPrincipal.totalPayment / 10000).toFixed(2));
    equalPrincipal.loanAmount = Number((equalPrincipal.loanAmount / 10000).toFixed(2));
    equalPrincipal.totalInterest = Number((equalPrincipal.totalInterest / 10000).toFixed(2));
    return {
      equalInstallment: equalInstallment,
      equalPrincipal: equalPrincipal,
    }
  } else {
    return {
      equalInstallment: calculateEqualInstallment(
        totalLoanAmount,
        interestRate,
        mortgageTerm
      ),
      equalPrincipal: calculateEqualPrincipal(
        totalLoanAmount,
        interestRate,
        mortgageTerm
      ),
    }
  }
}