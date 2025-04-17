using api.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace api.Services;

public class EmailService : IEmailService
{
    private readonly IConfiguration _config;
    private readonly ILogger<EmailService> _logger;

    public EmailService(IConfiguration config, ILogger<EmailService> logger)
    {
        _config = config;
        _logger = logger;
    }

    public async Task SendOrderConfirmationAsync(string email, Order order)
    {
        var apiKey = _config["SendGrid:ApiKey"];
        var client = new SendGridClient(apiKey);
        var from = new EmailAddress(_config["EmailSettings:FromEmail"], "Sports Coach");
        var to = new EmailAddress(email);
        var subject = $"Your Order #{order.Id} Confirmation";

        var plainTextContent = $"Thank you for your order #{order.Id}. Total: {order.Total:C}";
        var htmlContent = BuildOrderConfirmationHtml(order);

        var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
        var response = await client.SendEmailAsync(msg);

        if (!response.IsSuccessStatusCode)
        {
            _logger.LogError($"Failed to send confirmation email to {email}. Status: {response.StatusCode}");
        }
    }

    public async Task SendOrderStatusUpdateAsync(string email, Order order)
    {
        var apiKey = _config["SendGrid:ApiKey"];
        var client = new SendGridClient(apiKey);
        var from = new EmailAddress(_config["EmailSettings:FromEmail"], "Sports Coach");
        var to = new EmailAddress(email);
        var subject = $"Update on Your Order #{order.Id}";

        var plainTextContent = $"Your order #{order.Id} status has been updated to: {order.Status}.";
        var htmlContent = BuildOrderStatusUpdateHtml(order);

        var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
        var response = await client.SendEmailAsync(msg);

        if (!response.IsSuccessStatusCode)
        {
            _logger.LogError($"Failed to send status update email to {email}. Status: {response.StatusCode}");
        }
    }

    private string BuildOrderConfirmationHtml(Order order)
    {
        return $@"
            <h1>Thank you for your order!</h1>
            <p>Order #: {order.Id}</p>
            <p>Date: {order.OrderDate:g}</p>
            <p>Total: {order.Total:C}</p>
            <h2>Items:</h2>
            <ul>
                {string.Join("", order.OrderItems.Select(i =>
                    $"<li>{i.Product?.Name} - {i.Quantity} x {i.Price:C}</li>"))}
            </ul>
        ";
    }

    private string BuildOrderStatusUpdateHtml(Order order)
    {
        return $@"
            <h1>Order Update</h1>
            <p>Your order #{order.Id} status has been updated.</p>
            <p><strong>Current Status:</strong> {order.Status}</p>
            <p>We will notify you when the next update is available.</p>
        ";
    }
}
