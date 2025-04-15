// src/app/api/add-product/route.js
import { NextResponse } from "next/server";
import connectMongoDB from "../../lib/config";
import Product from "../../lib/models/AnimalProduct";
import { writeFile } from "fs/promises";
import path from "path";

// تغيير الـ runtime لـ Node.js
export const runtime = "nodejs";

export async function POST(request) {
  try {
    // الاتصال بـ MongoDB
    await connectMongoDB();

    // الحصول على الـ FormData من الطلب
    const formData = await request.formData();

    // استخراج البيانات من الـ FormData
    const name = formData.get("name");
    const description = formData.get("description");
    const price = parseFloat(formData.get("price"));
    const category = formData.get("category");
    const stock = parseInt(formData.get("stock"));
    const image = formData.get("image");

    // التحقق من الحقول المطلوبة
    if (!name || !description || !price || !category || !stock || !image) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // التحقق من نوع الصورة
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(image.name).toLowerCase());
    const mimetype = fileTypes.test(image.type);

    if (!extname || !mimetype) {
      return NextResponse.json({ error: "Only images (jpeg, jpg, png, gif) are allowed" }, { status: 400 });
    }

    // التحقق من حجم الصورة (5 ميجا كحد أقصى)
    if (image.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Image size must be less than 5MB" }, { status: 400 });
    }

    // إنشاء اسم فريد للصورة
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(image.name);
    const fileName = `${uniqueSuffix}${fileExtension}`;
    const filePath = path.join(process.cwd(), "public/uploads", fileName);

    // حفظ الصورة في مجلد public/uploads
    const buffer = Buffer.from(await image.arrayBuffer());
    await writeFile(filePath, buffer);

    // إنشاء المنتج الجديد
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      image: `/uploads/${fileName}`,
      stock,
    });

    // حفظ المنتج في MongoDB
    await newProduct.save();

    return NextResponse.json({ message: "Product added successfully", product: newProduct }, { status: 201 });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json({ error: "Error adding product" }, { status: 500 });
  }
}