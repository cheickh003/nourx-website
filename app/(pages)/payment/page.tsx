"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { westAfricaCountries as countries } from "@/lib/west-africa-countries";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  amount: z.coerce.number().min(1, { message: "Amount must be at least 1" }),
  paymentChannel: z.enum(["ALL", "MOBILE_MONEY"]),
  customer_name: z.string().optional(),
  customer_surname: z.string().optional(),
  customer_email: z.string().email({ message: "Invalid email address" }).optional(),
  customer_phone_number: z.string().optional(),
  customer_address: z.string().optional(),
  customer_city: z.string().optional(),
  customer_country: z.string().optional(),
  customer_state: z.string().optional(),
  customer_zip_code: z.string().optional(),
}).superRefine((data, ctx) => {
    if (data.paymentChannel === 'ALL') {
        if (!data.customer_name) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Customer name is required", path: ["customer_name"] });
        }
        if (!data.customer_surname) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Customer surname is required", path: ["customer_surname"] });
        }
        if (!data.customer_email) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Customer email is required", path: ["customer_email"] });
        }
        if (!data.customer_phone_number) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Customer phone number is required", path: ["customer_phone_number"] });
        }
        if (!data.customer_address) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Customer address is required", path: ["customer_address"] });
        }
        if (!data.customer_city) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Customer city is required", path: ["customer_city"] });
        }
        if (!data.customer_country) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Customer country is required", path: ["customer_country"] });
        }
        if (!data.customer_state) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Customer state is required", path: ["customer_state"] });
        }
        if (!data.customer_zip_code) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Customer zip code is required", path: ["customer_zip_code"] });
        }
    }
});


const PaymentPage = () => {
  const [paymentChannel, setPaymentChannel] = useState("ALL");
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 100,
      paymentChannel: "ALL",
      customer_name: "",
      customer_surname: "",
      customer_email: "",
      customer_phone_number: "",
      customer_address: "",
      customer_city: "",
      customer_country: "",
      customer_state: "",
      customer_zip_code: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const transaction_id = Math.floor(Math.random() * 100000000).toString();

    window.CinetPay.setConfig({
      apikey: process.env.NEXT_PUBLIC_CINETPAY_APIKEY!,
      site_id: process.env.NEXT_PUBLIC_CINETPAY_SITE_ID!,
      mode: 'PRODUCTION',
      notify_url: `${window.location.origin}/api/cinetpay-notification`
    });

    const paymentData = {
      transaction_id,
      amount: values.amount,
      currency: 'XOF',
      channels: values.paymentChannel === 'MOBILE_MONEY' ? 'MOBILE_MONEY' : 'ALL',
      description: 'Paiement de test',
      ... (values.paymentChannel === 'ALL' ? {
        customer_name: values.customer_name,
        customer_surname: values.customer_surname,
        customer_email: values.customer_email,
        customer_phone_number: values.customer_phone_number,
        customer_address: values.customer_address,
        customer_city: values.customer_city,
        customer_country: values.customer_country,
        customer_state: values.customer_state,
        customer_zip_code: values.customer_zip_code,
      } : {})
    };

    window.CinetPay.getCheckout(paymentData);
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && 'CinetPay' in window) {
      window.CinetPay.waitResponse(function(data: any) {
        if (data.status == "REFUSED") {
          toast({
            title: "Payment Failed",
            description: "Your payment has failed. Please try again.",
            variant: "destructive",
          })
        } else if (data.status == "ACCEPTED") {
            router.push('/payment/success');
        }
      });
      window.CinetPay.onError(function(err: any) {
        console.error(err);
        toast({
            title: "An error occurred",
            description: "An error occurred during the payment process. Please try again.",
            variant: "destructive",
        })
      });
    }
  }, [router, toast]);


  return (
    <>
    <Script src="https://cdn.cinetpay.com/seamless/main.js" />
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">CinetPay Payment</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-lg">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter amount" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paymentChannel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Method</FormLabel>
                <Select onValueChange={(value: "ALL" | "MOBILE_MONEY") => {
                    field.onChange(value);
                    setPaymentChannel(value);
                }} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a payment method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ALL">All payment methods</SelectItem>
                    <SelectItem value="MOBILE_MONEY">Mobile Money Only</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {paymentChannel === "ALL" && (
            <div className="space-y-8 border-t pt-8">
                <h2 className="text-xl font-bold">Customer Information (for card payments)</h2>
              <FormField
                control={form.control}
                name="customer_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customer_surname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Surname</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customer_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customer_phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="123456789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customer_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customer_city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer City</FormLabel>
                    <FormControl>
                      <Input placeholder="Anytown" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customer_country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Country</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {countries.map(country => (
                                <SelectItem key={country.code} value={country.code}>{country.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customer_state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer State</FormLabel>
                    <FormControl>
                      <Input placeholder="State" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customer_zip_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Zip Code</FormLabel>
                    <FormControl>
                      <Input placeholder="12345" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <Button type="submit">Pay</Button>
        </form>
      </Form>
    </div>
    </>
  );
};

export default PaymentPage;
