from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from .database import SessionLocal, engine, Base  # import bazy i sesji
from . import models, crud, seed  # import modeli, funkcji CRUD i funkcji seed
from fastapi.middleware.cors import CORSMiddleware

# stworzenie aplikacji FastAPI
app = FastAPI(title="Weapon DB API (proste)")

# dodanie middleware do obsługi CORS (zezwalanie na żądania z każdego źródła)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # zezwalanie z każdego adresu
    allow_credentials=True,
    allow_methods=["*"],   # wszystkie metody HTTP
    allow_headers=["*"],   # wszystkie nagłówki
)

# event uruchamiany przy starcie serwera
@app.on_event("startup")
def startup():
    # tworzenie wszystkich tabel w bazie jeśli ich nie ma
    Base.metadata.create_all(bind=engine)
    # wypełnienie bazy przykładowymi danymi
    seed.create_and_seed()

# funkcja zwracająca sesję bazy danych
def get_db():
    db = SessionLocal()  # otwarcie sesji
    try:
        yield db  # zwrócenie sesji
    finally:
        db.close()  # zamknięcie sesji po użyciu

# endpoint główny
@app.get("/")
def root():
    return {"msg": "Weapon DB API"}

# lista wszystkich broni
@app.get("/weapons")
def list_weapons(db: Session = Depends(get_db)):
    return crud.get_all_weapons(db)

# pobranie jednej broni po ID
@app.get("/weapons/{weapon_id}")
def read_weapon(weapon_id: int, db: Session = Depends(get_db)):
    w = crud.get_weapon(db, weapon_id)
    if not w:
        raise HTTPException(status_code=404, detail="Weapon not found")
    return w

# dodanie nowej broni
@app.post("/weapons", status_code=201)
def create_weapon(payload: dict, db: Session = Depends(get_db)):
    # sprawdzenie czy jest podana nazwa
    if "name" not in payload or not payload["name"]:
        raise HTTPException(status_code=400, detail="name is required")
    return crud.create_weapon(db, payload)

# edycja broni po ID
@app.put("/weapons/{weapon_id}")
def update_weapon(weapon_id: int, payload: dict, db: Session = Depends(get_db)):
    w = crud.update_weapon(db, weapon_id, payload)
    if not w:
        raise HTTPException(status_code=404, detail="Weapon not found")
    return w

# usunięcie broni po ID
@app.delete("/weapons/{weapon_id}", status_code=204)
def delete_weapon(weapon_id: int, db: Session = Depends(get_db)):
    ok = crud.delete_weapon(db, weapon_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Weapon not found")
    return {}
