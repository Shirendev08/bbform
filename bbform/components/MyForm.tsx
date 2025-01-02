"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import React, { useState, useEffect } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { branches, sendSms } from "@/lib/service"
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  date: z.date({
    required_error: "A date of birth is required.",
  }),
  address: z.string().min(5,{message:"Хаягаа оруулна уу"}).optional(),
  email: z.string().optional(),
  phoneNumber: z.string().optional(),
  regNo: z.string().optional(),
  otpCode: z.string().optional(),
  hasBankAccount: z.string().min(1,{message: "Хадгаламж байгаа эсэхийг сонгоно уу"}).optional(), 
  card: z.string().min(5,{message:"Картаа сонгоно уу"}).optional(),
  branch: z.string().min(5,{message:"Салбараа оруулна уу"}).optional(),
  promoCode: z.string().optional(),
  file: z.instanceof(FileList).nullable().optional(),
})
interface Branch {
  bus_hours: string;
  address: string;
  phoneNumber: string;
  img_url: string;
  loc_code: string;
  latitude: number;
  loc_type: string;
  loc_name: string;
  fax: string;
  email: string;
  longitude: number;
}

export function MyForm() {
  const [isOtpDisabled, setIsOtpDisabled] = useState(true);
    const [show, setShow] = useState(false)
    const [text, setText] = useState(false)
    const [text18, setText18] = useState(false)
    const [branchData, setBranchData] = useState<Branch[]>([]); // Use Branch[] type
    const [error, setError] = useState<string | null>(null);
    
      useEffect(() => {
        const fetchBranches = async () => {
          try {
            const data: Branch[] = await branches(); // Expect data of type Branch[]
            // console.log("Fetched Branch Data:", data);
    
            if (data.length > 0) {
              setBranchData(data);
            } else {
              setError("No branches available");
            }
          } catch (err) {
            setError("Failed to fetch branches");
            console.error(err);
          }
        };
    
        fetchBranches();
      }, []);

const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      date: new Date(),
      address: "",
      email: "",
      phoneNumber: "",
      regNo: "",
      otpCode: "",
      hasBankAccount: "",
      branch: "",
      card: "",
      promoCode: "",
      file: null,

    },
  });

const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };
  const handleDate = (date: Date) => {
    setShow(false);
  setText(false);
  setText18(false);
    const currentYear = new Date().getFullYear()
    const userDate = date.getFullYear()
    const age = currentYear - userDate
    console.log("age:",age)
    if (age >= 7 && age < 14) {
        setText(true);
      } else if (age >= 14 && age <= 18) {
        setShow(true);
      } else if (age > 18) {
        setText18(true);
      } else {
        console.log("s")
      }
   
  }

  return (
    <div className="w-[400px] ml-auto mr-auto mt-auto mb-auto border p-10 border-black rounded-md">
    
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Овог, Нэр / Full name </FormLabel>
              <FormControl>
                <Input placeholder="Бүтэн нэр" {...field} required />
              </FormControl>
              <FormDescription>
                Овог нэрээ оруулна уу
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Төрсөн он сар өдөр</FormLabel>
              <FormControl>
              <Input
  type="date"
  {...field}
  value={field.value instanceof Date && !isNaN(field.value.getTime())
    ? field.value.toISOString().split("T")[0]
    : ""}
  onChange={(e) => {
    const selectedDate = new Date(e.target.value);
    field.onChange(selectedDate);
    handleDate(selectedDate);
  }}
/>
              </FormControl>
              <FormDescription>
               Төрсөн он сар өдрөө оруулна уу
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {show && (
            <>
            <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Гэрийн хаяг </FormLabel>
                <FormControl>
                  <Input placeholder="Хаяг" {...field} required />
                </FormControl>
               
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Цахим Хаяг / Email address</FormLabel>
                <FormControl>
                  <Input placeholder="example@mail.com" type="email" {...field}  required/>
                </FormControl>
                <FormDescription>
                Цахим Хаягаа оруулна уу
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        <div>
  <FormField
    control={form.control}
    name="phoneNumber"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Гар Утас</FormLabel>
        <FormControl>
          <Input
            placeholder=""
            type="tel"
            {...field}
            pattern="[0-9]{8}"
            required
          />
        </FormControl>
        <FormDescription>Гар утасны дугаараа оруулна уу</FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
  <FormField
    control={form.control}
    name="regNo"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Регистрийн дугаар</FormLabel>
        <FormControl>
          <Input
            placeholder=""
            type="text"
            {...field}
            pattern="^[А-Яа-я]{2}[0-9]{8}$"
            required
          />
        </FormControl>
        <FormDescription>Регистрийн дугаараа оруулна уу</FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
  <Button
    onClick={async () => {
      const values = form.getValues();
      const { regNo, phoneNumber } = values;
      console.log("reg", regNo, phoneNumber)
      if (!regNo || !phoneNumber) {
        alert("Please fill in both regDug and phone.");
        return;
      }

      try {
        const response = await sendSms(regNo, phoneNumber);
        console.log(response);
  
        if (response.success) {
          setIsOtpDisabled(false); // Enable OTP field if SMS is sent successfully
        }
        
      } catch (error) {
        
        console.log(error)
      }
    }}
  >
    Send
  </Button>
</div>
<FormField
    control={form.control}
    name="otpCode"
    render={({ field }) => (
      <FormItem>
        <FormLabel>OTP code</FormLabel>
        <FormControl>
          <Input
            placeholder=""
            type="text"
            {...field}
            pattern="^[А-Яа-я]{2}[0-9]{8}$"
            required
            disabled={isOtpDisabled}
          />
        </FormControl>
        <FormDescription>OTP код оруулна уу</FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
      <FormField
  control={form.control}
  name="hasBankAccount"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Та богд банкны хадгаламжийн данстай юу? </FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value} required>
        <FormControl>
          <SelectTrigger>
            <SelectValue defaultValue="No" placeholder="Данс байгаа эсэх" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="Yes">Тийм</SelectItem>
          <SelectItem value="No">Үгүй</SelectItem>
        </SelectContent>
      </Select>
      <FormDescription>
        You can manage email addresses in your{" "}
        <Link href="/examples/forms">email settings</Link>.
      </FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>

{/* Radio Group */}
<FormField
  control={form.control}
  name="card"
  render={({ field }) => {
    // Use `form.watch` to track hasBankAccount value
    const hasBankAccount = form.watch("hasBankAccount", "No");

    // Dynamically set cards based on `hasBankAccount`
    const cards = hasBankAccount === "No"
      ? [
          { value: "Gusion - Holy Blade", src: "/assets/gusionholyblade.jpg" },
          { value: "Miya - Moonlight Archer", src: "/assets/miyamoon.jpg" },
          { value: "Nana - Clockwork Maid", src: "/assets/nanamaid.jpg" },
        ]
      : [
          { value: "Gusion - Holy Blade", src: "/assets/gusionholyblade.jpg" },
          { value: "Miya - Moonlight Archer", src: "/assets/miyamoon.jpg" },
          { value: "Nana - Clockwork Maid", src: "/assets/nanamaid.jpg" },
          { value: "Miya - Doom Catalyst / Limited №1 загвар /", src: "/assets/miyadoom.jpg" },
          { value: "Gusion - Soul Revelation / Limited №1 загвар /", src: "/assets/gusionsoul.jpg" },
          { value: "Nana - Slumber Party / Limited №1 загвар /", src: "/assets/nanaparty.jpg" },
        ];

    return (
      <FormItem className="space-y-3">
        <FormLabel>Картын мэдээлэл</FormLabel>
        <FormControl>
          <div className="overflow-x-auto flex space-x-2">
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="flex flex-nowrap space-x-2"
            >
              {cards.map((card) => (
                <FormItem key={card.value} className="flex-shrink-0 w-[250]">
                  <FormControl>
                    <RadioGroupItem value={card.value} />
                  </FormControl>
                  <FormLabel className="font-normal">
                    <Image
                      src={card.src}
                      width={250}
                      height={100}
                      alt={card.value}
                    />
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }}
/>


<FormField
            control={form.control}
            name="promoCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Промо код</FormLabel>
                <FormControl>
                  <Input placeholder="Жишээ нь: 1111" type="numeric" {...field} />
                </FormControl>
                <FormDescription>
                  Промо Кодоо оруулна уу
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
    <FormField
  control={form.control}
  name="branch"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Захиалгын мэдээлэл</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value} required>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Салбар сонгох"/>
          </SelectTrigger>
        </FormControl>
        <SelectContent>
        
        {branchData.map((branch, index) => (
  <SelectItem 
    key={`${branch.loc_code}-${index}`} // Combine loc_code and index for uniqueness
    value={branch.loc_name}
  >
    {branch.loc_name}
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
  name="file"
  render={({ field }) => {
    return (
      <FormItem>
        <FormLabel>Бичиг баримт</FormLabel>
        <FormControl>
          <Input
            type="file"
            placeholder="Файл сонгох"
            onChange={(e) => {
              field.onChange(e.target.files); // Update field value with selected files
            }}
            ref={field.ref} // Pass the ref to the input
            required
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }}
/>

          <Button type="submit">Submit</Button>
            </>
          
        )}
        {text && (
            <>
            <p>14-өөс доош настай тул хамтран эзэмшигчийн хамт банкны салбар дээр очин картаа захиална уу.</p>
            <Button type="submit" disabled>Submit</Button>
            </>
        )}
        {text18 && (
            <>
            <p>18-аас дээш настай тул та БОГП МОБАЙЛ АПП ашиглан картаа захиалаарай</p>
            <Button type="submit" disabled>Submit</Button>
            </>
            
        )}
     
      </form>
    </Form>
    </div>
  )
}
