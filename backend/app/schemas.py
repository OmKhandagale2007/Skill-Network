from typing import List, Optional

from pydantic import BaseModel, EmailStr, Field, field_validator


class SignupRequest(BaseModel):
    name: str
    email: EmailStr
    password: str = Field(min_length=6)
    bio: str = ""
    skills: List[str]
    lookingFor: str = ""
    github: str
    linkedin: Optional[str] = ""
    college: Optional[str] = ""

    @field_validator("skills")
    @classmethod
    def at_least_one_skill(cls, v: List[str]) -> List[str]:
        cleaned = [s.strip() for s in v if s.strip()]
        if not cleaned:
            raise ValueError("At least one skill is required.")
        return cleaned

    @field_validator("name", "github")
    @classmethod
    def not_blank(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("This field cannot be blank.")
        return v.strip()


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class ProfileUpdateRequest(BaseModel):
    """All fields optional — only provided fields are updated."""

    bio: Optional[str] = None
    skills: Optional[List[str]] = None
    lookingFor: Optional[str] = None
    github: Optional[str] = None
    linkedin: Optional[str] = None
    college: Optional[str] = None


class UserPublic(BaseModel):
    id: str
    name: str
    email: EmailStr
    avatar: str
    bio: str
    skills: List[str]
    lookingFor: str
    github: str
    linkedin: Optional[str] = ""
    college: Optional[str] = ""
    createdAt: int

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    token: str
    user: UserPublic
