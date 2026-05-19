import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { ForumRecord } from "../types/record";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { ClipboardList, User, MapPin, CreditCard, Phone, Briefcase, Building2 } from "lucide-react";

const KATSINA_LGAS = [
  "Bakori", "Batagarawa", "Batsari", "Baure", "Bindawa", "Charanchi", "Dandume",
  "Danja", "Dan Musa", "Daura", "Dutsi", "Dutsin Ma", "Faskari", "Funtua",
  "Ingawa", "Jibia", "Kafur", "Kaita", "Kankara", "Kankia", "Katsina", "Kurfi",
  "Kusada", "Mai'Adua", "Malumfashi", "Mani", "Mashi", "Matazu", "Musawa",
  "Rimi", "Sabuwa", "Safana", "Sandamu", "Zango"
];

const ORG_TYPES = ["MDA", "LGA", "LEA", "HOSPITAL", "PHC", "SCHOOL"] as const;

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  lgOfOrigin: z.string().min(1, "Please select LG of origin"),
  pvcDelNo: z.string().min(5, "PVC/DEL NO is required"),
  pollingUnit: z.string().min(2, "Polling Unit is required"),
  ward: z.string().min(2, "Ward is required"),
  gsmNo: z.string().min(10, "Valid GSM number is required"),
  position: z.string().min(2, "Position is required"),
  orgType: z.enum(ORG_TYPES),
  orgName: z.string().min(2, "Organization name is required"),
});

interface RegistrationFormProps {
  onSuccess: (data: Omit<ForumRecord, "id" | "serialNo" | "createdAt">) => void;
}

export const RegistrationForm = ({ onSuccess }: RegistrationFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      lgOfOrigin: "",
      pvcDelNo: "",
      pollingUnit: "",
      ward: "",
      gsmNo: "",
      position: "",
      orgType: "MDA",
      orgName: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onSuccess(values);
    form.reset();
    toast.success("Record submitted successfully!");
  };

  return (
    <Card className="border-emerald-100 shadow-xl overflow-hidden">
      <CardHeader className="bg-emerald-50/50">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-6 h-6 text-emerald-600" />
          <div>
            <CardTitle className="text-xl text-emerald-900">Member Registration</CardTitle>
            <CardDescription>Enter details to add a new record to the forum</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="w-4 h-4 text-emerald-600" />
                      FULL NAME
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} className="focus:ring-emerald-500" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lgOfOrigin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      LG OF ORIGIN
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="focus:ring-emerald-500">
                          <SelectValue placeholder="Select Local Government" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {KATSINA_LGAS.map((lga) => (
                          <SelectItem key={lga} value={lga}>
                            {lga}
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
                name="pvcDelNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-emerald-600" />
                      PVC / DEL NO
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter PVC or DEL Number" {...field} className="focus:ring-emerald-500" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gsmNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-emerald-600" />
                      GSM NO
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="080XXXXXXXX" {...field} className="focus:ring-emerald-500" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pollingUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      POLLING UNIT
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Polling Unit" {...field} className="focus:ring-emerald-500" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ward"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      WARD
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Ward" {...field} className="focus:ring-emerald-500" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-emerald-600" />
                      POSITION
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Current Position" {...field} className="focus:ring-emerald-500" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="orgType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-emerald-600" />
                      ORGANIZATION TYPE
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="focus:ring-emerald-500">
                          <SelectValue placeholder="Select Org Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ORG_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
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
                name="orgName"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-emerald-600" />
                      NAME OF ORGANIZATION
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the full name of the organization" {...field} className="focus:ring-emerald-500" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-6 rounded-lg transition-all duration-200">
              SUBMIT RECORD
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};