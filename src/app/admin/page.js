'use client'

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BeakerIcon } from '@heroicons/react/24/solid'
import Link from "next/link";

export default function Admin() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push("/masuk");
      else setUser(data.user);
    });
  }, [router]);

  if (!user) return null;

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-lg font-bold">Admin Panel</h2>
<Link className="flex" href="/admin/link-bio">
    <BeakerIcon className="size-6 text-blue-500" />
  <Button variant="ghost" className="w-full text-left">Link Bio</Button>
</Link>
      </aside>
      <main className="flex-1 p-6">
        <Card>
        <CardContent className="pt-6">
            <h1 className="text-xl font-bold">Kelola Link Bio</h1>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}