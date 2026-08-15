import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      full_name,
      property_address,
      phone,
      email,
      primary_goal,
      lead_type = 'homeowner',
      company,
      company_name,
      preferred_deal_type,
      target_zip_codes
    } = body;

    if (lead_type === 'investor') {
      if (!full_name || !phone || !email) {
        return NextResponse.json(
          { error: 'Please fill in all required fields (Name, Phone, Email).' },
          { status: 400 }
        );
      }
    } else {
      if (!full_name || !property_address || !phone || !email) {
        return NextResponse.json(
          { error: 'Please fill in all required fields.' },
          { status: 400 }
        );
      }
    }

    // 1. Save to Supabase (Optional Database Log)
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const payload: Record<string, unknown> = {
        full_name,
        phone,
        email,
        lead_type,
        status: 'New'
      };
      if (property_address) payload.property_address = property_address;
      if (primary_goal) payload.primary_goal = primary_goal;
      if (company || company_name) payload.company = company || company_name;
      if (preferred_deal_type) payload.preferred_deal_type = preferred_deal_type;
      if (target_zip_codes) payload.target_zip_codes = target_zip_codes;

      const { error } = await supabase
        .from('leads')
        .insert([payload]);
        
      if (error) console.error('Supabase save error:', error);
    }

    // 2. Send to Google Sheets / Vapi Trigger Webhook (Make.com, Zapier, or Apps Script)
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL || process.env.NOTIFICATION_WEBHOOK_URL;

    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...body,
            submitted_at: new Date().toISOString()
          })
        });
      } catch (e) {
        console.error('Webhook error:', e);
      }
    } else {
      console.log('--- NEW LEAD RECEIVED (LOG ONLY) ---');
      console.log(body);
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json({ error: 'Server error occurred.' }, { status: 500 });
  }
}
