# Weapon DB Project

**Prosty projekt szkolny** – aplikacja do zarządzania bazą danych broni.
Backend: FastAPI + SQLite + SQLAlchemy
Frontend: React 

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

2. Utwórz i aktywuj wirtualne środowisko:

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
python app/seed.py
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

```bash
demo = [
            Weapon(name="Karabin Mauser 98k", category="Karabin", year=1935, caliber="7.92mm", description="Niemiecki standardowy karabin piechoty."),
            Weapon(name="MP40", category="Pistolet maszynowy", year=1940, caliber="9mm", description="Niemiecki pistolet maszynowy, popularny w Wehrmachcie."),
            Weapon(name="StG 44", category="Karabin automatyczny", year=1943, caliber="7.92mm", description="Pierwszy nowoczesny karabin szturmowy."),
            Weapon(name="Walther P38", category="Pistolet", year=1938, caliber="9mm", description="Niemiecki pistolet służbowy oficera."),
            Weapon(name="PPSh-41", category="Pistolet maszynowy", year=1941, caliber="7.62mm", description="Radziecki pistolet maszynowy, szeroko stosowany w armii radzieckiej."),
            Weapon(name="Mosin-Nagant M91/30", category="Karabin", year=1930, caliber="7.62mm", description="Radziecki karabin powtarzalny z okresu wojny."),
            Weapon(name="SVT-40", category="Karabin półautomatyczny", year=1940, caliber="7.62mm", description="Radziecki karabin samopowtarzalny."),
            Weapon(name="TT-33", category="Pistolet", year=1933, caliber="7.62mm", description="Radziecki pistolet maszynowy dla kadry oficerskiej."),
            Weapon(name="Lee-Enfield No.4", category="Karabin", year=1939, caliber=".303 British", description="Brytyjski karabin powtarzalny, standardowa broń piechoty."),
            Weapon(name="Bren", category="Karabin maszynowy", year=1938, caliber=".303 British", description="Brytyjski lekki karabin maszynowy."),
            Weapon(name="Webley Mk VI", category="Pistolet", year=1932, caliber=".455", description="Brytyjski pistolet służbowy."),
            Weapon(name="M1 Garand", category="Karabin półautomatyczny", year=1936, caliber=".30-06", description="Amerykański karabin półautomatyczny, standardowa broń piechoty."),
            Weapon(name="Thompson M1928", category="Pistolet maszynowy", year=1928, caliber=".45 ACP", description="Amerykański pistolet maszynowy, popularny w wojsku i u gangsterów."),
            Weapon(name="M1911", category="Pistolet", year=1911, caliber=".45 ACP", description="Amerykański klasyczny pistolet służbowy."),
            Weapon(name="PPD-34/38", category="Pistolet maszynowy", year=1934, caliber="7.62mm", description="Radziecki wczesny PM z okresu przed i w trakcie wojny."),
            Weapon(name="K98k Karabiner", category="Karabin", year=1935, caliber="7.92mm", description="Niemiecki standardowy karabin powtarzalny."),
            Weapon(name="Vis wz. 35", category="Pistolet", year=1935, caliber="9mm", description="Polski pistolet wojskowy."),
            Weapon(name="RKM wz. 28", category="Karabin maszynowy", year=1928, caliber="7.92mm", description="Polski lekki karabin maszynowy."),
            Weapon(name="Sten Mk II", category="Pistolet maszynowy", year=1941, caliber="9mm", description="Brytyjski prosty i tani PM."),
            Weapon(name="Bazooka M1", category="Granatnik", year=1942, caliber="60mm", description="Amerykański granatnik przeciwpancerny.")
        ]
```
W powyższym kodzie zgodnie z przykładami można stworzyć własne demo, które będzie dodawane do bazy podczas, gdy będzie ona pusta ( baza startowa ).
   np. Weapon(name="x", category="y", year=xxxx, caliber="z", description="text")

## Porty poszczególnych rzeczy w aplikacji

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

Cały zespół pracował wmiarę równo, każdy dołożył coś od siebie, a przynajmniej to, co potrafił, a jeżeli nie potrafił czegoś zrobić, 
to poradził sobie w inny sposób. 
---
