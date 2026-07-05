import time
import uuid

from sqlalchemy import Column, String, Text, JSON, BigInteger
from sqlalchemy.orm import Mapped

from .database import Base


def new_id() -> str:
    return str(uuid.uuid4())


def now_ms() -> int:
    return int(time.time() * 1000)


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=new_id)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True, index=True)
    password_hash = Column(String, nullable=False)
    avatar = Column(String, nullable=False)
    bio = Column(Text, default="")
    skills = Column(JSON, default=list)  # list[str]
    looking_for = Column(Text, default="")
    github = Column(String, default="")
    linkedin = Column(String, default="")
    college = Column(String, default="")
    created_at = Column(BigInteger, default=now_ms)
