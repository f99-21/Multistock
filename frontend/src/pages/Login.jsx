import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Lock, User, AlertCircle } from "lucide-react";
import logoImg from "../assets/logo.jpeg";

export function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    if (!username || !password) {

      setError(
        "Por favor ingrese usuario y contraseña"
      );

      return;
    }

    const response = await login(
      username,
      password
    );

    if (response.success) {

      navigate("/dashboard");

    } else {

      setError(
        response.message ||
        "Usuario o contraseña incorrectos"
      );

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center p-4">

      <div className="w-full max-w-md">

        <div className="bg-white rounded-2xl shadow-2xl p-8">

          {/* Logo */}

          <div className="flex justify-center mb-8">

            <img
              src={logoImg}
              alt="Variedades Regalo de Dios"
              className="w-32 h-32 rounded-full object-cover shadow-lg"
            />

          </div>

          {/* Título */}

          <div className="text-center mb-8">

            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              MultiStock SV
            </h1>

            <p className="text-gray-600">
              Sistema de Gestión de Inventario
            </p>

          </div>

          {/* Formulario */}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {error && (

              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3 text-red-700">

                <AlertCircle className="w-5 h-5 flex-shrink-0" />

                <p className="text-sm">
                  {error}
                </p>

              </div>

            )}

            {/* Usuario */}

            <div>

              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Usuario
              </label>

              <div className="relative">

                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">

                  <User className="h-5 w-5 text-gray-400" />

                </div>

                <input
                  id="username"
                  type="email"
                  value={username}
                  onChange={(e)=>
                    setUsername(
                      e.target.value
                    )
                  }
                  placeholder="Ingrese su correo"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />

              </div>

            </div>

            {/* Contraseña */}

            <div>

              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Contraseña
              </label>

              <div className="relative">

                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">

                  <Lock className="h-5 w-5 text-gray-400" />

                </div>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e)=>
                    setPassword(
                      e.target.value
                    )
                  }
                  placeholder="Ingrese su contraseña"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />

              </div>

            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Iniciar Sesión
            </button>

          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">

            <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-600">

              <p className="font-semibold">
                Admin:
              </p>

              <p>
                Correo:
                admin@multistock.com
              </p>

              <p>
                Contraseña:
                admin123
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}