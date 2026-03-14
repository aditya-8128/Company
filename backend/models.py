from pydantic import BaseModel
from typing import Optional
import uuid


class TeamMemberCreate(BaseModel):
    name: str
    role: str
    bio: str
    photo_url: str
    linkedin_url: str


class TeamMember(TeamMemberCreate):
    id: str

    @staticmethod
    def new(data: TeamMemberCreate) -> "TeamMember":
        return TeamMember(id=str(uuid.uuid4()), **data.model_dump())
