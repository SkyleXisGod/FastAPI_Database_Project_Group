from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Adres bazy danych SQLite
DATABASE_URL = "sqlite:///./weapons.db"

# Stworzenie silnika bazy danych
# connect_args={"check_same_thread": False} potrzebne dla SQLite w wielu wątkach
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# Stworzenie klasy sesji do operacji w bazie
SessionLocal = sessionmaker(
    autocommit=False,  # zmiany nie zapisują się automatycznie
    autoflush=False,   # zmiany nie wysyłają się do bazy automatycznie
    bind=engine        # powiązanie z naszym silnikiem bazy
)

# Podstawa dla modeli SQLAlchemy
Base = declarative_base()
