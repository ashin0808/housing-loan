"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import formSchema from "./formSchema";
import { calcFun } from "./calc";
import { ICalcResult } from "./types";

export function Calculate({
  className,
  onCalculate,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  onCalculate: (
    result: Record<"equalInstallment" | "equalPrincipal", ICalcResult>
  ) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "accumulation", // commerce-商业贷款, accumulation-公积金, combination-组合贷款
      totalLoanAmount: "100",
      combinationAccumulationAmount: "",
      combinationCommerceAmount: "",
      mortgageTerm: "30",
      interestRate: "3.55",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const result = calcFun(values);
    console.log(result);
    onCalculate(result);
  }

  return (
    <div className={cn("mx-2", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">房贷计算器</CardTitle>
          <CardDescription>
            选择您的贷款类别，输入贷款金额，抵押期限，贷款利率和还款方式以计算您的贷款信息。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>贷款类别</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="accumulation" />
                          </FormControl>
                          <FormLabel>公积金贷款</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="commerce" />
                          </FormControl>
                          <FormLabel>商业贷款</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="combination" disabled />
                          </FormControl>
                          <FormLabel>组合贷款</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormDescription>请选择一个贷款类别</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="totalLoanAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>贷款总额(万元)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="请输入贷款总额(万元)" />
                    </FormControl>
                    <FormDescription>请输入贷款总额(万元)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("category") === "combination" && (
                <>
                  <FormField
                    control={form.control}
                    name="combinationAccumulationAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Accumulation Fund Loan Amount</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter the accumulation fund loan amount"
                          />
                        </FormControl>
                        <FormDescription>
                          Please enter the accumulation fund loan amount.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="combinationCommerceAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Commerce Loan Amount</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter the commerce loan amount"
                          />
                        </FormControl>
                        <FormDescription>
                          Please enter the commerce loan amount.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <FormField
                control={form.control}
                name="mortgageTerm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>按揭年数</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter the mortgage term" />
                    </FormControl>
                    <FormDescription>请输入按揭年数</FormDescription>
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
                      <Input {...field} placeholder="Enter the interest rate" />
                    </FormControl>
                    <FormDescription>请输入利率(%)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">开始计算</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
