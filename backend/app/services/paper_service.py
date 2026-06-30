from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models import Paper


def add_paper(paper):

    db: Session = SessionLocal()

    existing = db.get(
        Paper,
        paper["paper_id"]
    )

    if existing is None:

        new_paper = Paper(

            paper_id=paper["paper_id"],

            paper_title=paper["paper_title"]

        )

        db.add(new_paper)

        db.commit()

    db.close()


def get_all_papers():

    db: Session = SessionLocal()

    papers = db.query(Paper).all()

    db.close()

    return papers


def get_paper(paper_id):

    db: Session = SessionLocal()

    paper = db.get(
        Paper,
        paper_id
    )

    db.close()

    return paper