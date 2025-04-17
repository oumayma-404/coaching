namespace api.Models;
// Models/Order.cs
public class Order
{
    public int Id { get; set; }
    public string CustomerEmail { get; set; } // Just store email instead of user ID
    public string CustomerName { get; set; }
    public List<OrderItem> OrderItems { get; set; } = new();
    public decimal Total { get; set; }
    public OrderStatus Status { get; set; } = OrderStatus.Pending;
    public DateTime OrderDate { get; set; } = DateTime.UtcNow;
    public string PaymentIntentId { get; set; } // For Stripe
    public string ShippingAddress { get; set; }
}

public enum OrderStatus
{
    Pending,
    Processing,
    Completed,
    Cancelled
}

