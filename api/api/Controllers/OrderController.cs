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
    private readonly IPaymentService _paymeeService;
    private readonly ILogger<OrdersController> _logger;

    public OrdersController(
        IOrderService orderService,
        ILogger<OrdersController> logger, IPaymentService paymeeService)
    {
        _orderService = orderService;
        _logger = logger;
        _paymeeService = paymeeService;
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
                // Price will be set by the service
            }).ToList();

            // Create the order with 'Pending' status
            var order = await _orderService.CreateOrderAsync(
                request.Email,
                request.Name,
                orderItems,
                request.ShippingAddress,
                paymentIntentId: Guid.NewGuid().ToString() // or any unique identifier
            );

            // Prepare Paymee payment session request
            var paymeeRequest = new PaymeeRequest
            {
                Amount = order.Total,
                Note = $"Order #{order.Id}",
                FirstName = request.Name.Split(" ")[0],
                LastName = request.Name.Split(" ").Length > 1 ? request.Name.Split(" ")[1] : "",
                Email = request.Email,
                Phone = request.Phone,
                ReturnUrl = "https://yourdomain.com/payment-success",
                CancelUrl = "https://yourdomain.com/payment-cancelled",
                WebhookUrl = "https://coaching-z16f.onrender.com/api/paymee/webhook",
                OrderId = order.Id.ToString()
            };

            // Get Paymee payment link
            var paymentUrl = await _paymeeService.CreatePaymentSessionAsync(paymeeRequest);

            // Return order ID and payment link
            return Ok(new { orderId = order.Id, paymentUrl });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating order and generating payment session");
            return StatusCode(500, ex.Message);
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
    public string Email { get; set; }
    public string Name { get; set; }
    public string Phone { get; set; }
    public List<OrderItemRequest> Items { get; set; }
    public string ShippingAddress { get; set; }
}

public class OrderItemRequest
{
    public int ProductId { get; set; }
    public int Quantity { get; set; }
}