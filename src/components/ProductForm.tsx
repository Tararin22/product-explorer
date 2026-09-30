"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CATEGORIES, ProductDraftSchema } from "@/lib/products";
import type { Product, ProductDraft } from "@/lib/products";

type ProductFormProps = {
  editing: Product | null;
  onSave: (draft: ProductDraft) => void;
  onCancel: () => void;
};

export default function ProductForm(
  { editing, onSave, onCancel }: ProductFormProps
) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<ProductDraft>({
    resolver: zodResolver(ProductDraftSchema),
    mode: "onTouched",
    defaultValues: editing
      ? { title: editing.title, price: editing.price,
          stock: editing.stock, category: editing.category }
      : { title: "", price: undefined, stock: undefined },
  });

  function saveProduct(values: ProductDraft) {
    onSave(values);
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(saveProduct)}
      noValidate
      className="flex flex-wrap items-end gap-4 rounded-lg border border-dashed border-zinc-300 p-4 dark:border-zinc-700"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          ชื่อสินค้า
        </label>
        <input
          id="title"
          required
          {...register("title")}
          aria-invalid={!!errors.title}
          aria-describedby="title-error"
          className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm dark:border-zinc-700 dark:bg-pink-200"
        />
        <span id="title-error" role="alert" className="text-xs text-red-600 dark:text-red-400">
          {errors.title?.message}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="price" className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          ราคา
        </label>
        <input
          id="price"
          type="number"
          step="0.01"
          required
          {...register("price", { valueAsNumber: true })}
          aria-invalid={!!errors.price}
          aria-describedby="price-error"
          className="w-28 rounded-md border border-zinc-300 px-3 py-1.5 text-sm dark:border-zinc-700 dark:bg-pink-200"
        />
        <span id="price-error" role="alert" className="text-xs text-red-600 dark:text-red-400">
          {errors.price?.message}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="stock" className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          คงเหลือ
        </label>
        <input
          id="stock"
          type="number"
          required
          {...register("stock", { valueAsNumber: true })}
          aria-invalid={!!errors.stock}
          aria-describedby="stock-error"
          className="w-24 rounded-md border border-zinc-300 px-3 py-1.5 text-sm dark:border-zinc-700 dark:bg-pink-200"
        />
        <span id="stock-error" role="alert" className="text-xs text-red-600 dark:text-red-400">
          {errors.stock?.message}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="category" className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          หมวดหมู่
        </label>
        <select
          id="category"
          required
          {...register("category")}
          aria-invalid={!!errors.category}
          aria-describedby="category-error"
          className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm dark:border-zinc-700 dark:bg-pink-200"
        >
          <option value="">กรุณาเลือกหมวดหมู่</option>
          {CATEGORIES.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
        <span id="category-error" role="alert" className="text-xs text-red-600 dark:text-red-400">
          {errors.category?.message}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={!isDirty || !isValid}
          className="rounded-md bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-50"
        >
          {editing ? "บันทึกการแก้ไข" : "เพิ่มสินค้า"}
        </button>

        {editing && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-zinc-300 px-4 py-1.5 text-sm hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            ยกเลิก
          </button>
        )}
      </div>
    </form>
  );
}