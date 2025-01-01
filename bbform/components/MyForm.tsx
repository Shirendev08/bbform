"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
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
import { useState } from "react"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  date: z.date({
    required_error: "A date of birth is required.",
  }),
  address: z.string().min(5,{message:"Хаягаа оруулна уу"}).optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
})


export function MyForm() {
    const [show, setShow] = useState(false)
    const [text, setText] = useState(false)
    const [text18, setText18] = useState(false)
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      date: new Date(),
      address: "",
      email: "",
      phone: "",
    },
  });
  const onSubmit = async (data: {username: string, date: Date, address: string, email: string, phone: string})=> {
      console.log(data)
  }
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
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
              <FormLabel>Date</FormLabel>
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
                Enter birth date
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
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  Address
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" type="email" {...field} />
                </FormControl>
                <FormDescription>
                  Email
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" type="tel" {...field}  pattern="[0-9]{8}"/>
                </FormControl>
                <FormDescription>
                  Phone
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
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
  )
}
