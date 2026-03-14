"use client";

import { useState, useEffect, useCallback } from "react";
import TeamMemberCard from "./components/TeamMemberCard";
import MemberFormModal from "./components/MemberFormModal";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function TeamPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/api/team`);
      if (!res.ok) throw new Error(`Failed to fetch (${res.status})`);
      const data = await res.json();
      setMembers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const handleAdd = () => {
    setEditingMember(null);
    setModalOpen(true);
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API}/api/team/${id}`, { method: "DELETE" });
      setMembers((prev) => prev.filter((m) => m.id !== id));
    } catch {
      alert("Failed to delete member");
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingMember) {
        const res = await fetch(`${API}/api/team/${editingMember.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const updated = await res.json();
        setMembers((prev) =>
          prev.map((m) => (m.id === editingMember.id ? updated : m))
        );
      } else {
        const res = await fetch(`${API}/api/team`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const created = await res.json();
        setMembers((prev) => [...prev, created]);
      }
      setModalOpen(false);
      setEditingMember(null);
    } catch {
      alert("Failed to save member");
    }
  };

  return (
    <main
      className="min-h-screen"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Hero header */}
      <header className="relative overflow-hidden pt-20 pb-16 px-6">
        {/* Background glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px] opacity-20 pointer-events-none"
          style={{ background: "var(--accent-gradient)" }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg font-black"
                  style={{ background: "var(--accent-gradient)" }}
                >
                  A
                </div>
                <span
                  className="text-sm font-semibold tracking-wider uppercase"
                  style={{ color: "var(--text-muted)" }}
                >
                  Armatrix
                </span>
              </div>
              <h1
                className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Meet Our Team
              </h1>
              <p
                className="text-lg max-w-lg"
                style={{ color: "var(--text-secondary)" }}
              >
                The brilliant minds building the future of enterprise
                automation.
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Admin toggle */}
              <div className="flex items-center gap-3">
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{
                    color: isAdmin
                      ? "var(--accent-solid)"
                      : "var(--text-muted)",
                  }}
                >
                  Admin
                </span>
                <div
                  className={`toggle-track ${isAdmin ? "active" : ""}`}
                  onClick={() => setIsAdmin(!isAdmin)}
                  role="switch"
                  aria-checked={isAdmin}
                  id="admin-toggle"
                >
                  <div className="toggle-thumb" />
                </div>
              </div>

              {/* Add button (shown only in Admin Mode) */}
              {isAdmin && (
                <button
                  className="btn-accent flex items-center gap-2"
                  onClick={handleAdd}
                  id="add-member-btn"
                  style={{ animation: "slideUp 0.3s ease" }}
                >
                  <span className="text-lg leading-none">+</span>
                  Add Member
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass-card p-6">
                <div className="skeleton w-24 h-24 mx-auto mb-5 rounded-2xl" />
                <div className="skeleton h-5 w-32 mx-auto mb-2 rounded-lg" />
                <div className="skeleton h-4 w-24 mx-auto mb-3 rounded-lg" />
                <div className="skeleton h-3 w-full mb-1 rounded-lg" />
                <div className="skeleton h-3 w-full mb-1 rounded-lg" />
                <div className="skeleton h-3 w-3/4 mx-auto rounded-lg" />
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div
            className="glass-card p-8 text-center max-w-md mx-auto"
            style={{ borderColor: "rgba(239, 68, 68, 0.2)" }}
          >
            <div className="text-4xl mb-4">⚠️</div>
            <h3
              className="text-lg font-bold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Connection Error
            </h3>
            <p
              className="text-sm mb-5"
              style={{ color: "var(--text-secondary)" }}
            >
              {error}
            </p>
            <button className="btn-accent" onClick={fetchMembers}>
              Try Again
            </button>
          </div>
        )}

        {/* Members grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {members.map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                isAdmin={isAdmin}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
            {members.length === 0 && (
              <div
                className="col-span-full text-center py-20"
                style={{ color: "var(--text-muted)" }}
              >
                <div className="text-5xl mb-4">👥</div>
                <p className="text-lg font-medium">No team members yet</p>
                {isAdmin && (
                  <p className="text-sm mt-2">
                    Click &quot;Add Member&quot; to get started.
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Modal */}
      <MemberFormModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingMember(null);
        }}
        onSubmit={handleSubmit}
        member={editingMember}
      />
    </main>
  );
}
