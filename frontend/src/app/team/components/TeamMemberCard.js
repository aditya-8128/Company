"use client";

export default function TeamMemberCard({
  member,
  isAdmin,
  onEdit,
  onDelete,
}) {
  return (
    <div className="glass-card group relative overflow-hidden p-6">
      {/* Gradient accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "var(--accent-gradient)" }}
      />

      {/* Photo */}
      <div className="relative w-24 h-24 mx-auto mb-5 rounded-2xl overflow-hidden ring-2 ring-white/5 group-hover:ring-white/10 transition-all duration-500">
        <img
          src={member.photo_url}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Info */}
      <div className="text-center">
        <h3 className="text-lg font-bold mb-1" style={{ color: "var(--text-primary)" }}>
          {member.name}
        </h3>
        <p
          className="text-sm font-medium mb-3 bg-clip-text text-transparent"
          style={{ backgroundImage: "var(--accent-gradient)" }}
        >
          {member.role}
        </p>
        <p
          className="text-sm leading-relaxed mb-4"
          style={{ color: "var(--text-secondary)" }}
        >
          {member.bio}
        </p>

        {/* LinkedIn */}
        <a
          href={member.linkedin_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-medium transition-colors duration-300"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--text-primary)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--text-muted)")
          }
        >
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          LinkedIn
        </a>
      </div>

      {/* Admin actions */}
      {isAdmin && (
        <div
          className="flex gap-2 mt-5 pt-4"
          style={{ borderTop: "1px solid var(--border-subtle)" }}
        >
          <button
            className="btn-ghost flex-1 text-xs"
            onClick={() => onEdit(member)}
          >
            ✏️ Edit
          </button>
          <button
            className="btn-danger flex-1 text-xs"
            onClick={() => onDelete(member.id)}
          >
            🗑 Delete
          </button>
        </div>
      )}
    </div>
  );
}
