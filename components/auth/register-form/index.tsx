"use client";

import { useGlobalStore } from "@/stores/useGlobalStore";
import { useRouter } from "next/navigation";

import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTrigger,
} from "$/reui/stepper";
import { Button } from "$/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "$/ui/card";
import { Spinner } from "$/ui/spinner";
import { LoginInfoForm } from "./login-info-form";
import { PersonalInfoForm } from "./personal-info-form";
import { Check } from "lucide-react";

export function RegisterForm() {
  const router = useRouter();

  const {
    registerFormStep: step,
    setRegisterFormStep: setStep,
  } = useGlobalStore();

  return (
    <Card className="w-sm max-w-xl min-w-3xs">
      <CardHeader>
        <CardTitle className="text-xl">إنشاء حساب</CardTitle>
        <CardAction>
          <Button
            onClick={() => router.push("/auth/login")}
            variant="link"
          >
            تسجيل الدخول
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Stepper
          indicators={{
            completed: <Check className="size-4" />,
            loading: <Spinner className="size-4" />,
          }}
          onValueChange={setStep}
          value={step}
        >
          <StepperNav className="px-16">
            <StepperItem
              className="pointer-events-none"
              step={1}
            >
              <StepperTrigger>
                <StepperIndicator>1</StepperIndicator>
              </StepperTrigger>
              <StepperSeparator />
            </StepperItem>
            <StepperItem
              className="pointer-events-none"
              step={2}
            >
              <StepperTrigger>
                <StepperIndicator>2</StepperIndicator>
              </StepperTrigger>
            </StepperItem>
          </StepperNav>
          <StepperPanel>
            <StepperContent value={1}>
              <PersonalInfoForm />
            </StepperContent>
            <StepperContent value={2}>
              <LoginInfoForm />
            </StepperContent>
          </StepperPanel>
        </Stepper>
      </CardContent>
    </Card>
  );
}
