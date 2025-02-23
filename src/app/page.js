'use client'
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function BioLink() {
  const [bios, setBios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBios = async () => {
      let { data, error } = await supabase.from("link_bio").select("*");
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setBios(data);
      }
    };
    fetchBios();
  }, []);

  const filteredBios = bios.filter((bio) =>
    bio.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gray-200 p-5">
      <div className="max-w-lg bg-white p-6 rounded-lg shadow-md w-full">
        <div className="flex flex-col items-center">
          <img
            src="https://uixperienceid.com/wp-content/uploads/2025/02/fap.png"
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover mb-4"
          />
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Selamat Datang di Halaman Bio Link Saya
        </h1>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded mt-4 mb-2 text-lg focus:outline-none focus:border-blue-500"
          placeholder="Cari media sosial..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <p className="text-gray-600">Temukan saya di media sosial:</p>
        <div className="mt-4 space-y-3">
          {filteredBios.map((bio) => (
            <a
              key={bio.id}
              href={bio.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
            >
              <img
                src={bio.image}
                alt={bio.title}
                className="w-12 h-12 mr-3 rounded"
              />
              <div>
                <h2 className="text-lg font-semibold">{bio.title}</h2>
                <p className="text-gray-300 text-sm">{bio.subtitle}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
