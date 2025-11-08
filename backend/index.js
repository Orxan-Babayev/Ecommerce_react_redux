// import express from "express";
// import { PrismaClient } from "@prisma/client";
// import cors from "cors";

// const app = express();
// const prisma = new PrismaClient();
// const port = 8001;

// app.use(
//   cors({
//     origin: "http://localhost:5173", // Allow requests from Vite frontend
//   })
// );

// app.use(express.json());

// const parseArrayQuery = (query) => {
//   if (Array.isArray(query)) return query.map((v) => v.toLowerCase());
//   if (typeof query === "string") return [query.toLowerCase()];
//   return [];
// };

// app.get("/products", async (req, res, next) => {
//   try {
//     const {
//       category_name,
//       sub_category,
//       price_gte,
//       price_lte,
//       title_like,
//       color,
//       brand,
//       newArrived,
//       bestsellers,
//       _sort,
//       _order,
//       _start,
//       _limit,
//       count,
//     } = req.query;

//     const where = {};

//     if (price_gte && isNaN(parseFloat(price_gte)))
//       return res.status(400).json({ error: "Invalid minPrice" });
//     if (price_lte && isNaN(parseFloat(price_lte)))
//       return res.status(400).json({ error: "Invalid maxPrice" });
//     if (
//       price_gte &&
//       price_lte &&
//       parseFloat(price_lte) < parseFloat(price_gte)
//     ) {
//       return res
//         .status(400)
//         .json({ error: "maxPrice cannot be less than minPrice" });
//     }

//     if (category_name) {
//       const categories = parseArrayQuery(category_name);
//       const categoryRecords = await prisma.category.findMany({
//         where: { name: { in: categories } },
//       });
//       if (categoryRecords.length > 0)
//         where.categoryId = { in: categoryRecords.map((c) => c.id) };
//       else return res.json(count === "true" ? { products: [], total: 0 } : []);
//     }

//     if (sub_category) {
//       const subCategories = parseArrayQuery(sub_category);
//       const subCategoryRecords = await prisma.subCategory.findMany({
//         where: { name: { in: subCategories } },
//       });
//       if (subCategoryRecords.length > 0)
//         where.subCategoryId = { in: subCategoryRecords.map((s) => s.id) };
//       else return res.json(count === "true" ? { products: [], total: 0 } : []);
//     }

//     if (price_gte) where.price = { ...where.price, gte: parseFloat(price_gte) };
//     if (price_lte) where.price = { ...where.price, lte: parseFloat(price_lte) };
//     if (title_like) where.title = { contains: title_like.toLowerCase() };

//     if (color) {
//       const colors = parseArrayQuery(color);
//       const colorRecords = await prisma.color.findMany({
//         where: { color: { in: colors } },
//       });
//       if (colorRecords.length > 0)
//         where.colorId = { in: colorRecords.map((c) => c.id) };
//       else return res.json(count === "true" ? { products: [], total: 0 } : []);
//     }

//     if (brand) {
//       const brands = parseArrayQuery(brand);
//       const brandRecords = await prisma.brand.findMany({
//         where: { brand: { in: brands } },
//       });
//       if (brandRecords.length > 0)
//         where.brandId = { in: brandRecords.map((b) => b.id) };
//       else return res.json(count === "true" ? { products: [], total: 0 } : []);
//     }

//     if (newArrived === "true") where.newArrived = true;
//     if (bestsellers === "true") where.bestsellers = true;

//     const orderBy = _sort ? { [_sort]: _order || "asc" } : undefined;
//     // const skip = _start ? parseInt(_start) : undefined;
//     // const take = _limit ? parseInt(_limit) : undefined;
//     const skip = Number.isFinite(Number(_start)) ? Number(_start) : 0;
//     const take = Number.isFinite(Number(_limit)) ? Number(_limit) : 12;

//     console.log("_limit:", _limit, "take:", take);
//     if (count === "true") {
//       const [products, total] = await Promise.all([
//         prisma.product.findMany({
//           where,
//           orderBy,
//           skip,
//           take,
//           select: {
//             id: true,
//             title: true,
//             price: true,
//             description: true,
//             product_code: true,
//             image: true, // Scalar field
//             newArrived: true,
//             recommended: true,
//             bestsellers: true,
//             stockAvailabilty: true,
//             stockCount: true,
//             saleAvailabilty: true,
//             saleCount: true,
//             category: true,
//             subCategory: true,
//             brand: true,
//             color: true,
//             smallImages: true, // Relation
//             sizes: { include: { size: true } },
//           },
//         }),
//         prisma.product.count({ where }),
//       ]);

//       products.forEach((product) => {
//         product.title = product.title.toLowerCase();
//         product.category.name = product.category.name.toLowerCase();
//         product.subCategory.name = product.subCategory.name.toLowerCase();
//         product.brand.brand = product.brand.brand.toLowerCase();
//         product.color.color = product.color.color.toLowerCase();
//         product.sizes.forEach((size) => {
//           size.size.name = size.size.name.toLowerCase();
//         });
//       });

//       return res.json({ products, total });
//     }

//     // Add or verify this endpoint in index.js, below the /products endpoint
//     app.get("/products/:id", async (req, res, next) => {
//       try {
//         const { id } = req.params;

//         // Validate ID
//         if (isNaN(parseInt(id))) {
//           return res.status(400).json({ error: "Invalid product ID" });
//         }

//         const product = await prisma.product.findUnique({
//           where: { id: parseInt(id) },
//           select: {
//             id: true,
//             title: true,
//             price: true,
//             description: true,
//             product_code: true,
//             image: true,
//             newArrived: true,
//             recommended: true,
//             bestsellers: true,
//             stockAvailabilty: true,
//             stockCount: true,
//             saleAvailabilty: true,
//             saleCount: true,
//             category: true,
//             subCategory: true,
//             brand: true,
//             color: true,
//             smallImages: true,
//             sizes: { include: { size: true } },
//           },
//         });

//         if (!product) {
//           return res.status(404).json({ error: "Product not found" });
//         }

//         // Normalize data to match /products endpoint
//         product.title = product.title.toLowerCase();
//         product.category.name = product.category.name.toLowerCase();
//         product.subCategory.name = product.subCategory.name.toLowerCase();
//         product.brand.brand = product.brand.brand.toLowerCase();
//         product.color.color = product.color.color.toLowerCase();
//         product.sizes.forEach((size) => {
//           size.size.name = size.size.name.toLowerCase();
//         });

//         res.json(product);
//       } catch (error) {
//         console.error("Error fetching product:", error);
//         next(error); // Pass to centralized error handler
//       }
//     });

//     const products = await prisma.product.findMany({
//       where,
//       orderBy,
//       skip,
//       take,
//       select: {
//         id: true,
//         title: true,
//         price: true,
//         description: true,
//         product_code: true,
//         image: true, // Scalar field
//         newArrived: true,
//         recommended: true,
//         bestsellers: true,
//         stockAvailabilty: true,
//         stockCount: true,
//         saleAvailabilty: true,
//         saleCount: true,
//         category: true,
//         subCategory: true,
//         brand: true,
//         color: true,
//         smallImages: true, // Relation
//         sizes: { include: { size: true } },
//       },
//     });

//     products.forEach((product) => {
//       product.title = product.title.toLowerCase();
//       product.category.name = product.category.name.toLowerCase();
//       product.subCategory.name = product.subCategory.name.toLowerCase();
//       product.brand.brand = product.brand.brand.toLowerCase();
//       product.color.color = product.color.color.toLowerCase();
//       product.sizes.forEach((size) => {
//         size.size.name = size.size.name.toLowerCase();
//       });
//     });

//     res.json(products);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     next(error); // Pass to centralized error handler
//   }
// });

// app.get("/top-categories", async (req, res, next) => {
//   try {
//     const topCategories = await prisma.topCategory.findMany();
//     res.json(topCategories);
//   } catch (error) {
//     console.error("Error fetching top categories:", error);
//     next(error);
//   }
// });

// app.get("/categories", async (req, res, next) => {
//   try {
//     const categories = await prisma.category.findMany({
//       include: { subCategories: true },
//     });
//     res.json(
//       categories.map((c) => ({
//         ...c,
//         name: c.name.toLowerCase(),
//         subCategories: c.subCategories.map((s) => ({
//           ...s,
//           name: s.name.toLowerCase(),
//         })),
//       }))
//     );
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     next(error);
//   }
// });

// app.get("/colors", async (req, res, next) => {
//   try {
//     const colors = await prisma.color.findMany();
//     res.json(colors.map((c) => ({ ...c, color: c.color.toLowerCase() })));
//   } catch (error) {
//     console.error("Error fetching colors:", error);
//     next(error);
//   }
// });

// app.get("/brands", async (req, res, next) => {
//   try {
//     const brands = await prisma.brand.findMany();
//     res.json(brands.map((b) => ({ ...b, brand: b.brand.toLowerCase() })));
//   } catch (error) {
//     console.error("Error fetching brands:", error);
//     next(error);
//   }
// });

// app.get("/news", async (req, res, next) => {
//   try {
//     const news = await prisma.news.findMany();
//     res.json(news);
//   } catch (error) {
//     console.error("Error fetching news:", error);
//     next(error);
//   }
// });
// // Add or verify this endpoint in index.js, below the /products endpoint
// app.get("/products/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     // Validate ID
//     if (isNaN(parseInt(id))) {
//       return res.status(400).json({ error: "Invalid product ID" });
//     }

//     const product = await prisma.product.findUnique({
//       where: { id: parseInt(id) },
//       select: {
//         id: true,
//         title: true,
//         price: true,
//         description: true,
//         product_code: true,
//         image: true,
//         newArrived: true,
//         recommended: true,
//         bestsellers: true,
//         stockAvailabilty: true,
//         stockCount: true,
//         saleAvailabilty: true,
//         saleCount: true,
//         category: true,
//         subCategory: true,
//         brand: true,
//         color: true,
//         smallImages: true,
//         sizes: { include: { size: true } },
//       },
//     });

//     if (!product) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     // Normalize data to match /products endpoint
//     product.title = product.title.toLowerCase();
//     product.category.name = product.category.name.toLowerCase();
//     product.subCategory.name = product.subCategory.name.toLowerCase();
//     product.brand.brand = product.brand.brand.toLowerCase();
//     product.color.color = product.color.color.toLowerCase();
//     product.sizes.forEach((size) => {
//       size.size.name = size.size.name.toLowerCase();
//     });

//     res.json(product);
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     next(error); // Pass to centralized error handler
//   }
// });

// app.listen(port, () =>
//   console.log(`Server running on http://localhost:${port}`)
// );

// // Centralized error handling middleware
// app.use((err, req, res, next) => {
//   console.error("Server Error:", err);
//   res
//     .status(500)
//     .json({ error: "Internal server error", details: err.message });
// });

// process.on("SIGTERM", async () => {
//   await prisma.$disconnect();
//   process.exit(0);
// });

import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();
const port = 8001;

app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from Vite frontend
  })
);

app.use(express.json());

// ✅ Helper to parse array-like query params
const parseArrayQuery = (query) => {
  if (Array.isArray(query)) return query.map((v) => v.toLowerCase());
  if (typeof query === "string") return [query.toLowerCase()];
  return [];
};

// ✅ /products (list + filtering)
app.get("/products", async (req, res, next) => {
  try {
    const {
      category_name,
      sub_category,
      price_gte,
      price_lte,
      title_like,
      color,
      brand,
      newArrived,
      bestsellers,
      _sort,
      _order,
      _start,
      _limit,
      count,
    } = req.query;

    const where = {};

    // ---- Validation ----
    if (price_gte && isNaN(parseFloat(price_gte)))
      return res.status(400).json({ error: "Invalid minPrice" });
    if (price_lte && isNaN(parseFloat(price_lte)))
      return res.status(400).json({ error: "Invalid maxPrice" });
    if (price_gte && price_lte && parseFloat(price_lte) < parseFloat(price_gte))
      return res
        .status(400)
        .json({ error: "maxPrice cannot be less than minPrice" });

    // ---- Filtering ----
    if (category_name) {
      const categories = parseArrayQuery(category_name);
      const categoryRecords = await prisma.category.findMany({
        where: { name: { in: categories } },
      });
      if (categoryRecords.length)
        where.categoryId = { in: categoryRecords.map((c) => c.id) };
      else return res.json(count === "true" ? { products: [], total: 0 } : []);
    }

    if (sub_category) {
      const subCategories = parseArrayQuery(sub_category);
      const subCategoryRecords = await prisma.subCategory.findMany({
        where: { name: { in: subCategories } },
      });
      if (subCategoryRecords.length)
        where.subCategoryId = { in: subCategoryRecords.map((s) => s.id) };
      else return res.json(count === "true" ? { products: [], total: 0 } : []);
    }

    if (price_gte) where.price = { ...where.price, gte: parseFloat(price_gte) };
    if (price_lte) where.price = { ...where.price, lte: parseFloat(price_lte) };
    if (title_like) where.title = { contains: title_like.toLowerCase() };

    if (color) {
      const colors = parseArrayQuery(color);
      const colorRecords = await prisma.color.findMany({
        where: { color: { in: colors } },
      });
      if (colorRecords.length)
        where.colorId = { in: colorRecords.map((c) => c.id) };
      else return res.json(count === "true" ? { products: [], total: 0 } : []);
    }

    if (brand) {
      const brands = parseArrayQuery(brand);
      const brandRecords = await prisma.brand.findMany({
        where: { brand: { in: brands } },
      });
      if (brandRecords.length)
        where.brandId = { in: brandRecords.map((b) => b.id) };
      else return res.json(count === "true" ? { products: [], total: 0 } : []);
    }

    if (newArrived === "true") where.newArrived = true;
    if (bestsellers === "true") where.bestsellers = true;

    // ---- Pagination ----
    const orderBy = _sort ? { [_sort]: _order || "asc" } : undefined;
    const skip = Number.isFinite(Number(_start)) ? Number(_start) : 0;
    const take = Number.isFinite(Number(_limit)) ? Number(_limit) : 12;

    console.log("Pagination => _start:", skip, " _limit:", take);

    // ---- Query Execution ----
    if (count === "true") {
      const [products, total] = await Promise.all([
        prisma.product.findMany({
          where,
          orderBy,
          skip,
          take,
          select: {
            id: true,
            title: true,
            price: true,
            description: true,
            product_code: true,
            image: true,
            newArrived: true,
            recommended: true,
            bestsellers: true,
            stockAvailabilty: true,
            stockCount: true,
            saleAvailabilty: true,
            saleCount: true,
            category: true,
            subCategory: true,
            brand: true,
            color: true,
            smallImages: true,
            sizes: { include: { size: true } },
          },
        }),
        prisma.product.count({ where }),
      ]);

      normalizeProducts(products);
      return res.json({ products, total });
    }

    const products = await prisma.product.findMany({
      where,
      orderBy,
      skip,
      take,
      select: {
        id: true,
        title: true,
        price: true,
        description: true,
        product_code: true,
        image: true,
        newArrived: true,
        recommended: true,
        bestsellers: true,
        stockAvailabilty: true,
        stockCount: true,
        saleAvailabilty: true,
        saleCount: true,
        category: true,
        subCategory: true,
        brand: true,
        color: true,
        smallImages: true,
        sizes: { include: { size: true } },
      },
    });

    normalizeProducts(products);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    next(error);
  }
});

// ✅ Single product (moved OUTSIDE /products)
app.get("/products/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (isNaN(parseInt(id))) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        title: true,
        price: true,
        description: true,
        product_code: true,
        image: true,
        newArrived: true,
        recommended: true,
        bestsellers: true,
        stockAvailabilty: true,
        stockCount: true,
        saleAvailabilty: true,
        saleCount: true,
        category: true,
        subCategory: true,
        brand: true,
        color: true,
        smallImages: true,
        sizes: { include: { size: true } },
      },
    });

    if (!product) return res.status(404).json({ error: "Product not found" });

    normalizeProducts([product]);
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    next(error);
  }
});

// ✅ Helper to lowercase fields
function normalizeProducts(products) {
  products.forEach((product) => {
    product.title = product.title.toLowerCase();
    product.category.name = product.category.name.toLowerCase();
    product.subCategory.name = product.subCategory.name.toLowerCase();
    product.brand.brand = product.brand.brand.toLowerCase();
    product.color.color = product.color.color.toLowerCase();
    product.sizes.forEach((size) => {
      size.size.name = size.size.name.toLowerCase();
    });
  });
}

// ✅ Other routes (unchanged)
app.get("/top-categories", async (req, res, next) => {
  try {
    const topCategories = await prisma.topCategory.findMany();
    res.json(topCategories);
  } catch (error) {
    next(error);
  }
});

app.get("/categories", async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany({
      include: { subCategories: true },
    });
    res.json(
      categories.map((c) => ({
        ...c,
        name: c.name.toLowerCase(),
        subCategories: c.subCategories.map((s) => ({
          ...s,
          name: s.name.toLowerCase(),
        })),
      }))
    );
  } catch (error) {
    next(error);
  }
});

app.get("/colors", async (req, res, next) => {
  try {
    const colors = await prisma.color.findMany();
    res.json(colors.map((c) => ({ ...c, color: c.color.toLowerCase() })));
  } catch (error) {
    next(error);
  }
});

app.get("/brands", async (req, res, next) => {
  try {
    const brands = await prisma.brand.findMany();
    res.json(brands.map((b) => ({ ...b, brand: b.brand.toLowerCase() })));
  } catch (error) {
    next(error);
  }
});

app.get("/news", async (req, res, next) => {
  try {
    const news = await prisma.news.findMany();
    res.json(news);
  } catch (error) {
    next(error);
  }
});

app.listen(port, () =>
  console.log(`✅ Server running on http://localhost:${port}`)
);

// ✅ Centralized error handler (keep it LAST)
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res
    .status(500)
    .json({ error: "Internal server error", details: err.message });
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
