"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SORT_FIELDS, SearchQuerySchema, defaultQuery } from "@/lib/products";
import type { SearchQuery } from "@/lib/products";

type ProductSearchFormProps = {
  onSearch: (query: SearchQuery) => Promise<void>;
};

export default function ProductSearchForm(
  { onSearch }: ProductSearchFormProps
) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchQuery>({
    resolver: zodResolver(SearchQuerySchema),
    mode: "onTouched",
    defaultValues: defaultQuery,
  });

  return (
    <form
      onSubmit={handleSubmit(onSearch)}
      noValidate
      className="flex flex-wrap items-end gap-4 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="q" className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          คำค้น
        </label>
        <input
          id="q"
          {...register("q")}
          placeholder="phone"
          className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm dark:border-zinc-700 dark:bg-pink-200"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="limit" className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          จำนวนรายการ
        </label>
        <input
          id="limit"
          type="number"
          required
          {...register("limit", { valueAsNumber: true })}
          aria-invalid={!!errors.limit}
          aria-describedby="limit-error"
          className="w-24 rounded-md border border-zinc-300 px-3 py-1.5 text-sm dark:border-zinc-700 dark:bg-pink-200"
        />
        <span id="limit-error" role="alert" className="text-xs text-red-600 dark:text-red-400">
          {errors.limit?.message}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="sortBy" className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          เรียงตาม
        </label>
        <select
          id="sortBy"
          {...register("sortBy")}
          className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm dark:border-zinc-700 dark:bg-pink-200"
        >
          {SORT_FIELDS.map((field) => (
            <option key={field} value={field}>{field}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-md bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900"
      >
        {isSubmitting ? "กำลังค้นหา" : "ค้นหา"}
      </button>
    </form>
  );
}