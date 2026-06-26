import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.password ||
      !form.mobile
    ) {
      setError("Please fill in all fields");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      setError("Invalid email");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(form.mobile) && form.mobile.length !== 10) {
      setError("Enter valid mobile number");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        mobile: form.mobile,
        password: form.password,
        confirmPassword: form.confirmPassword,
      };

      const { data } = await register(payload);

      login(data);

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-icon">🛍</div>
          <h1>ShopHub</h1>
          <p>Create your account</p>
        </div>
        {error && <div className="alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full name</label>
            <input
              value={form.name}
              onChange={set("name")}
              placeholder="Jane Smith"
              autoComplete="name"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label>Contact</label>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              name="mobile"
              value={form.mobile}
              onChange={set("mobile")}
              placeholder="Ex- 9125458468"
              autoComplete="mobile"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={set("password")}
              placeholder="At least 6 characters"
              autoComplete="new-password"
            />
          </div>
          <div className="form-group">
            <label>Confirm Password </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={set("confirmPassword")}
              placeholder="Repeat Password"
              autoComplete="new-password"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={loading}
          >
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>
        <p
          style={{
            textAlign: "center",
            fontSize: 14,
            color: "#666",
            marginTop: 20,
          }}
        >
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#2563eb", fontWeight: 600 }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
