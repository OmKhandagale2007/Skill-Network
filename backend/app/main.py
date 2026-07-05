from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from . import models, schemas
from .auth import (
    create_access_token,
    get_current_user,
    hash_password,
    initials,
    verify_password,
)
from .config import CORS_ORIGINS
from .database import Base, SessionLocal, engine, get_db
from .seed import seed_if_empty


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield


app = FastAPI(title="Skill Network API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def to_public(user: models.User) -> schemas.UserPublic:
    return schemas.UserPublic(
        id=user.id,
        name=user.name,
        email=user.email,
        avatar=user.avatar,
        bio=user.bio or "",
        skills=user.skills or [],
        lookingFor=user.looking_for or "",
        github=user.github or "",
        linkedin=user.linkedin or "",
        college=user.college or "",
        createdAt=user.created_at,
    )


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.post("/api/auth/signup", response_model=schemas.TokenResponse, status_code=201)
def signup(payload: schemas.SignupRequest, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(models.User.email == payload.email.lower()).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists — try logging in instead.",
        )

    user = models.User(
        name=payload.name,
        email=payload.email.lower(),
        password_hash=hash_password(payload.password),
        avatar=initials(payload.name),
        bio=payload.bio,
        skills=payload.skills,
        looking_for=payload.lookingFor,
        github=payload.github,
        linkedin=payload.linkedin or "",
        college=payload.college or "",
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token(user.id)
    return schemas.TokenResponse(token=token, user=to_public(user))


@app.post("/api/auth/login", response_model=schemas.TokenResponse)
def login(payload: schemas.LoginRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == payload.email.lower()).first()
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )

    token = create_access_token(user.id)
    return schemas.TokenResponse(token=token, user=to_public(user))


@app.get("/api/auth/me", response_model=schemas.UserPublic)
def me(current_user: models.User = Depends(get_current_user)):
    return to_public(current_user)


@app.get("/api/users", response_model=list[schemas.UserPublic])
def list_users(db: Session = Depends(get_db)):
    users = db.query(models.User).order_by(models.User.created_at.asc()).all()
    return [to_public(u) for u in users]


@app.get("/api/users/{user_id}", response_model=schemas.UserPublic)
def get_user(user_id: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")
    return to_public(user)


@app.patch("/api/users/me", response_model=schemas.UserPublic)
def update_me(
    payload: schemas.ProfileUpdateRequest,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    data = payload.model_dump(exclude_unset=True)
    if "bio" in data:
        current_user.bio = data["bio"]
    if "skills" in data:
        cleaned = [s.strip() for s in data["skills"] if s.strip()]
        if not cleaned:
            raise HTTPException(status_code=400, detail="At least one skill is required.")
        current_user.skills = cleaned
    if "lookingFor" in data:
        current_user.looking_for = data["lookingFor"]
    if "github" in data:
        current_user.github = data["github"]
    if "linkedin" in data:
        current_user.linkedin = data["linkedin"]
    if "college" in data:
        current_user.college = data["college"]

    db.commit()
    db.refresh(current_user)
    return to_public(current_user)
