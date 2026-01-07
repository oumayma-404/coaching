using api.Models;
using api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IOrderService _orderService;
    private readonly ILogger<OrdersController> _logger;

    public OrdersController(
        IOrderService orderService,
        ILogger<OrdersController> logger)
    {
        _orderService = orderService;
        _logger = logger;
    }

    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] OrderRequest request)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Convert OrderItemRequest to OrderItem
            var orderItems = request.Items.Select(item => new OrderItem
            {
                ProductId = item.ProductId,
                Quantity = item.Quantity,
            }).ToList();

            // Create the order
            var order = await _orderService.CreateOrderAsync(
                request.Email,
                request.FirstName,
                request.LastName,
                request.Phone,
                orderItems,
                request.ShippingAddress
            );

            // Return order confirmation
            return Ok(new
            {
                success = true,
                orderId = order.Id,
                message = "Order placed successfully! You will receive a confirmation email shortly."
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating order");
            return StatusCode(500, new { success = false, message = ex.Message });
        }
    }


    [HttpGet("{id}")]
    public async Task<IActionResult> GetOrder(int id)
    {
        try
        {
            var order = await _orderService.GetOrderByIdAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            return Ok(order);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error getting order with ID {id}");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpGet("by-email/{email}")]
    public async Task<IActionResult> GetOrdersByEmail(string email)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                return BadRequest("Email is required");
            }

            var orders = await _orderService.GetOrdersByEmailAsync(email);
            return Ok(orders);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error getting orders for email {email}");
            return StatusCode(500, "Internal server error");
        }
    }
}

// DTO classes
public class OrderRequest
{
    public string Email { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public List<OrderItemRequest> Items { get; set; } = new();
    public string ShippingAddress { get; set; } = string.Empty;
}

public class OrderItemRequest
{
    public int ProductId { get; set; }
    public int Quantity { get; set; }
}
