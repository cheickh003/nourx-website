"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  amount: z.coerce.number().min(1, { message: "Le montant doit être d'au moins 1" }),
});

export default function PaymentLinkGenerator() {
  const [link, setLink] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { amount: 100 },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const generatedLink = `${window.location.origin}/payment?amount=${values.amount}`;
    setLink(generatedLink);
  }

  return (
    <div className="container mx-auto pt-24 sm:pt-32 pb-16">
      <h1 className="text-3xl font-bold mb-5">Générer un lien de paiement</h1>
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
          <Button type="submit">Générer</Button>
        </form>
      </Form>
      {link && (
        <div className="mt-4 break-all">
          <p className="font-medium">Lien généré :</p>
          <a href={link} className="text-blue-500 underline">{link}</a>
        </div>
      )}
    </div>
  );
}

