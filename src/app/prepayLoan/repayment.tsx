import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ICalcResult } from "@/components/calculate/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IDiffLoan } from "./types";

interface RepaymentProps extends React.ComponentPropsWithoutRef<"div"> {
  result: Record<
    | "oldEqualInstallment"
    | "oldEqualPrincipal"
    | "newEqualInstallment"
    | "newEqualPrincipal",
    ICalcResult
  > &
    Record<"diffEqualInstallment" | "diffEqualPrincipal", IDiffLoan>;
}

export function Repayment({ className, result, ...props }: RepaymentProps) {
  return (
    <div className={cn("", className)} {...props}>
      <Tabs defaultValue="equalInstallment" className="w-full px-2">
        <TabsList className="flex">
          <TabsTrigger value="equalInstallment" className="flex-1">
            等额本息
          </TabsTrigger>
          <TabsTrigger value="equalPrincipal" className="flex-1">
            等额本金
          </TabsTrigger>
        </TabsList>
        <TabsContent value="equalInstallment">
          <Card>
            <CardHeader>
              <CardTitle>等额本息</CardTitle>
              <CardDescription>
                每月还款金额不变，其中还款的本金逐月递增，利息逐月递减。计算结果仅供参考
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h4>
                每月还款金额降低
                <span className="text-red-400">
                  {result.diffEqualInstallment.monthlyPayment}
                </span>
                元
              </h4>
              <h4>
                总还款额降低
                <span className="text-red-400">
                  {result.diffEqualInstallment.totalPayment}=
                  {result.diffEqualInstallment.totalInterest}+
                  {result.diffEqualInstallment.loanAmount}
                </span>
                万
              </h4>
              <Separator className="my-2" />
              <div className="flex items-center">
                <div className="text-xl font-bold">每个月应还</div>
                <div className="text-2xl font-bold ml-1 text-red-400">
                  {result.newEqualInstallment.monthlyPayment}
                </div>
                <div className="text-xl font-bold ml-1">元</div>
                <div className="flex flex-col items-center ml-auto">
                  <div className="font-bold">
                    {result.newEqualInstallment.loanTermMonths}月
                  </div>
                  <div className="text-sm">贷款期限</div>
                </div>
              </div>
              <Separator className="my-2" />
              <div className="flex items-center">
                <div className="flex flex-1 justify-around mr-2">
                  <div className="flex flex-col items-center">
                    <div className="font-bold">
                      {result.newEqualInstallment.totalPayment}万
                    </div>
                    <div className="text-sm">还款总额</div>
                  </div>
                  <div className="font-bold">=</div>
                  <div className="flex flex-col items-center">
                    <div className="font-bold">
                      {result.newEqualInstallment.loanAmount}万
                    </div>
                    <div className="text-sm">贷款总额</div>
                  </div>
                  <div className="font-bold">+</div>
                  <div className="flex flex-col items-center">
                    <div className="font-bold">
                      {result.newEqualInstallment.totalInterest}万
                    </div>
                    <div className="text-sm">利息总额</div>
                  </div>
                </div>
              </div>
              <div className="flex rounded-sm overflow-hidden mt-1">
                <div className="w-1/2 flex justify-center items-center text-sm bg-blue-400 text-white font-bold py-1">
                  {result.newEqualInstallment.loanRatio}%(贷款)
                </div>
                <div className="w-1/2 flex justify-center items-center text-sm bg-red-400 text-white font-bold py-1">
                  {result.newEqualInstallment.interestRatio}%(利息)
                </div>
              </div>
            </CardContent>
          </Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4 text-center">期数</TableHead>
                <TableHead className="w-1/4 text-center">月供总额</TableHead>
                <TableHead className="w-1/4 text-center">月供本金</TableHead>
                <TableHead className="w-1/4 text-center">月供利息</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
          <ScrollArea className="h-40">
            <Table>
              <TableBody>
                {result.newEqualInstallment.paymentList.map((payment) => (
                  <TableRow key={payment.issueNumber}>
                    <TableCell className="w-1/4 text-center">
                      {payment.issueNumber}
                    </TableCell>
                    <TableCell className="w-1/4 text-center">
                      {payment.monthlyTotalPayment}
                    </TableCell>
                    <TableCell className="w-1/4 text-center">
                      {payment.monthlyPrincipal}
                    </TableCell>
                    <TableCell className="w-1/4 text-center">
                      {payment.monthlyInterest}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="equalPrincipal">
          <Card>
            <CardHeader>
              <CardTitle>等额本金</CardTitle>
              <CardDescription>
                每月还款金额递减约{result.newEqualPrincipal.decreasingAmount}
                元，其中每月还款的本金不变，利息逐月减少。计算结果仅供参考
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h4>
                首月还款金额降低
                <span className="text-red-400">
                  {result.diffEqualPrincipal.firstMonthPayment}
                </span>
                元
              </h4>
              <h4>
                总还款额降低
                <span className="text-red-400">
                  {result.diffEqualPrincipal.totalPayment}=
                  {result.diffEqualPrincipal.totalInterest}+
                  {result.diffEqualPrincipal.loanAmount}
                </span>
                万
              </h4>
              <Separator className="my-2" />
              <div className="flex items-center">
                <div className="text-xl font-bold">首月应还</div>
                <div className="text-2xl font-bold ml-1 text-red-400">
                  {result.newEqualPrincipal.firstMonthPayment}
                </div>
                <div className="text-xl font-bold ml-1">元</div>
                <div className="flex flex-col items-center ml-auto">
                  <div className="font-bold">
                    {result.newEqualPrincipal.loanTermMonths}月
                  </div>
                  <div className="text-sm">贷款期限</div>
                </div>
              </div>
              <Separator className="my-2" />
              <div className="flex items-center">
                <div className="flex flex-1 justify-around mr-2">
                  <div className="flex flex-col items-center">
                    <div className="font-bold">
                      {result.newEqualPrincipal.totalPayment}万
                    </div>
                    <div className="text-sm">还款总额</div>
                  </div>
                  <div className="font-bold">=</div>
                  <div className="flex flex-col items-center">
                    <div className="font-bold">
                      {result.newEqualPrincipal.loanAmount}万
                    </div>
                    <div className="text-sm">贷款总额</div>
                  </div>
                  <div className="font-bold">+</div>
                  <div className="flex flex-col items-center">
                    <div className="font-bold">
                      {result.newEqualPrincipal.totalInterest}万
                    </div>
                    <div className="text-sm">利息总额</div>
                  </div>
                </div>
              </div>
              <div className="flex rounded-sm overflow-hidden mt-1">
                <div className="w-1/2 flex justify-center items-center text-sm bg-blue-400 text-white font-bold py-1">
                  {result.newEqualPrincipal.loanRatio}%(贷款)
                </div>
                <div className="w-1/2 flex justify-center items-center text-sm bg-red-400 text-white font-bold py-1">
                  {result.newEqualPrincipal.interestRatio}%(利息)
                </div>
              </div>
            </CardContent>
          </Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4 text-center">期数</TableHead>
                <TableHead className="w-1/4 text-center">月供总额</TableHead>
                <TableHead className="w-1/4 text-center">月供本金</TableHead>
                <TableHead className="w-1/4 text-center">月供利息</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
          <ScrollArea className="h-40">
            <Table>
              <TableBody>
                {result.newEqualPrincipal.paymentList.map((payment) => (
                  <TableRow key={payment.issueNumber}>
                    <TableCell className="w-1/4 text-center">
                      {payment.issueNumber}
                    </TableCell>
                    <TableCell className="w-1/4 text-center">
                      {payment.monthlyTotalPayment}
                    </TableCell>
                    <TableCell className="w-1/4 text-center">
                      {payment.monthlyPrincipal}
                    </TableCell>
                    <TableCell className="w-1/4 text-center">
                      {payment.monthlyInterest}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
