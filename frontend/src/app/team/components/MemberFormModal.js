"use client";

import { useState, useEffect } from "react";

const EMPTY_FORM = {
  name: "",
  role: "",
  bio: "",
  photo_url: "",
  linkedin_url: "",
};

export default function MemberFormModal({ isOpen, onClose, onSubmit, member }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const isEdit = !!member;

  useEffect(() => {
    if (member) {
      setForm({
        name: member.name,
        role: member.role,
        bio: member.bio,
        photo_url: member.photo_url,
        linkedin_url: member.linkedin_url,
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [member, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const fields = [
    { name: "name", label: "Full Name", placeholder: "Jane Doe", type: "text" },
    { name: "role", label: "Role", placeholder: "Lead Engineer", type: "text" },
    {
      name: "bio",
      label: "Bio",
      placeholder: "A short biography...",
      type: "textarea",
    },
    {
      name: "photo_url",
      label: "Photo URL",
      placeholder: "https://images.unsplash.com/...",
      type: "text",
    },
    {
      name: "linkedin_url",
      label: "LinkedIn URL",
      placeholder: "https://linkedin.com/in/...",
      type: "text",
    },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            {isEdit ? "Edit Member" : "Add New Member"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
            style={{
              color: "var(--text-muted)",
              background: "var(--bg-card)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--text-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-muted)")
            }
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="form-label" htmlFor={field.name}>
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required
                  rows={3}
                  className="form-input resize-none"
                />
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required
                  type="text"
                  className="form-input"
                />
              )}
            </div>
          ))}

          <div className="flex gap-3 mt-2">
            <button type="submit" className="btn-accent flex-1">
              {isEdit ? "Save Changes" : "Add Member"}
            </button>
            <button type="button" className="btn-ghost flex-1" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
