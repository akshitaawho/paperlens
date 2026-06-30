from sqlalchemy import Column, String
from app.database import Base


class Paper(Base):

    __tablename__ = "papers"

    paper_id = Column(
        String,
        primary_key=True,
        index=True
    )

    paper_title = Column(
        String,
        nullable=False
    )