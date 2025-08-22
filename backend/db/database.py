from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

from backend.core.config import settings

engine = create_engine(
    settings.DATABASE_URL,
)

# This session factory will be used to create new database sessions.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# This is the base class for all models in the application.
Base = declarative_base()

# This function provides a session to interact with the database.
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# This function creates the database tables based on the models defined in the application.
def create_tables():
    Base.metadata.create_all(bind=engine)

# This function drops all tables in the database. Use with caution.
def drop_tables():
    Base.metadata.drop_all(bind=engine)