import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/db.json"), "utf-8")
);

async function main() {
  console.log("🌱 Starting seeding...");

  // Validate JSON
  for (const p of data.products) {
    if (
      !p.title ||
      !p.price ||
      !p.category_name ||
      !p.sub_category ||
      !p.brand ||
      !p.color
    ) {
      throw new Error(`Product missing required fields: ${JSON.stringify(p)}`);
    }
  }

  // 1. Colors
  const colorsMap = {};
  for (const c of data.colors) {
    const colorName = c.color.toLowerCase();
    let color = await prisma.color.findFirst({
      where: { color: colorName },
    });
    if (!color) {
      color = await prisma.color.create({ data: { color: colorName } });
    }
    colorsMap[colorName] = color.id;
  }

  // 2. Brands
  const brandsMap = {};
  for (const b of data.brands) {
    const brandName = b.brand.toLowerCase();
    let brand = await prisma.brand.findFirst({
      where: { brand: brandName },
    });
    if (!brand) {
      brand = await prisma.brand.create({ data: { brand: brandName } });
    }
    brandsMap[brandName] = brand.id;
  }

  // 3. Categories & SubCategories
  const categoriesMap = {};
  const subCategoriesMap = {};
  for (const cat of data.categories) {
    const categoryName = cat.name.toLowerCase();
    let category = await prisma.category.findFirst({
      where: { name: categoryName },
    });
    if (!category) {
      category = await prisma.category.create({ data: { name: categoryName } });
    }
    categoriesMap[categoryName] = category.id;
    if (cat.sub_categories) {
      for (const sub of cat.sub_categories) {
        const subCategoryName = sub.name.toLowerCase();
        let subCategory = await prisma.subCategory.findFirst({
          where: { name: subCategoryName, categoryId: category.id },
        });
        if (!subCategory) {
          subCategory = await prisma.subCategory.create({
            data: { name: subCategoryName, categoryId: category.id },
          });
        }
        subCategoriesMap[`${category.id}:${subCategoryName}`] = subCategory.id;
      }
    }
  }

  // 4. Top Categories
  for (const t of data["top-categories"]) {
    const topCategoryName = t.name.toLowerCase();
    let topCategory = await prisma.topCategory.findFirst({
      where: { name: topCategoryName },
    });
    if (!topCategory) {
      topCategory = await prisma.topCategory.create({
        data: { name: topCategoryName, image: t.image },
      });
    }
  }

  // 5. Swipers & Buttons
  const swipersMap = {};
  for (const s of data.swiper) {
    const swiperTitle = s.title;
    let swiper = await prisma.swiper.findFirst({
      where: { title: swiperTitle },
    });
    if (!swiper) {
      swiper = await prisma.swiper.create({
        data: {
          title: s.title,
          description: s.description,
          image: s.image,
        },
      });
    }
    swipersMap[swiperTitle] = swiper.id;
    if (s.buttons) {
      for (const btnText of s.buttons) {
        let button = await prisma.swiperButton.findFirst({
          where: { text: btnText, swiperId: swiper.id },
        });
        if (!button) {
          await prisma.swiperButton.create({
            data: { text: btnText, swiperId: swiper.id },
          });
        }
      }
    }
  }

  // 6. News
  for (const n of data.news) {
    const newsTitle = n.title;
    let news = await prisma.news.findFirst({
      where: { title: newsTitle },
    });
    if (!news) {
      news = await prisma.news.create({
        data: { title: n.title, image: n.image, alt: n.alt || "" },
      });
    }
  }

  // 7. Products
  for (const p of data.products) {
    const categoryId = categoriesMap[p.category_name?.toLowerCase()];
    const subCategoryId =
      subCategoriesMap[
        `${
          categoriesMap[p.category_name?.toLowerCase()]
        }:${p.sub_category?.toLowerCase()}`
      ];
    const brandId = brandsMap[p.brand?.toLowerCase()];
    const colorId = colorsMap[p.color?.toLowerCase()];

    if (!categoryId || !subCategoryId || !brandId || !colorId) {
      console.log(`Product: ${p.title}`);
      console.log(`Category: ${p.category_name}, ID: ${categoryId}`);
      console.log(`SubCategory: ${p.sub_category}, ID: ${subCategoryId}`);
      console.log(`Brand: ${p.brand}, ID: ${brandId}`);
      console.log(`Color: ${p.color}, ID: ${colorId}`);
      throw new Error(
        `Missing relation for product "${p.title}". Check category/brand/color names in db.json`
      );
    }

    let product = await prisma.product.findFirst({
      where: { title: p.title, categoryId, subCategoryId, brandId, colorId },
    });

    if (!product) {
      const stockAvailabilty =
        p.inStock?.stockAvailabilty ?? p.stockAvailabilty ?? true;
      const stockCount = p.inStock?.stockCount ?? p.stockCount ?? 0;
      const saleAvailabilty =
        p.onSale?.saleAvailabilty ?? p.saleAvailabilty ?? false;
      const saleCount = p.onSale?.saleCount ?? p.saleCount ?? null;

      product = await prisma.product.create({
        data: {
          title: p.title,
          price: p.price,
          description: p.description,
          product_code: p.product_code,
          image: p.image,
          newArrived: p.newArrived ?? false,
          recommended: p.recommended ?? false,
          bestsellers: p.bestsellers ?? false,
          stockAvailabilty,
          stockCount,
          saleAvailabilty,
          saleCount,
          categoryId,
          subCategoryId,
          brandId,
          colorId,
        },
      });
    }

    if (p.smallImages) {
      for (const img of p.smallImages) {
        let productImage = await prisma.productImage.findFirst({
          where: { image: img.image, productId: product.id },
        });
        if (!productImage) {
          await prisma.productImage.create({
            data: { image: img.image, productId: product.id },
          });
        }
      }
    }

    if (p.sizes) {
      for (const sizeName of p.sizes) {
        const sizeNameNormalized = sizeName.name.toLowerCase();
        let size = await prisma.size.findFirst({
          where: { name: sizeNameNormalized },
        });
        if (!size) {
          size = await prisma.size.create({
            data: { name: sizeNameNormalized },
          });
        }
        let productSize = await prisma.productSize.findFirst({
          where: { productId: product.id, sizeId: size.id },
        });
        if (!productSize) {
          await prisma.productSize.create({
            data: { productId: product.id, sizeId: size.id },
          });
        }
      }
    }
  }

  console.log("✅ Seeding finished.");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
