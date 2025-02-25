"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const router = useRouter();
  const [concert, setConcert] = useState<any>(null);

  useEffect(() => {
    const fetchNextConcert = async () => {
      const { data, error } = await supabase
        .from("concerts")
        .select("id, orchestra_id")
        .order("date", { ascending: true }) // Get the next upcoming concert
        .limit(1)
        .single();

      if (error) console.error("Error fetching concert:", error);
      else if (data) {
        // Redirect to the upcoming concert page
        router.push(`/${data.orchestra_id}/${data.id}`);
      }
    };

    fetchNextConcert();
  }, []);

  return (
    <div className="text-center text-white p-6">
      <h1 className="text-3xl font-bold">Loading Upcoming Concert...</h1>
    </div>
  );
}
