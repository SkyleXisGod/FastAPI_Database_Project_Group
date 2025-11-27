from sqlalchemy.orm import Session
from .models import Weapon

# Pobranie wszystkich broni z bazy
def get_all_weapons(db: Session):
    return db.query(Weapon).all()

# Pobranie jednej broni po ID
def get_weapon(db: Session, weapon_id: int):
    return db.query(Weapon).filter(Weapon.id == weapon_id).first()

# Dodanie nowej broni do bazy
def create_weapon(db: Session, data: dict):
    w = Weapon(**data)  # Stworzenie obiektu Weapon
    db.add(w)           # Dodanie do sesji
    db.commit()         # Zapisanie zmian w bazie
    db.refresh(w)       # Odświeżenie obiektu z bazy
    return w

# Aktualizacja istniejącej broni po ID
def update_weapon(db: Session, weapon_id: int, data: dict):
    w = get_weapon(db, weapon_id)  # Pobranie broni
    if not w:
        return None               # Zwrócenie None jeśli nie ma broni
    for k, v in data.items():     # Przepisanie wartości z data
        setattr(w, k, v)
    db.commit()                   # Zapisanie zmian
    db.refresh(w)                 # Odświeżenie obiektu
    return w

# Usunięcie broni po ID
def delete_weapon(db: Session, weapon_id: int):
    w = get_weapon(db, weapon_id) # Pobranie broni
    if not w:
        return False              # Zwrócenie False jeśli nie ma broni
    db.delete(w)                  # Usunięcie z bazy
    db.commit()                   # Zapisanie zmian
    return True
