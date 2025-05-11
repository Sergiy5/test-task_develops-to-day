
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [maxReadyTime, setMaxReadyTime] = useState("");

  const isButtonDisabled = !query && !cuisine && !maxReadyTime;

  const handleSubmit = () => {
    const params = new URLSearchParams();
    if (query) params.append("query", query);
    if (cuisine) params.append("cuisine", cuisine);
    if (maxReadyTime) params.append("maxReadyTime", maxReadyTime.toString());
    router.push(`/recipes?${params.toString()}`);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-3xl font-bold text-center">Recipe Finder</h1>

        <input
          type="text"
          placeholder="Search recipe..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />

        <select
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="">Select cuisine</option>
          <option value="Italian">Italian</option>
          <option value="Mexican">Mexican</option>
          <option value="Chinese">Chinese</option>
        </select>

        <input
          type="number"
          placeholder="Max preparation time (min)"
          value={maxReadyTime}
          onChange={(e) => setMaxReadyTime(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />

        <button
          disabled={isButtonDisabled}
          onClick={handleSubmit}
          className={`w-full px-4 py-2 rounded ${
            isButtonDisabled
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </main>
  );
}
