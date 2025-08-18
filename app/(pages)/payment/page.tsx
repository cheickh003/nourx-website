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
import { westAfricaCountries as countries } from "@/lib/west-africa-countries";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const formSchema = z.object({
  amount: z.coerce.number().min(1, { message: "Le montant doit être d'au moins 1" }),
  customer_name: z.string().min(1, { message: "Le nom du client est requis" }),
  customer_surname: z.string().min(1, { message: "Le prénom du client est requis" }),
  customer_email: z.string().email({ message: "Adresse email invalide" }),
  customer_phone_number: z.string().min(1, { message: "Le numéro de téléphone du client est requis" }),
  customer_address: z.string().min(1, { message: "L'adresse du client est requise" }),
  customer_city: z.string().min(1, { message: "La ville du client est requise" }),
  customer_country: z.string().min(1, { message: "Le pays du client est requis" }),
  customer_state: z.string().min(1, { message: "L'État/Région du client est requis" }),
  customer_zip_code: z.string().min(1, { message: "Le code postal du client est requis" }),
});


const PaymentPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 100,
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const transaction_id = Math.floor(Math.random() * 100000000).toString();

      const paymentData = {
        transaction_id,
        amount: values.amount,
        currency: 'XOF',
        channels: 'ALL',
        description: 'Paiement de facture',
        return_url: `${window.location.origin}/payment/success?transaction_id=${transaction_id}`,
        notify_url: `${window.location.origin}/api/cinetpay-notification`,
        customer_name: values.customer_name,
        customer_surname: values.customer_surname,
        customer_email: values.customer_email,
        customer_phone_number: values.customer_phone_number,
        customer_address: values.customer_address,
        customer_city: values.customer_city,
        customer_country: values.customer_country,
        customer_state: values.customer_state,
        customer_zip_code: values.customer_zip_code,
      };

      const response = await fetch('/api/cinetpay-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();

      if (response.ok && data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        toast({
          title: "Erreur de paiement",
          description: data.details || "Impossible de générer le lien de paiement. Veuillez réessayer.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur inattendue",
        description: "Une erreur inattendue est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
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

            <div className="space-y-8 border-t pt-8">
                <h2 className="text-xl font-bold">Informations client</h2>
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

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Chargement...' : 'Payer'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PaymentPage;
