using api.Models;

namespace api.Contract;

public class OrderDto
{
    public int Id { get; set; }
    public string CustomerEmail { get; set; }
    public string CustomerName { get; set; }
    public List<OrderItemDto> OrderItems { get; set; } = new();
    public decimal Total { get; set; }
    public OrderStatus Status { get; set; }
    public DateTime OrderDate { get; set; }
    public string ShippingAddress { get; set; }
}

public class OrderItemDto
{
    public int ProductId { get; set; }
    public string ProductName { get; set; } // Add other product fields you need
    public int Quantity { get; set; }
    public decimal Price { get; set; }
}