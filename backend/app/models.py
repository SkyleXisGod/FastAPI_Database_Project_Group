from sqlalchemy import Column, Integer, String, Text
from .database import Base  # import podstawy do tworzenia modeli

# model broni w bazie danych
class Weapon(Base):
    __tablename__ = "weapons"  # nazwa tabeli w bazie

    # kolumna ID, klucz główny, automatycznie indeksowany
    id = Column(Integer, primary_key=True, index=True)

    # kolumna nazwy broni, wymagane pole
    name = Column(String, index=True, nullable=False)

    # kolumna kategorii broni, np. Karabin, Pistolet
    category = Column(String, nullable=True)

    # kolumna kalibru, np. 7.62, 9mm
    caliber = Column(String, nullable=True)

    # kolumna roku produkcji
    year = Column(Integer, nullable=True)

    # kolumna opisu broni, tekst dłuższy
    description = Column(Text, nullable=True)
