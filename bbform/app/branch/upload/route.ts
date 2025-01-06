import {NextRequest, NextResponse} from "next/server";
import fs from 'fs';
import formidable from 'formidable';
import { sendFormData } from "@/lib/service";

export async function POST(req: NextRequest) {
    try{
        const formData = await req.formData();

        console.log("POST formData:");
        const entries = Array.from(formData.entries());
        for (const [key, value] of entries) {
            console.log(`  ${key}:`, value);
          }

        await sendFormData(formData);

        // const file = formData.getAll('files')[0]
        // const filePath = `./public/file/${file.name}`;
        // await pump(file.stream(), fs.createWriteStream(filePath));
        return NextResponse.json({status:"success",data:file.size})
    }
    catch (e) {
        console.log("e", e);
        return  NextResponse.json({status:"fail",data: {e: e}})
    }
}