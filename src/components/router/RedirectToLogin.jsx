import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RedirectToLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  });
}
