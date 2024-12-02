import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import { db } from "./firebaseConfig.js";


// Referencia a la colección Firestore
const productCollection = collection(db, "productos");

// Elementos del DOM
const productForm = document.getElementById("product-form");
const productList = document.getElementById("product-list");

// Crear un producto
const createProduct = async (product) => {
    try {
        await addDoc(productCollection, product);
        alert("Producto creado con éxito");
        loadProducts();
    } catch (error) {
        console.error("Error al crear el producto:", error);
    }
};

// Leer productos
const loadProducts = async () => {
    try {
        productList.innerHTML = "";
        const querySnapshot = await getDocs(productCollection);
        querySnapshot.forEach((doc) => {
            const product = doc.data();
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <strong>${product.codigo} - ${product.nombre}</strong><br>
                Precio: $${product.precio}<br>
                Proveedor: ${product.proveedor}<br>
                Unidades: ${product.unidades}<br>
                <button onclick="deleteProduct('${doc.id}')">Eliminar</button>
                <button onclick="editProduct('${doc.id}', '${product.codigo}', '${product.nombre}', '${product.precio}', '${product.proveedor}', '${product.unidades}')">Editar</button>
            `;
            productList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
};

// Eliminar un producto
window.deleteProduct = async (id) => {
    try {
        await deleteDoc(doc(db, "productos", id));
        alert("Producto eliminado con éxito");
        loadProducts();
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
    }
};

// Editar un producto
window.editProduct = (id, codigo, nombre, precio, proveedor, unidades) => {
    document.getElementById("codigo").value = codigo;
    document.getElementById("nombre").value = nombre;
    document.getElementById("precio").value = precio;
    document.getElementById("proveedor").value = proveedor;
    document.getElementById("unidades").value = unidades;

    productForm.onsubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedProduct = {
                codigo: document.getElementById("codigo").value,
                nombre: document.getElementById("nombre").value,
                precio: Number(document.getElementById("precio").value),
                proveedor: document.getElementById("proveedor").value,
                unidades: Number(document.getElementById("unidades").value),
            };
            await updateDoc(doc(db, "productos", id), updatedProduct);
            alert("Producto actualizado con éxito");
            productForm.reset();
            productForm.onsubmit = handleSubmit;
            loadProducts();
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
        }
    };
};

// Manejar el envío del formulario
const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
        codigo: document.getElementById("codigo").value,
        nombre: document.getElementById("nombre").value,
        precio: Number(document.getElementById("precio").value),
        proveedor: document.getElementById("proveedor").value,
        unidades: Number(document.getElementById("unidades").value),
    };
    await createProduct(product);
    productForm.reset();
};

// Asignar evento al formulario
productForm.onsubmit = handleSubmit;

// Cargar productos al iniciar
loadProducts();
