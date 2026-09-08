import { NextResponse } from 'next/server';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { full_name, property_address, phone, email, primary_goal } = body;

    if (!full_name || !property_address || !phone || !email) {
      return NextResponse.json(
        { error: 'Please fill in all required fields.' },
        { status: 400 }
      );
    }

    const supabase = getSupabase();
    if (supabase) {
      const { error } = await supabase
        .from('leads')
        .insert([{ full_name, property_address, phone, email, primary_goal, status: 'New' }]);
      if (error) console.error('Supabase save error:', error);
    }

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL || process.env.NOTIFICATION_WEBHOOK_URL;

    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            full_name,
            property_address,
            phone,
            email,
            primary_goal,
            submitted_at: new Date().toISOString()
          })
        });
      } catch (e) {
        console.error('Webhook error:', e);
      }
    } else {
      console.log('--- NEW LEAD RECEIVED (LOG ONLY) ---');
      console.log({ full_name, property_address, phone, email, primary_goal });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json({ error: 'Server error occurred.' }, { status: 500 });
  }
}
