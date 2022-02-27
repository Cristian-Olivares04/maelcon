import Company from "../models/company";

//crear empresa
export const createCompany = async (req, res) => {
  let {
    name,
    phone,
    address,
    lat,
    long,
    email,
    description,
    category,
    imgProfile,
    imgBanner,
  } = req.body;
  const newCompany = new Company({
    name,
    phone,
    address,
    lat,
    long,
    email,
    description,
    category,
    imgProfile,
    imgBanner,
  });

  //Guardando el motorista en la base de datos
  const companySaved = await newCompany.save();

  //Retorna el estatus de la solicitud y el motorista
  res.status(201).json(companySaved);
};

//Obtener empresas
export const getCompanies = async (req, res) => {
  const companies = await Company.find();
  res.json(companies);
};

//Obtener empresa por ID
export const getCompanyById = async (req, res) => {
  const company = await Company.findById(req.params.companyId)
    .then((result) => {
      res.status(200).json(result);
      res.end();
    })
    .catch((error) => {
      res.status(400).json({ mensaje: "company no encontrada: ", error });
    });
};

//Actualizar empresas
export const updateCompanyById = async (req, res) => {
  //Actualizar el objeto enviado con el ID como parametro y el contenido dentro del req.body
  const updatedCompany = await Company.findByIdAndUpdate(
    req.params.companyId,
    req.body,
    { new: true }
  )
    .then((result) => {
      res.status(204).json(result);
    })
    .catch((error) => {
      res.status(400).json({ mensaje: "company no actualizada: ", error });
    });
};

//Eliminar empresas
export const deleteCompanyById = async (req, res) => {
  await Company.findByIdAndDelete(req.params.companyId)
    .then((result) => {
      res.status(204).json();
      res.end();
    })
    .catch((error) => {
      res.status(400).json({ mensaje: "company no se pudo eliminar: ", error });
      res.end();
    });
};

//obtener empresas por categoria

export const getCompaniesByName = async (req, res) => {
  try {
    const companies = await Company.find({ category: req.params.categoryName });
    console.log(companies);
    res.status(200).json({ companies });
  } catch (error) {
    res.status(401).json({ mensajeError: error });
  }
};

//obtener categorias
export const getCategories = async (req, res) => {
  const categories = [
    {
      nombre: "Restaurantes",
      imgCat:
        "https://consumer.healthday.com/media-library/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXNzZXRzLnJibC5tcy8yNzc2MzkyOC9vcmlnaW4uanBnIiwiZXhwaXJlc19hdCI6MTY1NjY4ODM1Mn0.XRxhN87l67pVgr2y0ha6wpp6LVSYeQGw2B_MioZAoZM/image.jpg?width=1245&quality=85&coordinates=0%2C0%2C0%2C0&height=700",
    },
    {
      nombre: "Farmacia",
      imgCat: "../../../assets/img/farmacia 1.jpg",
    },
    {
      nombre: "Ferreteria",
      imgCat: "https://www.aecoc.es/wp-content/uploads/2021/08/1592312156839-296x197.jpg",
    },
    {
      nombre: "Supermercado",
      imgCat: "https://i.blogs.es/0baa91/39f95492-38ee-4f16-92e1-ba5161f4a958/1366_2000.jpeg",
    },
    {
      nombre: "Ropa",
      imgCat: "https://www.hola.com/imagenes/estar-bien/20180312121453/ropa-contamina-medio-ambiente/0-548-821/ropa-medioambiente-t.webp?filter=high",
    }
  ];
  const companies = await Company.find()
    .then((result) => {
      res.status(200).json(categories);
      res.end();
    })
    .catch((error) => {
      res.status(400).json({ mensaje: "company no" });
      res.end();
    });
};
