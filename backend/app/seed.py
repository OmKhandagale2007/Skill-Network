from sqlalchemy.orm import Session

from . import models
from .auth import hash_password

SEED_USERS = [
    dict(
        name="Priya Sharma",
        email="priya@example.edu",
        password="demo1234",
        avatar="PS",
        bio="Full-stack dev who loves building products that help students.",
        skills=["React", "TypeScript", "Node.js", "UI Design"],
        looking_for="Hackathon teammates and open source collaborators",
        github="gaearon",
        linkedin="",
        college="IIT Bombay",
    ),
    dict(
        name="Arjun Mehta",
        email="arjun@example.edu",
        password="demo1234",
        avatar="AM",
        bio="Designer focused on clean, accessible interfaces for campus apps.",
        skills=["UI/UX", "Figma", "Prototyping", "User Research"],
        looking_for="A frontend dev to pair with on a campus app redesign",
        github="addyosmani",
        linkedin="",
        college="IIT Bombay",
    ),
    dict(
        name="Rahul Verma",
        email="rahul@example.edu",
        password="demo1234",
        avatar="RV",
        bio="ML enthusiast building practical AI solutions for real-world problems.",
        skills=["Machine Learning", "Python", "TensorFlow", "Data Analysis"],
        looking_for="Research collaborators and Kaggle teammates",
        github="karpathy",
        linkedin="",
        college="IIT Bombay",
    ),
    dict(
        name="Sneha Patel",
        email="sneha@example.edu",
        password="demo1234",
        avatar="SP",
        bio="Infrastructure nerd who keeps hackathon projects running smoothly.",
        skills=["DevOps", "Docker", "AWS", "CI/CD"],
        looking_for="Teams that need deployment and infra help for hackathons",
        github="kelseyhightower",
        linkedin="",
        college="IIT Bombay",
    ),
    dict(
        name="Karan Singh",
        email="karan@example.edu",
        password="demo1234",
        avatar="KS",
        bio="Mobile-first builder with a passion for campus startups.",
        skills=["Mobile Dev", "Flutter", "Firebase", "React Native"],
        looking_for="A co-founder or teammate for a campus startup idea",
        github="Hixie",
        linkedin="",
        college="IIT Bombay",
    ),
    dict(
        name="Ananya Reddy",
        email="ananya@example.edu",
        password="demo1234",
        avatar="AR",
        bio="Backend specialist who mentors juniors and loves scalable systems.",
        skills=["Backend", "Go", "PostgreSQL", "System Design"],
        looking_for="Mentees, or backend help on distributed systems projects",
        github="rsc",
        linkedin="",
        college="IIT Bombay",
    ),
]


def seed_if_empty(db: Session) -> None:
    if db.query(models.User).count() > 0:
        return

    for entry in SEED_USERS:
        user = models.User(
            name=entry["name"],
            email=entry["email"],
            password_hash=hash_password(entry["password"]),
            avatar=entry["avatar"],
            bio=entry["bio"],
            skills=entry["skills"],
            looking_for=entry["looking_for"],
            github=entry["github"],
            linkedin=entry["linkedin"],
            college=entry["college"],
        )
        db.add(user)
    db.commit()
