using api.Models;
using api.Repositories;
using Microsoft.Extensions.Logging;

namespace api.Services;

// Services/OrderService.cs
public class OrderService : IOrderService
{
    private readonly IRepository<Order> _orderRepository;
    private readonly IProductService _productService;
    private readonly ILogger<OrderService> _logger;

    public OrderService(
        IRepository<Order> orderRepository, 
        IProductService productService,
        ILogger<OrderService> logger)
    {
        _orderRepository = orderRepository;
        _productService = productService;
        _logger = logger;
    }

    public async Task<Order> CreateOrderAsync(string email, string name, List<OrderItem> items, string shippingAddress)
    {
        try
        {
            // Validate products exist and get current prices
            foreach (var item in items)
            {
                var product = await _productService.GetProductByIdAsync(item.ProductId);
                if (product == null)
                {
                    throw new ArgumentException($"Product with ID {item.ProductId} not found");
                }
                item.Price = product.Price;
            }

            var order = new Order
            {
                CustomerEmail = email,
                CustomerName = name,
                OrderItems = items,
                Total = items.Sum(i => i.Price * i.Quantity),
                ShippingAddress = shippingAddress,
                Status = OrderStatus.Pending,
                OrderDate = DateTime.UtcNow
            };

            await _orderRepository.AddAsync(order);
            return order;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating order for {Email}", email);
            throw;
        }
    }

    public async Task<Order> GetOrderByIdAsync(int id)
    {
        try
        {
            var order = await _orderRepository.GetByIdAsync(id);
            
            if (order == null)
            {
                _logger.LogWarning("Order with ID {OrderId} not found", id);
                return null;
            }

            // Eager load order items and products if needed
            if (order.OrderItems != null)
            {
                foreach (var item in order.OrderItems)
                {
                    if (item.ProductId > 0)
                    {
                        item.Product = await _productService.GetProductByIdAsync(item.ProductId);
                    }
                }
            }

            return order;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting order with ID {OrderId}", id);
            throw;
        }
    }

    public async Task<IEnumerable<Order>> GetOrdersByEmailAsync(string email)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                throw new ArgumentException("Email cannot be empty");
            }

            // Assuming your repository supports querying
            var orders = await _orderRepository.FindAllAsync(o => 
                o.CustomerEmail.ToLower() == email.ToLower());

            // Load product information for each order item
            foreach (var order in orders)
            {
                if (order.OrderItems != null)
                {
                    foreach (var item in order.OrderItems)
                    {
                        if (item.ProductId > 0)
                        {
                            item.Product = await _productService.GetProductByIdAsync(item.ProductId);
                        }
                    }
                }
            }

            return orders.OrderByDescending(o => o.OrderDate);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting orders for email {Email}", email);
            throw;
        }
    }

    public async Task UpdateOrderStatusAsync(int orderId, OrderStatus status)
    {
        try
        {
            var order = await _orderRepository.GetByIdAsync(orderId);
            if (order == null)
            {
                throw new ArgumentException($"Order with ID {orderId} not found");
            }

            order.Status = status;
            
            // Add status change history if needed

            await _orderRepository.UpdateAsync(order);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating status for order {OrderId}", orderId);
            throw;
        }
    }

    // Optional: Add additional methods as needed
    public async Task CancelOrderAsync(int orderId)
    {
        await UpdateOrderStatusAsync(orderId, OrderStatus.Cancelled);
    }

    public async Task CompleteOrderAsync(int orderId)
    {
        await UpdateOrderStatusAsync(orderId, OrderStatus.Completed);
    }
}