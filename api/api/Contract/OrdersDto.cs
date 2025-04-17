namespace api.Contract;

// Add this to your DTOs namespace
public class OrderItemRequest
{
    public int ProductId { get; set; }
    public int Quantity { get; set; }
}

// Update OrderRequest to use the DTO
public class OrderRequest
{
    public string Email { get; set; }
    public string Name { get; set; }
    public List<OrderItemRequest> Items { get; set; }
    public string ShippingAddress { get; set; }
}