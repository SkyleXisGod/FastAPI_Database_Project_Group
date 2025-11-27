// Adres API, używa zmiennej środowiskowej lub localhost
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8000";

// Pobranie wszystkich broni
export async function fetchWeapons() {
  const res = await fetch(`${API_BASE}/weapons`); // Wysłanie GET
  return res.json(); // Zwraca dane jako JSON
}

// Dodanie nowej broni
export async function postWeapon(data) {
  const res = await fetch(`${API_BASE}/weapons`, {
    method: "POST", // Ustawienie metody POST
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data) // Wysłanie danych w formacie JSON
  });
  return res.json(); // Zwraca odpowiedź jako JSON
}

// Aktualizacja broni po ID
export async function updateWeapon(id, data) {
  const res = await fetch(`${API_BASE}/weapons/${id}`, {
    method: "PUT", // Ustawienie metody PUT
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data) // Wysłanie zmienionych danych
  });
  return res.json(); // Zwraca odpowiedź jako JSON
}

// Usunięcie broni po ID
export async function deleteWeapon(id) {
  await fetch(`${API_BASE}/weapons/${id}`, {
    method: "DELETE" // Ustawienie metody DELETE
  });
  // Nie zwraca JSON, bo API nie przesyła odpowiedzi
}
