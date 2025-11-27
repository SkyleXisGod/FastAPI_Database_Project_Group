from .database import engine, Base, SessionLocal
from .models import Weapon

# tworzenie tabel i wypełnienie przykładowymi danymi
def create_and_seed():
    # utworzyć tabele w bazie, jeśli jeszcze nie istnieją
    Base.metadata.create_all(bind=engine)

    # utworzyć sesję do bazy danych
    db = SessionLocal()

    # sprawdzić, czy w tabeli broni są jakieś rekordy
    if db.query(Weapon).count() == 0:
        # dodać przykładowe bronie
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

        # zapisać w bazie wszystkie nowe rekordy
        db.add_all(demo)
        db.commit()

    # zamknąć sesję z bazą
    db.close()

# umożliwić uruchomienie pliku samodzielnie
if __name__ == "__main__":
    create_and_seed()
