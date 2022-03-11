export default function verifyLogged() {
  if (localStorage.getItem("user") === null)
    window.location.replace(window.location.origin);
}
