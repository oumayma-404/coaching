using api.Models;
using api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace api.Controllers;

[ApiController]
[Route("api/paymee")]
public class PaymeeController : ControllerBase
{
    private readonly IOrderService _orderService;
    private readonly ILogger<PaymeeController> _logger;

    public PaymeeController(IOrderService orderService, ILogger<PaymeeController> logger)
    {
        _orderService = orderService;
        _logger = logger;
    }

    [HttpPost("webhook")]
    public async Task<IActionResult> PaymeeWebhook([FromBody] PaymeeWebhookPayload payload)
    {
        _logger.LogInformation("Paymee webhook received: {@Payload}", payload);

        if (payload == null || payload.OrderId == null)
        {
            return BadRequest("Missing order ID");
        }

        try
        {
            var orderId = int.Parse(payload.OrderId);

            if (payload.Status == "paid")
            {
                await _orderService.UpdateOrderStatusAsync(orderId, OrderStatus.Completed); // or .Paid
            }
            else if (payload.Status == "cancelled")
            {
                await _orderService.CancelOrderAsync(orderId);
            }

            return Ok(); // Return 200 to Paymee
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error handling Paymee webhook");
            return StatusCode(500);
        }
    }
}
