import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Waitlist from '@/models/Waitlist';

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { email } = body;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    try {
      // Create user (unique index will handle duplicates)
      await Waitlist.create({ email });
      return NextResponse.json({ message: 'Success' }, { status: 201 });
    } catch (error: any) {
      if (error.code === 11000) {
        return NextResponse.json({ message: 'Email already registered' }, { status: 200 });
      }
      throw error;
    }

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
