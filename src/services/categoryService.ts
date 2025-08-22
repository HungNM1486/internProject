import { apiClient } from "./api";
import { Category } from "@/types";

export const categoryService = {
  async getAll(): Promise<Category[]> {
    const res = await apiClient.get("/categories");
    return res.data;
  },
};
