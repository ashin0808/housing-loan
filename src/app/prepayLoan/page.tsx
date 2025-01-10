"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dayjs from "dayjs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import formSchema from "./formSchema";
import { calcFun } from "./calc";
import { useState } from "react";
import { ICalcResult } from "@/components/calculate/types";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Repayment } from "./repayment";
import { IDiffLoan } from "./types";
import { useRouter } from "next/navigation";

const yearOptions = Array.from({ length: 31 }, (_, index) => {
  const year = dayjs().year() + index;
  return { label: year.toString(), value: year.toString() };
});
const monthOptions = Array.from({ length: 12 }, (_, index) => {
  const month = index + 1;
  return { label: month.toString(), value: month.toString() };
});

export default function PrepayLoan() {
  const [result, setResult] = useState<
    Record<
      | "oldEqualInstallment"
      | "oldEqualPrincipal"
      | "newEqualInstallment"
      | "newEqualPrincipal",
      ICalcResult
    > &
      Record<"diffEqualInstallment" | "diffEqualPrincipal", IDiffLoan>
  >();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      remainTotalLoanAmount: "759511.07",
      interestRate: "3.0",
      loanMaturityDate: ["2051", "7"],
      repaymentAmount: "50000",
      adjustmentPlan: "reduceMonthlyPayment",
    },
  });

  const router = useRouter();

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const result = calcFun(values);
    console.log(result);
    setResult(result);
  }

  return (
    <>
      <Card className="mx-2 mt-2">
        <CardHeader>
          <CardTitle>提前还贷</CardTitle>
          <CardDescription>提前还贷计算器，计算结果仅供参考</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="remainTotalLoanAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>剩余贷款总额(元)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="请输入剩余贷款总额(元)" />
                    </FormControl>
                    <FormDescription>请输入剩余贷款总额(元)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="interestRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>利率(%)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="请输入利率(%)" />
                    </FormControl>
                    <FormDescription>请输入利率(%)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="loanMaturityDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>贷款到期时间</FormLabel>
                    <FormControl>
                      <div className="flex space-x-2">
                        <Select
                          onValueChange={(value) => {
                            form.setValue("loanMaturityDate.0", value);
                            form.trigger("loanMaturityDate");
                          }}
                          defaultValue={field.value[0]}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="选择年份" />
                          </SelectTrigger>
                          <SelectContent>
                            {yearOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}年
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select
                          onValueChange={(value) => {
                            form.setValue("loanMaturityDate.1", value);
                            form.trigger("loanMaturityDate");
                          }}
                          defaultValue={field.value[1]}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="选择月份" />
                          </SelectTrigger>
                          <SelectContent>
                            {monthOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}月
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </FormControl>
                    <FormDescription>请选择贷款到期时间</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="repaymentAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>还款金额(元)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="请输入还款金额(元)" />
                    </FormControl>
                    <FormDescription>请输入还款金额(元)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="adjustmentPlan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>调整还款计划</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="reduceMonthlyPayment" />
                          </FormControl>
                          <FormLabel>减少月供金额</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="reduceLoanTerm" disabled />
                          </FormControl>
                          <FormLabel>缩短贷款期限</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormDescription>请选择调整还款计划</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormControl>
                <div className="flex">
                  <Button type="submit">开始计算</Button>
                  <Button
                    variant="link"
                    type="button"
                    onClick={() => router.back()}
                  >
                    返回
                  </Button>
                </div>
              </FormControl>
            </form>
          </Form>
        </CardContent>
      </Card>
      {result && (
        <Drawer open={!!result} onClose={() => setResult(undefined)}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>还款详情</DrawerTitle>
              <DrawerDescription>计算结果仅供参考</DrawerDescription>
            </DrawerHeader>
            <Repayment result={result} />
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">关闭</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
