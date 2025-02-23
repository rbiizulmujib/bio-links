"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export default function Admin() {
  const [user, setUser] = useState(null);
  const [links, setLinks] = useState([]);
  const [form, setForm] = useState({ title: "", subtitle: "", link: "", image: "" });
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push("/masuk");
      else setUser(data.user);
    });
    fetchLinks();
  }, [router]);

  const fetchLinks = async () => {
    const { data, error } = await supabase.from("link_bio").select("*");
    if (error) console.error("Fetch Error:", error);
    else setLinks(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.link) {
      console.error("Title dan Link harus diisi!");
      return;
    }

    if (form.id) {
      // UPDATE data jika form.id ada
      const { error } = await supabase.from("link_bio").update({
        title: form.title,
        subtitle: form.subtitle,
        link: form.link,
        image: form.image,
      }).eq("id", form.id);

      if (error) console.error("Update Error:", error);
      else {
        setLinks(links.map((link) => (link.id === form.id ? { ...link, ...form } : link)));
        setForm({ title: "", subtitle: "", link: "", image: "" }); // Reset form
      }
    } else {
      // INSERT data baru
      const newForm = { ...form };
      delete newForm.id; // Hindari error "23502"

      const { data, error } = await supabase.from("link_bio").insert([newForm]).select("*");

      if (error) {
        console.error("Insert Error:", error);
      } else if (data && data.length > 0) {
        setLinks([...links, data[0]]);
        setForm({ title: "", subtitle: "", link: "", image: "" }); // Reset form
      }
    }
  };

  const handleEdit = (link) => {
    setForm(link);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("link_bio").delete().eq("id", id);
    if (error) {
      console.error("Delete Error:", error);
    } else {
      setLinks(links.filter((link) => link.id !== id));
    }
  };

  if (!user) return null;

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-lg font-bold">Admin Panel</h2>
        <Button variant="ghost" className="w-full text-left">Link Bio</Button>
      </aside>
      <main className="flex-1 p-6">
        <Card>
          <CardContent className="pt-6">
            <h1 className="text-xl font-bold mb-4">Kelola Link Bio</h1>
            <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
              <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <Input placeholder="Subtitle" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
              <Input placeholder="Link" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} />
              <Input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
              <Button type="submit">{form.id ? "Update" : "Add"}</Button>
            </form>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Subtitle</TableHead>
                  <TableHead>Link</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {links.map((link) => (
                  <TableRow key={link.id}>
                    <TableCell>{link.title}</TableCell>
                    <TableCell>{link.subtitle}</TableCell>
                    <TableCell>
                      <a href={link.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                        {link.link}
                      </a>
                    </TableCell>
                    <TableCell>
                      <img src={link.image} alt={link.title} className="w-10 h-10" />
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleEdit(link)} variant="secondary" className="mr-2">
                        Edit
                      </Button>
                      <Button onClick={() => handleDelete(link.id)} variant="destructive">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}