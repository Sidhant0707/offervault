import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function DELETE(request: Request) {
  try {
    // 1. Verify who is making the request
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 2. Initialize Supabase Admin Client (Required to delete users)
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY! // You need to add this to your .env file!
    );

    // 3. Delete the user from the Auth database
    const { error } = await supabaseAdmin.auth.admin.deleteUser(
      session.user.id
    );

    if (error) throw error;

    return new NextResponse("Account Purged", { status: 200 });

  } catch (error) {
    console.error("Delete user error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}