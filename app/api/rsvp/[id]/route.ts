import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSupabaseAdmin } from "@/lib/supabase";

function isAdmin() {
  return cookies().get("admin_session")?.value === "authenticated";
}

/** Admin only: edit an RSVP entry. */
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  if (!isAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const updates: Record<string, string> = {};
  for (const key of ["name", "phone", "events", "guests", "message"] as const) {
    if (typeof body[key] === "string") updates[key] = body[key] as string;
  }

  let supabaseAdmin;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server is not configured yet" }, { status: 500 });
  }

  const { data, error } = await supabaseAdmin
    .from("rsvps")
    .update(updates)
    .eq("id", params.id)
    .select()
    .single();

  if (error) {
    console.error("Supabase update failed:", error.message);
    return NextResponse.json({ error: "Could not update RSVP" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, entry: data });
}

/** Admin only: delete an RSVP entry. */
export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  if (!isAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let supabaseAdmin;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server is not configured yet" }, { status: 500 });
  }

  const { error } = await supabaseAdmin.from("rsvps").delete().eq("id", params.id);

  if (error) {
    console.error("Supabase delete failed:", error.message);
    return NextResponse.json({ error: "Could not delete RSVP" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
