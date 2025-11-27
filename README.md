# Weapon DB Project

**Prosty projekt szkolny** – aplikacja do zarządzania bazą danych broni.
Backend: FastAPI + SQLite + SQLAlchemy
Frontend: React (prosty i przejrzysty dla ucznia)

---

## Struktura projektu

```
weapon-db-project/
├─ backend/       # FastAPI, baza SQLite, seed i CRUD
└─ frontend/      # React, prosty interfejs z filtrowaniem, sortowaniem i edycją
```

---

## Wymagania

* Python 3.9+ (backend)
* Node.js 14+ / npm (frontend)
* Git

---

## Uruchomienie lokalne (tryb deweloperski)

### Backend

1. Przejdź do katalogu `backend/`

2. (Opcjonalnie) utwórz i aktywuj wirtualne środowisko:

   **Linux/macOS**

   ```bash
   python -m venv venv
   source venv/bin/activate
   ```

   **Windows**

   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```

3. Zainstaluj zależności:

```bash
pip install -r requirements.txt
```

4. Zainicjalizuj bazę i wypełnij przykładowymi danymi:

```bash
python -m app.seed
# lub
python backend/app/seed.py
```

5. Uruchom serwer FastAPI:

```bash
uvicorn app.main:app --reload --port 8000
```

API dostępne pod: `http://localhost:8000`

* `GET /weapons` — pobrać wszystkie bronie
* `POST /weapons` — dodać nową broń (JSON w body)
* `PUT /weapons/{id}` — edytować broń
* `DELETE /weapons/{id}` — usuń broń

---

### Frontend

1. Przejdź do katalogu `frontend/`

2. Zainstaluj zależności:

```bash
npm install
```

3. Uruchom frontend:

```bash
npm start
```

Frontend domyślnie używa `http://localhost:8000` jako API. Jeśli backend działa pod innym adresem, ustaw zmienną środowiskową `REACT_APP_API_BASE`.

---

## Funkcje frontend

* Wyświetlanie listy broni
* Sortowanie po: nazwa, kategoria, kaliber (kolumna podświetlona, strzałka pokazuje kierunek)
* Filtr po kategorii (słowo kluczowe, np. "Karabin")
* Filtr po kalibrze (część wartości, np. "7" → 7.62, 7.92)
* Edycja broni bezpośrednio na liście
* Usuwanie broni z potwierdzeniem
* Dodawanie nowej broni przez prosty formularz

---

## Funkcje backend

* FastAPI + SQLite + SQLAlchemy
* CRUD dla broni
* Automatyczne tworzenie tabel i seed z przykładowymi 20 broniami z WWII
* Obsługa błędów (404 jeśli nie znaleziono, 400 jeśli brak nazwy przy dodawaniu)
* CORS włączony dla wszystkich połączeń (frontend <-> backend)

---

## Demo danych

Seed zawiera przykładowe bronie:

* Niemieckie: Mauser 98k, MP40, StG 44, Walther P38
* Radzieckie: PPSh-41, Mosin-Nagant M91/30, SVT-40, TT-33, PPD-34/38
* Brytyjskie: Lee-Enfield No.4, Bren, Webley Mk VI, Sten Mk II
* Amerykańskie: M1 Garand, Thompson M1928, M1911, Bazooka M1
* Polskie: Vis wz. 35, RKM wz. 28

`http://127.0.0.1:8000/weapons` -> tabela w bazie, wyświetla zawartość

`http://localhost:8000` -> baza

`http://localhost:8000/docs` -> FastAPI CRUD

`http://localhost:3000` -> główna strona SZBD

---

## Autorzy / podział pracy

Projekt wykonany wspólnie przez cztery osoby:

| Osoba             | Zadania wykonane                                                                                              |
| ----------------- | ------------------------------------------------------------------------------------------------------------- |
| Kacper Zagłoba    | Frontend: Inicjacja repo, podstawa stron i UI, stworzenie zamysłu, FastAPI i struktura projektu, README & docs|
| Mateusz Kuśmierski| Backend: FastAPI, CRUD, SQLite, seedowanie bazy, struktura modeli i baz danych                                |
| Maks Kocon        | Frontend: Dokumentacja, README, drobne poprawki UI, komentarze w kodzie, testowanie, FastAPI                  |
| Dawid Brzeski     | Frontend: Zaawansowane sortowanie, filtrowanie po częściowych wartościach, edycja i usuwanie z listy          |

---
