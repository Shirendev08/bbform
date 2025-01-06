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
import { branches, otpVerification, sendSms, qr, cardData, sendFormData } from "@/lib/service"
import { File } from 'buffer';


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
  countryCode: z.string().min(1,{message: "Хадгаламж байгаа эсэхийг сонгоно уу"}).optional(), 
  productCode: z.string().min(1,{message:"Картаа сонгоно уу"}).optional(),
  branch: z.string().min(5,{message:"Салбараа оруулна уу"}).optional(),
  promoCode: z.string().optional(),
  file: z.any()
  .refine((file) => file.size < 10*1024*1024, "Max size is 5MB.")
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
interface Skin {
  skin_id: string;
  skin_code: string;
  skin_name: string;
  prod_name: string;
  img_url: string;
  img_url2: string;
  img_url3: string | null;
}

export function MyForm() {
  const [formSuccess, setSuccess] = useState(false);
  const [isOtpDisabled, setIsOtpDisabled] = useState(true);
  const [base64text, setBase64text] = useState("");
    const [show, setShow] = useState(false)
    const [text, setText] = useState(false)
    const [text18, setText18] = useState(false)
    const [branchData, setBranchData] = useState<Branch[]>([]); // Use Branch[] type
    const [skindata, setSkindata] = useState<Skin[]>([]); // Use Branch[] type
    const [error, setError] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files?.length) {
  //     setFile(e.target.files[0]);
  //   }
  // };
      useEffect(() => {
        const fetchBranches = async () => {
          try {
            const data: Branch[] = await branches(); // Expect data of type Branch[]
            const skin: Skin[] = await cardData()
            
            if (data.length > 0) {
              setBranchData(data);
              setSkindata(skin)
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

const form = useForm({
    // resolver: zodResolver(formSchema),
    // defaultValues: {
    //   username: "",
    //   date: new Date(),
    //   address: "",
    //   email: "",
    //   phoneNumber: "",
    //   regNo: "",
    //   otpCode: "",
    //   countryCode: "",
    //   verification: "",
    //   hasBankAccount: "",
    //   branch: "",
    //   card: "",
    //   promoCode: "",
    //   file: "",
    // },  
  });
  const fileRef = form.register("file");
const onSubmit = async (data: any) => {
  const formData = new FormData();

  // Loop through the form data fields
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const fieldValue = data[key];

      // Check if the field is a File object or an array of files
      if (fieldValue instanceof File) {
        // If it's a single file, append it to FormData
        formData.append(key, fieldValue);
      } else if (Array.isArray(fieldValue)) {
        // If it's an array (multiple files), loop through and append each one
        fieldValue.forEach((file: File) => {
          if (file instanceof File) {
            formData.append(key, file);
          }
        });
      } else {
        // For regular form fields, append the field value as a string
        formData.append(key, fieldValue);
      }
    }
  }
  
    // Log the FormData entries for debugging
    console.log("FormData entries:", Array.from(formData.entries()));
    
    const response = await fetch("/branch/upload", {
        method: "POST",
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        body: formData
    })

    // const response = await sendFormData(data);
    console.log("response", response);
    
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
    <div className="w-400px px-10 py-10 pr-8">
    
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
  {/* <Button
    onClick={async () => {
      const values = form.getValues();
      const { regNo, phoneNumber } = values;

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
  </Button> */}
</div>
{/* <div>

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
            pattern="[0-9]{4}$"
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
     
      if (!otpCode || !phoneNumber) {
        alert("Please fill in both regDug and phone.");
        return;
      }

      try {
        const response = await otpVerification(otpCode, phoneNumber);
        
        if (response.success){
          const qrText = await qr()
          
          setBase64text(qrText.data.qr_image)
      
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
  <>
   <p>Гүйлгээний утга дээр РЕГИСТРИЙН ДУГААРАА заавал бичнэ үү</p>
     <Image
     src={`data:image/png;base64,${base64text}`}
     alt="Converted Image"
     width={300}
     height={300}
     style={{ objectFit: 'contain' }}
   />
  </>
 )}
</div> */}
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
  
      <FormMessage />
    </FormItem>
  )}
/>

{/* Radio Group */}
<FormField
  control={form.control}
  name="productCode"
  render={({ field }) => {
    // Use `form.watch` to track hasBankAccount value
    const hasBankAccount = form.watch("hasBankAccount", "No");

    // Filter skindata based on hasBankAccount
    const filteredSkindata = hasBankAccount === "No"
      ? skindata.filter(card => ["27", "28", "29"].includes(card.skin_id))
      : skindata;

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
              {filteredSkindata.map((card) => (
                <FormItem key={card.skin_id} className="flex-shrink-0 w-[250]">
                  <FormControl>
                    <RadioGroupItem value={card.skin_id} />
                  </FormControl>
                  <FormLabel className="font-normal">
                    <Image
                      src={card.img_url}
                      width={250}
                      height={100}
                      alt={card.skin_id}
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

{/* <FormField
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
          /> */}
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
          render={({ field: { value, onChange, ...fieldProps } }) => {
            return (
              <FormItem>
              <FormLabel>Төрсний гэрчилгээ эсвэл иргэний үнэмлэхний лавлагааг оруулна уу</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  placeholder="Picture"
                  type="file"
                  // id='fileInput1'
                  accept="image/*, application/pdf"
                  onChange={(event) =>
                    onChange(event.target.files && event.target.files[0])
                  }
                  multiple
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            );
          }}
        />
          <Button type="submit" className='bg-black'>Submit</Button>
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
