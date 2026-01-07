using api.Contract;
using api.Models;
using api.Repositories;
using Microsoft.Extensions.Logging;

namespace api.Services;

public class OrderService : IOrderService
{
    private readonly IRepository<Order> _orderRepository;
    private readonly IProductService _productService;
    private readonly ILogger<OrderService> _logger;
    private readonly IEmailService _emailService;

    public OrderService(
        IRepository<Order> orderRepository,
        IProductService productService,
        IEmailService emailService,
        ILogger<OrderService> logger)
    {
        _orderRepository = orderRepository;
        _productService = productService;
        _emailService = emailService;
        _logger = logger;
    }

    public async Task<Order> CreateOrderAsync(
        string email,
        string firstName,
        string lastName,
        string phone,
        List<OrderItem> items,
        string shippingAddress)
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
                item.Product = product;
            }

            var order = new Order
            {
                CustomerEmail = email,
                CustomerName = $"{firstName} {lastName}".Trim(),
                CustomerPhone = phone,
                OrderItems = items,
                Total = items.Sum(i => i.Price * i.Quantity),
                ShippingAddress = shippingAddress,
                Status = OrderStatus.Pending,
                OrderDate = DateTime.UtcNow
            };

            await _orderRepository.AddAsync(order);
            
            _logger.LogInformation("Order #{OrderId} created successfully for {Email}", order.Id, email);

            // Send notifications (don't fail the order if notifications fail)
            try
            {
                // Send confirmation email to customer
                await _emailService.SendOrderConfirmationAsync(order.CustomerEmail, order);
                _logger.LogInformation("Confirmation email sent for Order #{OrderId}", order.Id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send confirmation email for Order #{OrderId}", order.Id);
            }

            try
            {
                // Send order notification to delivery person
                await _emailService.SendOrderToDeliveryAsync(order);
                _logger.LogInformation("Delivery notification sent for Order #{OrderId}", order.Id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send delivery notification for Order #{OrderId}", order.Id);
            }

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
            var order = await _orderRepository.GetByIdAsync(id, o => o.OrderItems);

            if (order == null)
            {
                _logger.LogWarning("Order with ID {OrderId} not found", id);
                return null;
            }

            // Load product information for each order item
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

    public async Task<IEnumerable<OrderDto>> GetOrdersByEmailAsync(string email)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                throw new ArgumentException("Email cannot be empty");
            }

            var orders = await _orderRepository.FindAllAsync(o =>
                o.CustomerEmail.ToLower() == email.ToLower(), o => o.OrderItems);

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

            return orders.Select(o => new OrderDto
            {
                Id = o.Id,
                CustomerEmail = o.CustomerEmail,
                CustomerName = o.CustomerName,
                OrderItems = o.OrderItems.Select(oi => new OrderItemDto
                {
                    ProductId = oi.ProductId,
                    ProductName = oi.Product?.Name ?? "Unknown Product",
                    Quantity = oi.Quantity,
                    Price = oi.Price
                }).ToList(),
                Total = o.Total,
                Status = o.Status,
                OrderDate = o.OrderDate,
                ShippingAddress = o.ShippingAddress
            }).OrderByDescending(o => o.OrderDate);
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
            await _orderRepository.UpdateAsync(order);
            
            // Send status update email
            try
            {
                await _emailService.SendOrderStatusUpdateAsync(order.CustomerEmail, order);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send status update email for Order #{OrderId}", orderId);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating status for order {OrderId}", orderId);
            throw;
        }
    }

    public async Task CancelOrderAsync(int orderId)
    {
        await UpdateOrderStatusAsync(orderId, OrderStatus.Cancelled);
    }
}
