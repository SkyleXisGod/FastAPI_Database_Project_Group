import React, { useEffect, useState } from "react";
import { fetchWeapons, updateWeapon, deleteWeapon } from "../api";

export default function WeaponList() {

  // Stan komponentu
  const [weapons, setWeapons] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const [sortKey, setSortKey] = useState("name");
  const [sortAsc, setSortAsc] = useState(true);

  // Filtry
  const [filterCategory, setFilterCategory] = useState("");
  const [filterCaliber, setFilterCaliber] = useState("");
  const [filterName, setFilterName] = useState("");   // NOWOŚĆ: filtr po nazwie

  // Ładowanie danych
  useEffect(() => { loadWeapons(); }, []);

  async function loadWeapons() {
    const data = await fetchWeapons();
    setWeapons(data || []);
  }

  function onEditChange(e, field) {
    setEditForm({ ...editForm, [field]: e.target.value });
  }

  async function saveEdit(id) {
    await updateWeapon(id, editForm);
    setEditId(null);
    setEditForm({});
    loadWeapons();
  }

  async function removeWeapon(id) {
    if (window.confirm("Na pewno chcesz usunąć tę broń?")) {
      await deleteWeapon(id);
      loadWeapons();
    }
  }

  // Filtrowanie
  const filteredWeapons = weapons.filter(w => {
    const nameMatch = w.name.toLowerCase().includes(filterName.toLowerCase());               // NOWOŚĆ
    const categoryMatch = w.category.toLowerCase().includes(filterCategory.toLowerCase());
    const caliberMatch = w.caliber.toLowerCase().includes(filterCaliber.toLowerCase());
    return nameMatch && categoryMatch && caliberMatch;
  });

  // Sortowanie
  const sortedWeapons = [...filteredWeapons].sort((a, b) => {
    if (!a[sortKey]) return 1;
    if (!b[sortKey]) return -1;
    if (a[sortKey] < b[sortKey]) return sortAsc ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortAsc ? 1 : -1;
    return 0;
  });

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

      {/* Filtry */}
      <div style={{ marginBottom: "15px" }}>
        <input
          placeholder="Nazwa (np. M1)"
          value={filterName}
          onChange={e => setFilterName(e.target.value)}
        />
        <input
          placeholder="Rodzaj (np. Karabin)"
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
        <input
          placeholder="Kaliber (np. 7.62)"
          value={filterCaliber}
          onChange={e => setFilterCaliber(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
      </div>

      {weapons.length === 0 ? <p>Brak wpisów.</p> : (
        <ul className="weapon-list">
          <li className="weapon-item">
            {renderHeader(<strong>&nbsp;Nazwa</strong>, "name")}|
            {renderHeader(<strong>&nbsp;Kategoria</strong>, "category")}|
            {renderHeader(<strong>&nbsp;Kaliber</strong>, "caliber")}|
            <strong>&nbsp;Rok</strong>&nbsp;|
            <strong>&nbsp;Opis</strong>&nbsp;|
            <strong>&nbsp;Akcje</strong>
          </li>

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
