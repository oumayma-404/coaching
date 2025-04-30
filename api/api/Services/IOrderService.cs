using api.Contract;
using api.Models;

namespace api.Services;

// Services/IOrderService.cs
public interface IOrderService
{
    Task<Order> CreateOrderAsync(string email, string name, List<OrderItem> items, string shippingAddress,
        string paymentIntentId);

    Task<Order> GetOrderByIdAsync(int id);
    Task<IEnumerable<OrderDto>> GetOrdersByEmailAsync(string email);
    Task UpdateOrderStatusAsync(int orderId, OrderStatus status);

    Task CancelOrderAsync(int orderId);
}