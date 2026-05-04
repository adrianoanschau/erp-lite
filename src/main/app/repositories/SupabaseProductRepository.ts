import { supabase } from '@/main/app/services/supabase'
import { IBaseRepository } from '@/core/domain/IBaseRepository'

export interface Product {
  id?: string | number;
  [key: string]: unknown;
}

export class SupabaseProductRepository implements IBaseRepository<Product> {

  async getAll() {
    const { data, error } = await supabase.from('products').select('*')
    if (error) throw new Error(error.message)
    return data as Product[]
  }

  async create(product: Product) {
    const { data, error } = await supabase.from('products').insert(product).select()
    if (error) throw new Error(error.message)
    return data[0] as Product
  }
}
