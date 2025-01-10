"use client";

import { Repayment } from "@/components/repayment";
import { Calculate } from "../components/calculate";
import type { ICalcResult } from "@/components/calculate/types";
import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [result, setResult] =
    useState<Record<"equalInstallment" | "equalPrincipal", ICalcResult>>();

  function handleCalculatee(
    result: Record<"equalInstallment" | "equalPrincipal", ICalcResult>
  ) {
    setResult(result);
  }

  return (
    <div className="w-screen">
      <Calculate onCalculate={handleCalculatee} />
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
    </div>
  );
}
