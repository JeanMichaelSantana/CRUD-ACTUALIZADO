const API = "http://localhost:3000/api/transacciones";

const form = document.getElementById("form");
const lista = document.getElementById("lista");
const balanceEl = document.getElementById("balance");
const filtro = document.getElementById("filtro");

let transacciones = [];
let editId = null;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    descripcion: descripcion.value,
    monto: Number(monto.value),
    tipo: tipo.value,
    categoria: categoria.value
  };

  if (editId) {
    await fetch(`${API}/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    editId = null;
  } else {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  }

  form.reset();
  cargar();
});

async function cargar() {
  const res = await fetch(API);
  transacciones = await res.json();
  render();
}

function render() {
  const filtroTexto = filtro.value.toLowerCase();

  lista.innerHTML = "";

  let balance = 0;

  transacciones
    .filter(t => t.categoria.toLowerCase().includes(filtroTexto))
    .forEach(t => {
      balance += t.tipo === "ingreso" ? t.monto : -t.monto;

      const li = document.createElement("li");
      li.innerHTML = `
        ${t.descripcion} - $${t.monto} (${t.categoria})
        <button onclick="editar('${t._id}')">Editar</button>
        <button onclick="eliminar('${t._id}')">Eliminar</button>
      `;
      lista.appendChild(li);
    });

  balanceEl.textContent = balance;
}

async function eliminar(id) {
  if (!confirm("¿Eliminar?")) return;

  await fetch(`${API}/${id}`, { method: "DELETE" });
  cargar();
}

function editar(id) {
  const t = transacciones.find(t => t._id === id);

  descripcion.value = t.descripcion;
  monto.value = t.monto;
  tipo.value = t.tipo;
  categoria.value = t.categoria;

  editId = id;
}

filtro.addEventListener("input", render);

cargar();