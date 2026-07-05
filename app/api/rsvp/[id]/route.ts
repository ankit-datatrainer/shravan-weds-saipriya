import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const runtime = "edge";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    const { error } = await supabase
      .from('rsvps')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Delete error:", error);
      return NextResponse.json({ error: "Failed to delete RSVP" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete RSVP" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    
    const { error } = await supabase
      .from('rsvps')
      .update({
        name: body.name,
        phone: body.phone,
        events: body.events,
        guests: body.guests,
        message: body.message,
      })
      .eq('id', id);

    if (error) {
      console.error("Update error:", error);
      return NextResponse.json({ error: "Failed to update RSVP" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update RSVP" }, { status: 500 });
  }
}
