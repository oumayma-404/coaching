using api.Models;

namespace api.Services;

// Services/IOrderService.cs
public interface IOrderService
{
    Task<Order> CreateOrderAsync(string email, string name, List<OrderItem> items, string shippingAddress);
    Task<Order> GetOrderByIdAsync(int id);
    Task<IEnumerable<Order>> GetOrdersByEmailAsync(string email);
    Task UpdateOrderStatusAsync(int orderId, OrderStatus status);
}
