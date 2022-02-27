import Order from "../models/Order";

//crear orden
export const createOrder = async (req, res) => {
  let {
    productsId,
    userId,
    driverId,
    deliveryAddress,
    lat,
    long,
    status,
    statusDetail,
    observation,
    payment,
  } = req.body;
  const newOrder = new Order({
    productsId,
    userId,
    driverId,
    deliveryAddress,
    lat,
    long,
    status,
    statusDetail,
    observation,
    payment,
  });

  //Guardando el motorista en la base de datos
  const orderSaved = await newOrder.save();

  //Retorna el estatus de la solicitud y el motorista
  res.status(201).json(orderSaved);
};

// Obtener todas las ordenes
export const getOrders = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};

//Obtener una orden por id
export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.orderId)
    .then((result) => {
      res.status(200).json(result);
      res.end();
    })
    .catch((error) => {
      res.status(400).json({ mensaje: "Pedido no encontrado" });
    });
};

//Actualiza campos de una orden
export const updateOrderById = async (req, res) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.orderId,
    req.body,
    { new: true }
  );
  res.status(204).json(updatedOrder);
};

//eliminar una orden
export const deleteOrderById = async (req, res) => {
    await Order.findByIdAndDelete(
      req.params.orderId
    );
    res.status(204).json();
  };
  