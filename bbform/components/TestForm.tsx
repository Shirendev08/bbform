// "use client"

// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"

// import { toast } from "@/components/hooks/use-toast"
// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"

// const FormSchema = z.object({
//     file: z.instanceof(File).refine((file) => file.size < 7000000, {
//      message: 'Your resume must be less than 7MB.',
//    }),
// })

// export function InputForm() {
//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       file: "",
//     },
//   })

//   function onSubmit(data: z.infer<typeof FormSchema>) {
//     toast({
//       title: "You submitted the following values:",
//       description: (
//         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//           <code className="text-white">{JSON.stringify(data, null, 2)}</code>
//         </pre>
//       ),
//     })
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
//        <FormField
//          control={form.control}
//          name="file"
//          // eslint-disable-next-line @typescript-eslint/no-unused-vars
//          render={({ field: { value, onChange, ...fieldProps } }) => (
//            <FormItem>
//              <FormLabel>Бичиг баримт</FormLabel>
//              <FormControl>
//                <Input
//                  {...fieldProps}
//                  type="file"
//                  accept="application/pdf"
//                  onChange={(event) =>
//                    onChange(event.target.files && event.target.files[0])
//                  }
//                  onChange={handleFileChange} 
//                  multiple
//                />
//              </FormControl>
//              <FormDescription />
//              <FormMessage />
//            </FormItem>
//          )}
//        />
//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   )
// }
