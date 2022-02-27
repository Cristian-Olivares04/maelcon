//para subir imagenes investigar bibliotecas busboy y multer

import Product from "../models/Products";

export const createProduct = async (req, res) => {
  console.log(req.body);

  //Destructuring el objeto de req
  const { name, companyID, price, imgURL, status, description } = req.body;

  // Asignando los valores enviados por el JSON a un Producto
  const newProduct = new Product({
    name,
    companyID,
    price,
    imgURL,
    status,
    description,
  });

  //Guardando el producto en la base de datos
  const productSaved = await newProduct.save();

  //Retorna el estatus de la solicitud y el producto almacenado en la base de datos
  res.status(201).json(productSaved);
};

export const getProducts = async (req, res) => {
  //retornando todos los productos almacenados
  const products = await Product.find();
  res.json(products);
};

export const getProductByCompany = async (req, res) => {
  try {
    const products = await Product.find({companyID: req.params.companyID});
    res.json(products);
  } catch (error) {
    res.status(401).json(error)
  }
};

export const getProductById = async (req, res) => {
  //Obtener un producto enviando el Id como parametro en el Request
  const product = await Product.findById(req.params.productId);
  res.status(200).json(product);
};

export const updateProductById = async (req, res) => {
  //Actualizar el objeto enviado con el ID como parametro y el contenido dentro del req.body
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    { new: true }
  );
  res.status(204).json(updatedProduct);
};

export const deleteProductById = async (req, res) => {
  // Obteniendo el productID de los paramentros enviados
  const { productId } = req.params;
  // Eliminando el producto seleccionado
  await Product.findByIdAndDelete(productId);
  //respuesta por parte del servidor con el codigo 204
  res.status(204).json();
};
