export enum ICategory {
  accumulation = "accumulation",
  commerce = "commerce",
  combination = "combination",
}

export type ICalcResult = {
  monthlyPayment: number; // 每月还款额
  firstMonthPayment: number; // 首月还款额
  decreasingAmount: number; // 递减金额
  totalPayment: number; // 总还款额
  loanAmount: number; // 贷款总额
  totalInterest: number; // 利息总额
  loanTermYears: number; // 贷款年限（年）
  loanTermMonths: number; // 贷款期限（月）
  loanRatio: number; // 贷款比例
  interestRatio: number; // 利息比例
  paymentList: IPayment[]; // 还款列表
}
export type IPayment = {
  issueNumber: number; // 期数
  monthlyTotalPayment: number; // 月供总额
  monthlyPrincipal: number; // 月供本金
  monthlyInterest: number; // 月供利息
}