"use client"
import { useQRCode } from 'next-qrcode';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {QRCodeSVG} from 'qrcode.react';
import QRCode from 'react-qr-code';
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
import { branches, otpVerification, sendSms, qr } from "@/lib/service"
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
  verification: z.string().optional(),

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
  const largedata = "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"
  const { SVG } = useQRCode();
  const [isOtpDisabled, setIsOtpDisabled] = useState(true);
  const [base64text, setBase64text] = useState("");
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
      verification: "",
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
    <div className="w-[400px]  mx-auto mt-10 mb-10 border p-4 sm:p-10 border-black rounded-md">
    
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
<div>

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
   <Button
    onClick={async () => {
      const values = form.getValues();
      const { otpCode, phoneNumber } = values;
      console.log("reg", otpCode, phoneNumber)
      if (!otpCode || !phoneNumber) {
        alert("Please fill in both regDug and phone.");
        return;
      }

      try {
        const response = await otpVerification(otpCode, phoneNumber);
        console.log(response);
        if (response.success){
          const qrText = await qr()
          
          setBase64text(qrText.data.qr_image)
          console.log(qrText.data.qr_image)
          }
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
 {base64text && (
     <Image
     src={`data:image/png;base64,${base64text}`}
     alt="Converted Image"
     width={300}
     height={300}
     style={{ objectFit: 'contain' }}
   />
 )}
</div>
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
{/* <QRCode
                        value={largedata}
                        bgColor="#FFFFFF"
                        fgColor="#000000"
                        size={1024}
                    /> */}
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
