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
  amount: z.coerce.number().min(1, { message: "Le montant doit être d'au moins 1" }),
  paymentChannel: z.enum(["ALL", "MOBILE_MONEY"]),
  customer_name: z.string().optional(),
  customer_surname: z.string().optional(),
  customer_email: z.string().email({ message: "Adresse email invalide" }).optional(),
  customer_phone_number: z.string().optional(),
  customer_address: z.string().optional(),
  customer_city: z.string().optional(),
  customer_country: z.string().optional(),
  customer_state: z.string().optional(),
  customer_zip_code: z.string().optional(),
}).superRefine((data, ctx) => {
    if (data.paymentChannel === 'ALL') {
        if (!data.customer_name) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Le nom du client est requis", path: ["customer_name"] });
        }
        if (!data.customer_surname) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Le prénom du client est requis", path: ["customer_surname"] });
        }
        if (!data.customer_email) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "L'email du client est requis", path: ["customer_email"] });
        }
        if (!data.customer_phone_number) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Le numéro de téléphone du client est requis", path: ["customer_phone_number"] });
        }
        if (!data.customer_address) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "L'adresse du client est requise", path: ["customer_address"] });
        }
        if (!data.customer_city) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "La ville du client est requise", path: ["customer_city"] });
        }
        if (!data.customer_country) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Le pays du client est requis", path: ["customer_country"] });
        }
        if (!data.customer_state) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "L'État/Région du client est requis", path: ["customer_state"] });
        }
        if (!data.customer_zip_code) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Le code postal du client est requis", path: ["customer_zip_code"] });
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
      description: 'Paiement de facture',
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
            title: "Paiement échoué",
            description: "Votre paiement a échoué. Veuillez réessayer.",
            variant: "destructive",
          })
        } else if (data.status == "ACCEPTED") {
            router.push('/payment/success');
        }
      });
      window.CinetPay.onError(function(err: any) {
        console.error(err);
        toast({
            title: "Une erreur est survenue",
            description: "Une erreur est survenue pendant le processus de paiement. Veuillez réessayer.",
            variant: "destructive",
        })
      });
    }
  }, [router, toast]);


  return (
    <>
    <Script src="https://cdn.cinetpay.com/seamless/main.js" />
    <div className="container mx-auto pt-24 sm:pt-32 pb-16">
      <h1 className="text-3xl font-bold mb-5">Paiement facture</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-lg">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Montant</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Entrez le montant" {...field} />
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
                <FormLabel>Moyen de paiement</FormLabel>
                <Select onValueChange={(value: "ALL" | "MOBILE_MONEY") => {
                    field.onChange(value);
                    setPaymentChannel(value);
                }} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un moyen de paiement" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ALL">Tous les moyens de paiement</SelectItem>
                    <SelectItem value="MOBILE_MONEY">Mobile Money uniquement</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {paymentChannel === "ALL" && (
            <div className="space-y-8 border-t pt-8">
                <h2 className="text-xl font-bold">Informations client (pour les paiements par carte)</h2>
              <FormField
                control={form.control}
                name="customer_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du client</FormLabel>
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
                    <FormLabel>Prénom du client</FormLabel>
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
                    <FormLabel>Email du client</FormLabel>
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
                    <FormLabel>Numéro de téléphone du client</FormLabel>
                    <FormControl>
                      <Input placeholder="07xxxxxxxx" {...field} />
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
                    <FormLabel>Adresse du client</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Rue Principale" {...field} />
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
                    <FormLabel>Ville du client</FormLabel>
                    <FormControl>
                      <Input placeholder="Abidjan" {...field} />
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
                    <FormLabel>Pays du client</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez un pays" />
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
                    <FormLabel>État/Région du client</FormLabel>
                    <FormControl>
                      <Input placeholder="Région des Lagunes" {...field} />
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
                    <FormLabel>Code postal du client</FormLabel>
                    <FormControl>
                      <Input placeholder="00225" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <Button type="submit">Payer</Button>
        </form>
      </Form>
    </div>
    </>
  );
};

export default PaymentPage;
