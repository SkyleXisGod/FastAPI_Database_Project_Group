import React, { useEffect, useState } from "react";
import { fetchWeapons, updateWeapon, deleteWeapon } from "../api";

export default function WeaponList() {

  // Stan komponentu
  const [weapons, setWeapons] = useState([]);       // Przechowywanie listy broni
  const [editId, setEditId] = useState(null);       // Przechowywanie ID broni w edycji
  const [editForm, setEditForm] = useState({});     // Przechowywanie danych edytowanej broni
  const [sortKey, setSortKey] = useState("name");   // Przechowywanie po czym sortowanie
  const [sortAsc, setSortAsc] = useState(true);     // Przechowywanie kierunku sortowania

  // Filtry
  const [filterCategory, setFilterCategory] = useState("");  // Przechowywanie filtra po kategorii
  const [filterCaliber, setFilterCaliber] = useState("");    // Przechowywanie filtra po kalibrze

  // Załadowanie danych przy uruchomieniu komponentu
  useEffect(() => { loadWeapons(); }, []);

  // Funkcja: pobranie broni z API
  async function loadWeapons() {
    const data = await fetchWeapons();
    setWeapons(data || []);
  }

  // Funkcja: obsługa zmiany pola w edycji
  function onEditChange(e, field) {
    setEditForm({ ...editForm, [field]: e.target.value });
  }

  // Funkcja: zapisanie zmian edycji
  async function saveEdit(id) {
    await updateWeapon(id, editForm);
    setEditId(null);
    setEditForm({});
    loadWeapons();
  }

  // Funkcja: usunięcie broni
  async function removeWeapon(id) {
    if (window.confirm("Na pewno chcesz usunąć tę broń?")) {
      await deleteWeapon(id);
      loadWeapons();
    }
  }

  // Filtrowanie broni
  const filteredWeapons = weapons.filter(w => {
    const categoryMatch = w.category.toLowerCase().includes(filterCategory.toLowerCase());
    const caliberMatch = w.caliber.toLowerCase().includes(filterCaliber.toLowerCase());
    return categoryMatch && caliberMatch;
  });

  // Sortowanie broni
  const sortedWeapons = [...filteredWeapons].sort((a, b) => {
    if (!a[sortKey]) return 1;
    if (!b[sortKey]) return -1;
    if (a[sortKey] < b[sortKey]) return sortAsc ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortAsc ? 1 : -1;
    return 0;
  });

  // Funkcja: generowanie nagłówka z sortowaniem
  function renderHeader(label, key) {
    const isActive = sortKey === key;
    const arrow = isActive ? (sortAsc ? "⬆️" : "⬇️") : "";
    return (
      <span
        style={{
          cursor: "pointer",
          color: isActive ? "red" : "black",
          fontWeight: isActive ? "bold" : "normal"
        }}
        onClick={() => {
          setSortKey(key);
          setSortAsc(isActive ? !sortAsc : true);
        }}
      >
        {label} {arrow}
      </span>
    );
  }

  return (
    <div>
      <h2>Lista broni</h2>

      {/* Filtry broni */}
      <div style={{ marginBottom: "15px" }}>
        <input
          placeholder="Rodzaj (np. Karabin)"
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
        />
        <input
          placeholder="Kaliber (np. 7,62)"
          value={filterCaliber}
          onChange={e => setFilterCaliber(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
      </div>

      {weapons.length === 0 ? <p>Brak wpisów.</p> : (
        <ul className="weapon-list">
          {/* Nagłówek tabeli */}
          <li className="weapon-item">
            {renderHeader(<strong>&nbsp;Nazwa</strong>, "name")}|
            {renderHeader(<strong>&nbsp;Kategoria</strong>, "category")}|
            {renderHeader(<strong>&nbsp;Kaliber</strong>, "caliber")}|
            <strong>&nbsp;Rok</strong>&nbsp;|
            <strong>&nbsp;Opis</strong>&nbsp;|
            <strong>&nbsp;Akcje</strong>
          </li>

          {/* Lista broni */}
          {sortedWeapons.map(w => (
            <li key={w.id} className="weapon-item">
              {editId === w.id ? (
                <div>
                  <input value={editForm.name} onChange={e => onEditChange(e, "name")} placeholder="Nazwa"/>
                  <input value={editForm.category} onChange={e => onEditChange(e, "category")} placeholder="Kategoria"/>
                  <input value={editForm.caliber} onChange={e => onEditChange(e, "caliber")} placeholder="Kaliber"/>
                  <input value={editForm.year || ""} onChange={e => onEditChange(e, "year")} placeholder="Rok"/>
                  <input value={editForm.description} onChange={e => onEditChange(e, "description")} placeholder="Opis"/>
                  <button onClick={() => saveEdit(w.id)}>Zapisz</button>
                  <button onClick={() => { setEditId(null); setEditForm({}); }}>Anuluj</button>
                </div>
              ) : (
                <div>
                  <strong>{w.name}</strong> ({w.category}) — {w.caliber} {w.year ? `, ${w.year}` : ""}
                  <div className="desc">{w.description}</div>
                  <button onClick={() => { setEditId(w.id); setEditForm({ ...w }); }}>Edytuj</button>
                  <button onClick={() => removeWeapon(w.id)}>Usuń</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
