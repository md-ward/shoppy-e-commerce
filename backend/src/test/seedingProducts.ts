import { PrismaClient } from "../../prisma/generated";

// prisma/seed.ts
const prisma = new PrismaClient();

async function main() {
  await prisma.category.createMany({
    data: [
      { name: "Electronics" }, // id: 1
      { name: "Office Furniture" }, // id: 2
      { name: "Stationery" }, // id: 3
    ],
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse with USB receiver",
        barcode: "WM123456",
        price: 19.99,
        stock: 100,
        images: ["mouse1.jpg", "mouse2.jpg"],
        categoryId: 1,
      },
      {
        name: "Mechanical Keyboard",
        description: "RGB mechanical keyboard with blue switches",
        barcode: "MK987654",
        price: 59.99,
        stock: 75,
        images: ["keyboard1.jpg"],
        categoryId: 1,
      },
      {
        name: "Gaming Headset",
        description: "Surround sound gaming headset with mic",
        barcode: "GH654321",
        price: 39.99,
        stock: 60,
        images: ["headset1.jpg"],
        categoryId: 1,
      },
      {
        name: "USB-C Charger",
        description: "Fast charging 65W USB-C adapter",
        barcode: "UC452613",
        price: 24.99,
        stock: 120,
        images: ["charger1.jpg"],
        categoryId: 1,
      },
      {
        name: 'LED Monitor 24"',
        description: "Full HD LED monitor 1080p",
        barcode: "LM987321",
        price: 109.99,
        stock: 45,
        images: ["monitor1.jpg"],
        categoryId: 1,
      },
      {
        name: "Office Chair",
        description: "Ergonomic office chair with lumbar support",
        barcode: "OC786345",
        price: 129.99,
        stock: 30,
        images: ["chair1.jpg", "chair2.jpg"],
        categoryId: 2,
      },
      {
        name: "Standing Desk",
        description: "Adjustable height standing desk",
        barcode: "SD456789",
        price: 249.99,
        stock: 20,
        images: ["desk1.jpg"],
        categoryId: 2,
      },
      {
        name: "Desk Lamp",
        description: "LED desk lamp with brightness control",
        barcode: "DL123987",
        price: 14.99,
        stock: 80,
        images: ["lamp1.jpg"],
        categoryId: 2,
      },
      {
        name: "Notebook A5",
        description: "Hardcover A5 notebook 200 pages",
        barcode: "NB451236",
        price: 5.99,
        stock: 200,
        images: ["notebook1.jpg"],
        categoryId: 3,
      },
      {
        name: "Ballpoint Pens (Pack of 10)",
        description: "Smooth writing ballpoint pens",
        barcode: "BP963852",
        price: 3.49,
        stock: 150,
        images: ["pens1.jpg"],
        categoryId: 3,
      },
      {
        name: "Highlighters (Set of 6)",
        description: "Colorful highlighters for office/school",
        barcode: "HL753951",
        price: 4.99,
        stock: 90,
        images: ["highlighters1.jpg"],
        categoryId: 3,
      },
      {
        name: "Sticky Notes",
        description: "Pack of sticky notes - 400 sheets",
        barcode: "SN852456",
        price: 2.99,
        stock: 170,
        images: ["stickynotes1.jpg"],
        categoryId: 3,
      },
      {
        name: "Paper Clips (Box)",
        description: "Box of 100 paper clips",
        barcode: "PC123789",
        price: 1.49,
        stock: 250,
        images: ["paperclips1.jpg"],
        categoryId: 3,
      },
      {
        name: "Smartphone Holder",
        description: "Adjustable holder for smartphones",
        barcode: "SH951753",
        price: 8.99,
        stock: 70,
        images: ["holder1.jpg"],
        categoryId: 1,
      },
      {
        name: "Bluetooth Speaker",
        description: "Portable Bluetooth speaker with deep bass",
        barcode: "BS159357",
        price: 29.99,
        stock: 50,
        images: ["speaker1.jpg"],
        categoryId: 1,
      },
      {
        name: "Laptop Stand",
        description: "Aluminum laptop stand for desk use",
        barcode: "LS357951",
        price: 34.99,
        stock: 40,
        images: ["laptopstand1.jpg"],
        categoryId: 1,
      },
      {
        name: "Printer Ink Cartridge",
        description: "Black ink cartridge for inkjet printers",
        barcode: "IC789654",
        price: 19.49,
        stock: 65,
        images: ["ink1.jpg"],
        categoryId: 2,
      },
      {
        name: "Desk Organizer",
        description: "Multi-compartment desk organizer",
        barcode: "DO654123",
        price: 12.99,
        stock: 85,
        images: ["organizer1.jpg"],
        categoryId: 2,
      },
      {
        name: "Calendar 2025",
        description: "Wall calendar for the year 2025",
        barcode: "CL741852",
        price: 6.99,
        stock: 110,
        images: ["calendar1.jpg"],
        categoryId: 3,
      },
      {
        name: "Whiteboard Markers",
        description: "Set of 4 dry erase markers",
        barcode: "WM456123",
        price: 3.99,
        stock: 100,
        images: ["markers1.jpg"],
        categoryId: 3,
      },
    ],
  });

  console.log("✅ Seeded 20 products.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
