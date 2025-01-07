import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ICalcResult } from "../calculate/types";
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

interface RepaymentProps extends React.ComponentPropsWithoutRef<"div"> {
  result: Record<"equalInstallment" | "equalPrincipal", ICalcResult>;
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
              <div className="flex items-center">
                <div className="text-xl font-bold">每个月应还</div>
                <div className="text-2xl font-bold ml-1 text-red-400">
                  {result.equalInstallment.monthlyPayment}
                </div>
                <div className="text-xl font-bold ml-1">元</div>
                <div className="flex flex-col items-center ml-auto">
                  <div className="font-bold">
                    {result.equalInstallment.loanTermYears}年
                  </div>
                  <div className="text-sm">贷款年限</div>
                </div>
              </div>
              <Separator className="my-2" />
              <div className="flex items-center">
                <div className="flex flex-1 justify-around mr-2">
                  <div className="flex flex-col items-center">
                    <div className="font-bold">
                      {result.equalInstallment.totalPayment}万
                    </div>
                    <div className="text-sm">还款总额</div>
                  </div>
                  <div className="font-bold">=</div>
                  <div className="flex flex-col items-center">
                    <div className="font-bold">
                      {result.equalInstallment.loanAmount}万
                    </div>
                    <div className="text-sm">贷款总额</div>
                  </div>
                  <div className="font-bold">+</div>
                  <div className="flex flex-col items-center">
                    <div className="font-bold">
                      {result.equalInstallment.totalInterest}万
                    </div>
                    <div className="text-sm">利息总额</div>
                  </div>
                </div>
              </div>
              <div className="flex rounded-sm overflow-hidden mt-1">
                <div className="w-1/2 flex justify-center items-center text-sm bg-blue-400 text-white font-bold py-1">
                  {result.equalInstallment.loanRatio}%(贷款)
                </div>
                <div className="w-1/2 flex justify-center items-center text-sm bg-red-400 text-white font-bold py-1">
                  {result.equalInstallment.interestRatio}%(利息)
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
                {result.equalInstallment.paymentList.map((payment) => (
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
                每月还款金额递减约{result.equalPrincipal.decreasingAmount}
                元，其中每月还款的本金不变，利息逐月减少。计算结果仅供参考
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-xl font-bold">首月应还</div>
                <div className="text-2xl font-bold ml-1 text-red-400">
                  {result.equalPrincipal.firstMonthPayment}
                </div>
                <div className="text-xl font-bold ml-1">元</div>
                <div className="flex flex-col items-center ml-auto">
                  <div className="font-bold">
                    {result.equalPrincipal.loanTermYears}年
                  </div>
                  <div className="text-sm">贷款年限</div>
                </div>
              </div>
              <Separator className="my-2" />
              <div className="flex items-center">
                <div className="flex flex-1 justify-around mr-2">
                  <div className="flex flex-col items-center">
                    <div className="font-bold">
                      {result.equalPrincipal.totalPayment}万
                    </div>
                    <div className="text-sm">还款总额</div>
                  </div>
                  <div className="font-bold">=</div>
                  <div className="flex flex-col items-center">
                    <div className="font-bold">
                      {result.equalPrincipal.loanAmount}万
                    </div>
                    <div className="text-sm">贷款总额</div>
                  </div>
                  <div className="font-bold">+</div>
                  <div className="flex flex-col items-center">
                    <div className="font-bold">
                      {result.equalPrincipal.totalInterest}万
                    </div>
                    <div className="text-sm">利息总额</div>
                  </div>
                </div>
              </div>
              <div className="flex rounded-sm overflow-hidden mt-1">
                <div className="w-1/2 flex justify-center items-center text-sm bg-blue-400 text-white font-bold py-1">
                  {result.equalPrincipal.loanRatio}%(贷款)
                </div>
                <div className="w-1/2 flex justify-center items-center text-sm bg-red-400 text-white font-bold py-1">
                  {result.equalPrincipal.interestRatio}%(利息)
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
                {result.equalPrincipal.paymentList.map((payment) => (
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
