from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import TeamMember, TeamMemberCreate
from data import TEAM_MEMBERS

app = FastAPI(title="Armatrix Team API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/team", response_model=list[TeamMember])
def list_members():
    return list(TEAM_MEMBERS.values())


@app.get("/api/team/{member_id}", response_model=TeamMember)
def get_member(member_id: str):
    if member_id not in TEAM_MEMBERS:
        raise HTTPException(status_code=404, detail="Member not found")
    return TEAM_MEMBERS[member_id]


@app.post("/api/team", response_model=TeamMember, status_code=201)
def create_member(payload: TeamMemberCreate):
    member = TeamMember.new(payload)
    TEAM_MEMBERS[member.id] = member
    return member


@app.put("/api/team/{member_id}", response_model=TeamMember)
def update_member(member_id: str, payload: TeamMemberCreate):
    if member_id not in TEAM_MEMBERS:
        raise HTTPException(status_code=404, detail="Member not found")
    updated = TeamMember(id=member_id, **payload.model_dump())
    TEAM_MEMBERS[member_id] = updated
    return updated


@app.delete("/api/team/{member_id}", status_code=204)
def delete_member(member_id: str):
    if member_id not in TEAM_MEMBERS:
        raise HTTPException(status_code=404, detail="Member not found")
    del TEAM_MEMBERS[member_id]
