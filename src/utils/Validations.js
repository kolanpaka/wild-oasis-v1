export function validateEmail(value) {
  if (!value.trim()) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
    return "Please enter a valid email";
  return true;
}

export function validatePassword(value) {
  if (!value.trim()) return "Password is required";
  return true;
}
