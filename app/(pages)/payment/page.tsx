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
import { CreditCard, User, MapPin, Loader2, Shield, CheckCircle } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-nourx-gray-50 to-white pt-24 sm:pt-32 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex p-3 bg-nourx-blue/10 rounded-full mb-6">
            <CreditCard className="w-8 h-8 text-nourx-blue" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-nourx-black mb-4">
            Paiement sécurisé
          </h1>
          <p className="text-nourx-gray-600 text-lg">
            Effectuez votre paiement en toute sécurité
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-nourx-gray-200 overflow-hidden">
          {/* Security Banner */}
          <div className="bg-green-50 border-b border-green-100 px-6 py-4">
            <div className="flex items-center gap-2 text-green-700">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Paiement sécurisé avec CinetPay</span>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 sm:p-8">
              {/* Amount Section */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-nourx-blue/10 rounded-lg">
                    <CreditCard className="w-5 h-5 text-nourx-blue" />
                  </div>
                  <h2 className="text-xl font-semibold text-nourx-black">Montant à payer</h2>
                </div>
                
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-nourx-gray-700">
                        Montant (FCFA)
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type="number" 
                            placeholder="Entrez le montant" 
                            className="pl-12 py-3 text-lg font-semibold border-nourx-gray-200 focus:border-nourx-blue focus:ring-nourx-blue/20" 
                            {...field} 
                          />
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-nourx-gray-500 font-medium">
                            XOF
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Customer Information Section */}
              <div className="border-t border-nourx-gray-100 pt-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-nourx-blue/10 rounded-lg">
                    <User className="w-5 h-5 text-nourx-blue" />
                  </div>
                  <h2 className="text-xl font-semibold text-nourx-black">Informations client</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="customer_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-nourx-gray-700">
                          Nom
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Votre nom" 
                            className="py-3 border-nourx-gray-200 focus:border-nourx-blue focus:ring-nourx-blue/20" 
                            {...field} 
                          />
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
                        <FormLabel className="text-sm font-medium text-nourx-gray-700">
                          Prénom
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Votre prénom" 
                            className="py-3 border-nourx-gray-200 focus:border-nourx-blue focus:ring-nourx-blue/20" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                  <FormField
                    control={form.control}
                    name="customer_email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-nourx-gray-700">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="votre@email.com" 
                            className="py-3 border-nourx-gray-200 focus:border-nourx-blue focus:ring-nourx-blue/20" 
                            {...field} 
                          />
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
                        <FormLabel className="text-sm font-medium text-nourx-gray-700">
                          Téléphone
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="07 XX XX XX XX" 
                            className="py-3 border-nourx-gray-200 focus:border-nourx-blue focus:ring-nourx-blue/20" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Address Section */}
              <div className="border-t border-nourx-gray-100 pt-8 mt-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-nourx-blue/10 rounded-lg">
                    <MapPin className="w-5 h-5 text-nourx-blue" />
                  </div>
                  <h2 className="text-xl font-semibold text-nourx-black">Adresse de facturation</h2>
                </div>
                
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="customer_address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-nourx-gray-700">
                          Adresse
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="123 Rue Principale" 
                            className="py-3 border-nourx-gray-200 focus:border-nourx-blue focus:ring-nourx-blue/20" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="customer_city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-nourx-gray-700">
                            Ville
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Abidjan" 
                              className="py-3 border-nourx-gray-200 focus:border-nourx-blue focus:ring-nourx-blue/20" 
                              {...field} 
                            />
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
                          <FormLabel className="text-sm font-medium text-nourx-gray-700">
                            Code postal
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="00225" 
                              className="py-3 border-nourx-gray-200 focus:border-nourx-blue focus:ring-nourx-blue/20" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="customer_country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-nourx-gray-700">
                            Pays
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="py-3 border-nourx-gray-200 focus:border-nourx-blue focus:ring-nourx-blue/20">
                                <SelectValue placeholder="Sélectionnez un pays" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {countries.map(country => (
                                <SelectItem key={country.code} value={country.code}>
                                  {country.name}
                                </SelectItem>
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
                          <FormLabel className="text-sm font-medium text-nourx-gray-700">
                            État/Région
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Région des Lagunes" 
                              className="py-3 border-nourx-gray-200 focus:border-nourx-blue focus:ring-nourx-blue/20" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="border-t border-nourx-gray-100 pt-8 mt-8">
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full py-4 text-lg font-semibold bg-nourx-blue hover:bg-blue-600 transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Traitement en cours...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Procéder au paiement
                    </>
                  )}
                </Button>
                
                {/* Security Notice */}
                <div className="flex items-center justify-center gap-2 mt-4 text-sm text-nourx-gray-500">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Paiement sécurisé SSL 256-bit</span>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
