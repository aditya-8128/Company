from models import TeamMember

TEAM_MEMBERS: dict[str, TeamMember] = {}


def seed():
    members = [
        TeamMember(
            id="1",
            name="Priya Sharma",
            role="CEO & Co-Founder",
            bio="Former Google engineer with 10+ years in distributed systems. Priya leads Armatrix's vision to redefine enterprise automation through AI-first architecture.",
            photo_url="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
            linkedin_url="https://linkedin.com/in/priyasharma",
        ),
        TeamMember(
            id="2",
            name="Marcus Chen",
            role="CTO",
            bio="ML researcher turned startup builder. Marcus architects Armatrix's core platform and holds two patents in real-time data pipeline optimization.",
            photo_url="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
            linkedin_url="https://linkedin.com/in/marcuschen",
        ),
        TeamMember(
            id="3",
            name="Elena Rodriguez",
            role="VP of Product",
            bio="Product leader with a design-thinking mindset. Elena previously scaled a SaaS product from zero to 50K users at a YC-backed startup.",
            photo_url="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
            linkedin_url="https://linkedin.com/in/elenarodriguez",
        ),
        TeamMember(
            id="4",
            name="James Okafor",
            role="Lead Engineer",
            bio="Full-stack polyglot passionate about developer experience. James leads the engineering team and champions clean architecture and CI/CD best practices.",
            photo_url="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
            linkedin_url="https://linkedin.com/in/jamesokafor",
        ),
    ]
    for m in members:
        TEAM_MEMBERS[m.id] = m


seed()
