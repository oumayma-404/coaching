using api.Contract;
using api.Models;

namespace api.Services;

public interface IOrderService
{
    Task<Order> CreateOrderAsync(
        string email,
        string firstName,
        string lastName,
        string phone,
        List<OrderItem> items,
        string shippingAddress);

    Task<Order> GetOrderByIdAsync(int id);
    Task<IEnumerable<OrderDto>> GetOrdersByEmailAsync(string email);
    Task UpdateOrderStatusAsync(int orderId, OrderStatus status);
    Task CancelOrderAsync(int orderId);
}
