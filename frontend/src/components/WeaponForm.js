import React, { useState } from "react";
import { postWeapon } from "../api";

export default function WeaponForm() {

  // Przechowywanie danych formularza
  const [form, setForm] = useState({
    name: "",
    category: "",
    caliber: "",
    year: "",
    description: ""
  });

  // Funkcja: zmiana wartości w formularzu
  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Funkcja: wysyłanie formularza
  async function onSubmit(e) {
    e.preventDefault();             // Zatrzymać domyślne wysłanie formularza
    const payload = { ...form };    // Przygotować dane do wysłania
    if (payload.year === "") delete payload.year; // Usunąć rok, jeśli pusty
    await postWeapon(payload);      // Wysłać dane do API
    window.location.reload();       // Odświeżyć stronę po dodaniu
  }

  return (
    <form onSubmit={onSubmit} className="weapon-form">

      {/* Pola formularza */}
      <input
        name="name"
        placeholder="Nazwa"
        value={form.name}
        onChange={onChange}
        required
      />
      <input
        name="category"
        placeholder="Kategoria"
        value={form.category}
        onChange={onChange}
      />
      <input
        name="caliber"
        placeholder="Kaliber"
        value={form.caliber}
        onChange={onChange}
      />
      <input
        name="year"
        placeholder="Rok"
        value={form.year}
        onChange={onChange}
      />
      <input
        name="description"
        placeholder="Opis"
        value={form.description}
        onChange={onChange}
      />

      {/* Przycisk dodania broni */}
      <button type="submit">Dodaj</button>
    </form>
  );
}
