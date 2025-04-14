import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirm: "",
    first_name: "",
    last_name: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    } else if (formData.email.length > 254) {
      newErrors.email = "Email must be less than 254 characters";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 1) {
      newErrors.password = "Password is required";
    }

    // Password confirmation
    if (!formData.password_confirm) {
      newErrors.password_confirm = "Please confirm your password";
    } else if (formData.password !== formData.password_confirm) {
      newErrors.password_confirm = "Passwords do not match";
    }

    // First name validation
    if (!formData.first_name) {
      newErrors.first_name = "First name is required";
    } else if (formData.first_name.length > 30) {
      newErrors.first_name = "First name must be less than 30 characters";
    }

    // Last name validation
    if (!formData.last_name) {
      newErrors.last_name = "Last name is required";
    } else if (formData.last_name.length > 30) {
      newErrors.last_name = "Last name must be less than 30 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("https://live-merely-drum.ngrok-free.app/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420"
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ api: data.message || "Registration failed" });
        }
        return;
      }

      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ api: "An error occurred during registration" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="flex-row justify-center">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-96">
          <h2 className="text-white text-2xl font-semibold text-center mb-6">Sign Up</h2>
          
          {errors.api && (
            <div className="mb-4 p-2 bg-red-500 text-white rounded text-sm">
              {errors.api}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  className={`p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full ${
                    errors.first_name ? "border border-red-500" : ""
                  }`}
                  value={formData.first_name}
                  onChange={handleChange}
                  maxLength={30}
                />
                {errors.first_name && (
                  <p className="mt-1 text-sm text-red-500">{errors.first_name}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  className={`p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full ${
                    errors.last_name ? "border border-red-500" : ""
                  }`}
                  value={formData.last_name}
                  onChange={handleChange}
                  maxLength={30}
                />
                {errors.last_name && (
                  <p className="mt-1 text-sm text-red-500">{errors.last_name}</p>
                )}
              </div>
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={`p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full ${
                  errors.email ? "border border-red-500" : ""
                }`}
                value={formData.email}
                onChange={handleChange}
                maxLength={254}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={`p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full ${
                  errors.password ? "border border-red-500" : ""
                }`}
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="password_confirm"
                placeholder="Confirm Password"
                className={`p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full ${
                  errors.password_confirm ? "border border-red-500" : ""
                }`}
                value={formData.password_confirm}
                onChange={handleChange}
              />
              {errors.password_confirm && (
                <p className="mt-1 text-sm text-red-500">{errors.password_confirm}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        </div>
        
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Login instead
          </button>
        </div>
      </div>
    </div>
  );
}