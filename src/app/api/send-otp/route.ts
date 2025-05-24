// src/app/api/send-otp/route.ts
import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(request: NextRequest) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
  const client = twilio(accountSid, authToken);
  try {
    const { countryCode, phoneNumber } = await request.json();
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;

    await client.messages.create({
      body: `Your OTP code is ${otp}`,
      from: twilioPhoneNumber,
      to: fullPhoneNumber,
    });

    return NextResponse.json({ success: true, otp });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
