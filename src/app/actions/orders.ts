import { supabase } from '@/lib/supabase'

export async function createOrder(orderData: {
  address_id: string | null;
  payment_method: string;
  subtotal: number;
  gst_amount: number;
  delivery_charge: number;
  discount: number;
  tip: number;
  total_amount: number;
  notes?: string;
  items: {
    food_id: string;
    food_name: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    special_instructions?: string;
  }[];
}) {
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    throw new Error('Authentication required to place an order')
  }

  // 1. Create the order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: user.id,
      address_id: orderData.address_id,
      status: 'pending',
      payment_status: 'pending',
      payment_method: orderData.payment_method,
      subtotal: orderData.subtotal,
      gst_amount: orderData.gst_amount,
      delivery_charge: orderData.delivery_charge,
      discount: orderData.discount,
      tip: orderData.tip,
      total_amount: orderData.total_amount,
      notes: orderData.notes,
    } as any)
    .select()
    .single()

  if (orderError) {
    console.error('Order creation error:', orderError)
    throw new Error('Failed to create order')
  }

  // 2. Create order items
  const orderItems = orderData.items.map(item => ({
    order_id: (order as any).id,
    ...item
  }))

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems as any)

  if (itemsError) {
    console.error('Order items creation error:', itemsError)
    throw new Error('Failed to create order items')
  }

  return order
}
